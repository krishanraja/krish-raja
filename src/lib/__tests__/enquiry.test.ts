import { afterEach, describe, expect, it, vi } from 'vitest';
import { enquiryRow, shouldRecord } from '../enquiry';

/**
 * The row the page writes to public.site_enquiries must match that table's
 * constraints (kind, lengths, anonymous intents), or the insert is refused and
 * the enquiry goes uncounted without anyone seeing an error.
 */
describe('enquiry trace', () => {
  afterEach(() => vi.unstubAllGlobals());

  const stub = (path = '/lessons', referrer = '') => {
    vi.stubGlobal('location', { pathname: path, hash: '', host: 'www.krishraja.com' });
    vi.stubGlobal('document', { referrer });
  };

  it('only writes from the production hosts', () => {
    expect(shouldRecord('www.krishraja.com')).toBe(true);
    expect(shouldRecord('krishraja.com')).toBe(true);
    expect(shouldRecord('127.0.0.1:4173')).toBe(false);
    expect(shouldRecord('krish-raja-git-x.vercel.app')).toBe(false);
  });

  it('keeps email and call rows anonymous, whatever is passed', () => {
    stub();
    const row = enquiryRow('call', 'contact', { name: 'A', event: 'B' });
    expect(row).not.toHaveProperty('name');
    expect(row).not.toHaveProperty('event');
    expect(row).not.toHaveProperty('message');
    expect(row).toMatchObject({ kind: 'call', placement: 'contact', landing: '/lessons' });
  });

  it('carries the form fields, trimmed and clipped to the column limits', () => {
    stub('/', 'https://www.linkedin.com/feed/');
    const row = enquiryRow('enquiry', 'ask-form', {
      name: '  Sam  ',
      event: 'x'.repeat(500),
      when: '',
      message: 'm'.repeat(5000),
    });
    expect(row).toMatchObject({ name: 'Sam', event_when: null, referrer_host: 'www.linkedin.com' });
    expect((row as { event: string }).event).toHaveLength(200);
    expect((row as { message: string }).message).toHaveLength(4000);
  });

  it('records the referring host only, and never its own host', () => {
    stub('/', 'https://www.krishraja.com/thinking');
    expect(enquiryRow('email', 'copy').referrer_host).toBeNull();
  });

  it('never sends status, booking fields or notes, which the policy refuses', () => {
    stub();
    const row = enquiryRow('enquiry', 'ask-form', { name: 'Sam', event: 'Summit' });
    for (const k of ['status', 'booked_at', 'note', 'id']) expect(row).not.toHaveProperty(k);
  });
});
