import address from '../src/content/enquiry-address.json' with { type: 'json' };
import { clientIp, createLimiter, isSiteOrigin } from './enquiry.js';

const topics = {
  general: 'Get in touch', immersion: 'AI Immersion Session',
  ongoing: 'Longer-term engagement', speaking: 'Speaking enquiry',
  leadership: 'Leadership or advisory enquiry',
};
const uuid = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const email = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function field(body, key, max, multiline = false) {
  const value = body[key] ?? '';
  if (typeof value !== 'string' || value.length > max || (!multiline && /[\r\n]/.test(value))) throw new Error();
  return value.trim();
}

function readMessage(body) {
  if (!body || typeof body !== 'object' || typeof body.intent !== 'string' || !Object.hasOwn(topics, body.intent) ||
      typeof body.requestId !== 'string' || !uuid.test(body.requestId)) throw new Error();
  const reply = field(body, 'email', 254);
  const name = field(body, 'name', 120);
  const event = field(body, 'event', 200);
  const when = field(body, 'when', 200);
  const message = field(body, 'message', 4000, true);
  const speaking = body.intent === 'speaking';
  if (!email.test(reply) || (speaking ? !name || !event : !message)) throw new Error();
  return {
    from: 'Krish Raja website <' + address.recipient + '>', to: [address.recipient], reply_to: reply,
    subject: speaking ? topics.speaking + ': ' + event : topics[body.intent],
    text: [name && 'Name: ' + name, 'Reply email: ' + reply, speaking && 'Event: ' + event,
      speaking && when && 'Date and city: ' + when].filter(Boolean).join('\n') + '\n\n' + message,
  };
}

/** Only visitor-initiated production submissions can send, and only to Krish. */
export function createContactHandler({ env = process.env, fetchImpl = fetch, now } = {}) {
  const allow = createLimiter(now);
  return async function contact(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const available = env.VERCEL_ENV === 'production' && Boolean(env.RESEND_API_KEY);
    if (req.method === 'GET') return res.status(200).json({ available });
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).end();
    }
    if (!isSiteOrigin(req.headers.origin)) return res.status(403).end();
    if (!available) return res.status(503).end();
    if (!/^application\/json(?:;|$)/i.test(String(req.headers['content-type'] ?? ''))) return res.status(415).end();
    let payload, message;
    try {
      const data = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      if (Buffer.byteLength(data) > 24000) return res.status(413).end();
      payload = JSON.parse(data);
      message = readMessage(payload);
    } catch {
      return res.status(400).end();
    }
    if (!allow(clientIp(req), 'enquiry')) return res.status(429).end();
    try {
      const sent = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json',
          'Idempotency-Key': 'krishraja-enquiry/' + payload.requestId,
        },
        body: JSON.stringify(message), signal: AbortSignal.timeout(8000),
      });
      if (!sent.ok || !(await sent.json()).id) return res.status(502).end();
      return res.status(202).json({ accepted: true });
    } catch {
      return res.status(502).end();
    }
  };
}

export default createContactHandler();
