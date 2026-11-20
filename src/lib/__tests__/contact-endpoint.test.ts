import { describe, expect, it, vi } from 'vitest';
import { createContactHandler } from '../../../api/contact.js';
import { site } from '../../content/site';

const env = { VERCEL_ENV: 'production', RESEND_API_KEY: 'fixture' };
const body = { intent: 'immersion', name: 'Reader', email: 'reader@example.test',
  message: 'An immersion session for my team.', requestId: '4664ecda-ac7d-4da1-a038-e91e7b955c06' };
const headers = { origin: 'https://www.krishraja.com', 'content-type': 'application/json' };

function setup(environment = env, result = { ok: true, json: async () => ({ id: 'receipt' }) }) {
  const fetchImpl = vi.fn(async (_url: string, _init: RequestInit) => result);
  const handler = createContactHandler({ env: environment, fetchImpl });
  const call = async (payload: unknown = body, method = 'POST', origin = headers.origin) => {
    const res = { statusCode: 0, data: undefined as unknown, setHeader: () => {},
      status(code: number) { this.statusCode = code; return this; },
      end() { return this; }, json(data: unknown) { this.data = data; return this; } };
    await handler({ method, headers: { ...headers, origin }, body: payload }, res);
    return res;
  };
  return { call, fetchImpl };
}

describe('the enquiry mail handoff', () => {
  it('sends only to the published recipient and passes the visitor as reply-to', async () => {
    const { call, fetchImpl } = setup();
    expect(await call({ ...body, to: ['elsewhere@example.test'], subject: 'untrusted' })).toMatchObject({ statusCode:202, data:{accepted:true} });
    const [, init] = fetchImpl.mock.calls[0];
    expect(JSON.parse(String(init.body))).toMatchObject({ to:[site.email], reply_to:body.email, subject:'AI Immersion Session' });
    await call(body);
    expect(fetchImpl.mock.calls[1][1].headers).toEqual(init.headers);
    expect(init.headers).toHaveProperty('Idempotency-Key', 'krishraja-enquiry/' + body.requestId);
  });
  it('keeps preview and unconfigured mail in the email-app flow', async () => {
    for (const vars of [{...env, VERCEL_ENV:'preview'}, {...env, RESEND_API_KEY:''}]) {
      const { call, fetchImpl } = setup(vars);
      expect((await call(null,'GET')).data).toEqual({available:false});
      expect((await call()).statusCode).toBe(503);
      expect(fetchImpl).not.toHaveBeenCalled();
    }
  });
  it('rejects invalid submissions and cross-origin requests before touching the provider', async () => {
    const { call, fetchImpl } = setup();
    for (const bad of [{intent:'outside'}, {intent:'speaking'}, {email:'broken'}, {message:'  '}, {requestId:'invalid'}]) {
      expect((await call({...body,...bad})).statusCode).toBe(400);
    }
    expect((await call(body,'POST','https://example.test')).statusCode).toBe(403);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
  it('only acknowledges a provider receipt and bounds the number of attempts', async () => {
    const { call, fetchImpl } = setup(env,{ok:false,json:async()=>({id:''})});
    for (let i=0;i<5;i++) expect((await call()).statusCode).toBe(502);
    expect((await call()).statusCode).toBe(429);
    expect(fetchImpl).toHaveBeenCalledTimes(5);
  });
});
