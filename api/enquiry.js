/**
 * POST /api/enquiry: records one enquiry or contact intent from krishraja.com.
 *
 * The page posts here, same origin, and never learns where the row goes. The
 * store's address and its key live only in two server environment variables,
 * SITE_ENQUIRIES_URL and SITE_ENQUIRIES_KEY, set in Vercel. Neither has a VITE_
 * prefix, so Vite never writes them into the public script, and the build fails
 * if that script mentions a database (vite.config.ts).
 *
 * While either variable is unset the endpoint still validates the request and
 * answers 204 with `x-enquiry-recorded: no`, so the page behaves the same and
 * nothing is written.
 *
 *   enquiry  the speaking form was completed (name and event required)
 *   email    the published address was opened or copied (no personal fields)
 *   call     the booking link was opened (no personal fields)
 *
 * Rate limit, per client IP and per function instance: 20 rows an hour, of
 * which at most 5 may be enquiries. A serverless instance is short-lived, so
 * this is a speed bump against a script hammering one warm instance, not a
 * guarantee; the table's own length checks bound what any row can hold.
 */

const ALLOWED_ORIGINS = new Set(['https://www.krishraja.com', 'https://krishraja.com']);
const KINDS = new Set(['enquiry', 'email', 'call']);
const MAX_BODY = 8000;
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT_ALL = 20;
const LIMIT_ENQUIRY = 5;

/** A trimmed string no longer than max, or null; anything else is invalid. */
const text = (v, max) => {
  if (v === undefined || v === null) return null;
  if (typeof v !== 'string') throw new Error('field is not text');
  const t = v.trim();
  return t ? t.slice(0, max) : null;
};

/**
 * Turns a request body into the row the table accepts, or throws. Only the
 * known fields survive, and an email or call row carries no personal field
 * whatever the request sent.
 */
export function toRow(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('body is not an object');
  if (!KINDS.has(body.kind)) throw new Error('unknown kind');
  const placement = text(body.placement, 40);
  if (placement && !/^[a-z0-9-]+$/.test(placement)) throw new Error('bad placement');
  const landing = text(body.landing, 120);
  if (landing && !landing.startsWith('/')) throw new Error('bad landing');
  const referrer = text(body.referrer_host, 200);
  if (referrer && !/^[a-z0-9.-]+(:\d+)?$/i.test(referrer)) throw new Error('bad referrer host');
  const row = { kind: body.kind, placement, landing, referrer_host: referrer };
  if (body.kind !== 'enquiry') return row;
  const name = text(body.name, 120);
  const event = text(body.event, 200);
  if (!name || !event) throw new Error('an enquiry needs a name and an event');
  return {
    ...row,
    name,
    event,
    event_when: text(body.event_when, 200),
    message: text(body.message, 4000),
  };
}

/** Fixed one-hour windows per IP, pruned as they expire. */
export function createLimiter(now = () => Date.now()) {
  const seen = new Map();
  return (ip, kind) => {
    const t = now();
    for (const [k, v] of seen) if (t - v.start > WINDOW_MS) seen.delete(k);
    const s = seen.get(ip) ?? { start: t, all: 0, enquiry: 0 };
    if (s.all >= LIMIT_ALL || (kind === 'enquiry' && s.enquiry >= LIMIT_ENQUIRY)) return false;
    s.all += 1;
    if (kind === 'enquiry') s.enquiry += 1;
    seen.set(ip, s);
    return true;
  };
}

const clientIp = (req) =>
  String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || String(req.headers['x-real-ip'] ?? '') || 'unknown';

const parseBody = (req) => {
  const raw = req.body;
  if (raw === undefined || raw === null || raw === '') return null;
  if (typeof raw === 'string') {
    if (raw.length > MAX_BODY) return { tooLarge: true };
    return JSON.parse(raw);
  }
  if (Buffer.isBuffer(raw)) {
    if (raw.length > MAX_BODY) return { tooLarge: true };
    return JSON.parse(raw.toString('utf8'));
  }
  if (JSON.stringify(raw).length > MAX_BODY) return { tooLarge: true };
  return raw;
};

/** The handler, with its environment, fetch and clock injectable for tests. */
export function createHandler({ env = process.env, fetchImpl = fetch, now } = {}) {
  const allow = createLimiter(now);
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).end();
    }
    if (!ALLOWED_ORIGINS.has(String(req.headers.origin ?? ''))) return res.status(403).end();

    let row;
    try {
      const body = parseBody(req);
      if (body && body.tooLarge) return res.status(413).end();
      row = toRow(body);
    } catch {
      return res.status(400).end();
    }

    if (!allow(clientIp(req), row.kind)) return res.status(429).end();

    const url = env.SITE_ENQUIRIES_URL;
    const key = env.SITE_ENQUIRIES_KEY;
    if (!url || !key) {
      res.setHeader('x-enquiry-recorded', 'no');
      return res.status(204).end();
    }

    try {
      const r = await fetchImpl(url, {
        method: 'POST',
        headers: {
          apikey: key,
          // A legacy JWT key also goes in Authorization; a newer opaque key must not.
          ...(key.split('.').length === 3 ? { Authorization: `Bearer ${key}` } : {}),
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(row),
        signal: AbortSignal.timeout(5000),
      });
      if (!r.ok) {
        // The status only. Never the body, which can echo the request.
        console.error(`enquiry store refused the row: ${r.status}`);
        return res.status(502).end();
      }
    } catch {
      console.error('enquiry store unreachable');
      return res.status(502).end();
    }
    res.setHeader('x-enquiry-recorded', 'yes');
    return res.status(204).end();
  };
}

export default createHandler();
