import { describe, expect, it, vi } from 'vitest';
import { createHandler, toRow } from '../../../api/enquiry.js';

/** A minimal stand-in for Vercel's Node response. */
const response = () => {
  const r = { statusCode: 0, headers: {} as Record<string, string>, ended: false };
  return Object.assign(r, {
    setHeader: (k: string, v: string) => { r.headers[k.toLowerCase()] = v; },
    status: (c: number) => { r.statusCode = c; return { end: () => { r.ended = true; }, json: () => { r.ended = true; } }; },
  });
};

const ORIGIN = 'https://www.krishraja.com';
const request = (body: unknown, headers: Record<string, string> = {}, method = 'POST') => ({
  method,
  headers: { origin: ORIGIN, 'x-forwarded-for': '203.0.113.7', ...headers },
  body,
});
const STORE = { SITE_ENQUIRIES_URL: 'https://store.example.test/rows', SITE_ENQUIRIES_KEY: 'test-key' };
const okFetch = () => vi.fn(async () => ({ ok: true, status: 201 }));

const call = async (handler: (req: unknown, res: unknown) => Promise<unknown>, req: unknown) => {
  const res = response();
  await handler(req, res);
  return res;
};

describe('POST /api/enquiry', () => {
  it('records nothing, and says so, while the store is not configured', async () => {
    const fetchImpl = okFetch();
    const res = await call(createHandler({ env: {}, fetchImpl }), request({ kind: 'call', placement: 'contact' }));
    expect(res.statusCode).toBe(204);
    expect(res.headers['x-enquiry-recorded']).toBe('no');
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('writes one validated row with the server key when configured', async () => {
    const fetchImpl = okFetch();
    const res = await call(
      createHandler({ env: STORE, fetchImpl }),
      request({ kind: 'enquiry', placement: 'ask-form', landing: '/lessons', name: ' Sam ', event: 'Summit', status: 'booked', note: 'x' }),
    );
    expect(res.statusCode).toBe(204);
    expect(res.headers['x-enquiry-recorded']).toBe('yes');
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, { headers: Record<string, string>; body: string }];
    expect(url).toBe(STORE.SITE_ENQUIRIES_URL);
    expect(init.headers.apikey).toBe('test-key');
    expect(init.headers.Authorization, 'an opaque key must not be sent as a bearer token').toBeUndefined();
    const row = JSON.parse(init.body);
    expect(row).toMatchObject({ kind: 'enquiry', name: 'Sam', event: 'Summit', landing: '/lessons' });
    expect(row, 'the page may not set status or notes').not.toHaveProperty('status');
    expect(row).not.toHaveProperty('note');
  });

  it('refuses other origins, other methods and malformed rows', async () => {
    const h = createHandler({ env: STORE, fetchImpl: okFetch() });
    expect((await call(h, request({ kind: 'call' }, { origin: 'https://evil.example' }))).statusCode).toBe(403);
    expect((await call(h, request({ kind: 'call' }, { origin: '' }))).statusCode).toBe(403);
    expect((await call(h, request(undefined, {}, 'GET'))).statusCode).toBe(405);
    expect((await call(h, request({ kind: 'visit' }))).statusCode).toBe(400);
    expect((await call(h, request({ kind: 'enquiry', name: 'Sam' }))).statusCode).toBe(400);
    expect((await call(h, request({ kind: 'call', placement: '<script>' }))).statusCode).toBe(400);
    expect((await call(h, request({ kind: 'call', landing: 'https://x' }))).statusCode).toBe(400);
    expect((await call(h, request('{not json'))).statusCode).toBe(400);
    expect((await call(h, request('x'.repeat(9000)))).statusCode).toBe(413);
  });

  it('keeps email and call rows anonymous whatever is sent', () => {
    expect(toRow({ kind: 'email', placement: 'copy', name: 'Sam', event: 'Summit', message: 'hi' })).toEqual({
      kind: 'email', placement: 'copy', landing: null, referrer_host: null,
    });
  });

  it('rate-limits one client: 5 enquiries and 20 rows an hour', async () => {
    let t = 0;
    const h = createHandler({ env: {}, fetchImpl: okFetch(), now: () => t });
    const enquiry = { kind: 'enquiry', name: 'Sam', event: 'Summit' };
    for (let i = 0; i < 5; i++) expect((await call(h, request(enquiry))).statusCode).toBe(204);
    expect((await call(h, request(enquiry))).statusCode).toBe(429);
    for (let i = 0; i < 15; i++) expect((await call(h, request({ kind: 'call' }))).statusCode).toBe(204);
    expect((await call(h, request({ kind: 'call' }))).statusCode).toBe(429);
    expect((await call(h, request({ kind: 'call' }, { 'x-forwarded-for': '198.51.100.1' }))).statusCode).toBe(204);
    t += 60 * 60 * 1000 + 1;
    expect((await call(h, request(enquiry))).statusCode).toBe(204);
  });

  it('answers 502 and logs only a status when the store refuses', async () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const h = createHandler({ env: STORE, fetchImpl: vi.fn(async () => ({ ok: false, status: 401 })) });
    expect((await call(h, request({ kind: 'call' }))).statusCode).toBe(502);
    expect(err).toHaveBeenCalledWith('enquiry store refused the row: 401');
    err.mockRestore();
  });
});
