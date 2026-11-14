/**
 * The countable trace of a speaking enquiry, on the page side.
 *
 * The enquiry form, every email link and every booking link post one small
 * JSON row to /api/enquiry on this same site. That endpoint (api/enquiry.js)
 * validates it and stores it with a key only the server holds. This file knows
 * nothing about where rows go, and must not: the build fails if the public
 * script mentions a database (vite.config.ts).
 *
 *   enquiry  the form was completed and the email written (name, event, date
 *            and message, exactly as typed; nothing else about the reader)
 *   email    the published address was opened or copied
 *   call     the booking link was opened
 *
 * Fire and forget: a failed post never blocks the mail app or the link. Only the
 * production hosts post, so local builds, previews and the mobile check stay
 * out of the count; the endpoint refuses any other origin as well.
 */
import { site } from '@/content';

const ENDPOINT = '/api/enquiry';
const PRODUCTION_HOSTS = new Set(['www.krishraja.com', 'krishraja.com']);

export type EnquiryKind = 'enquiry' | 'email' | 'call';

export interface EnquiryFields {
  readonly name: string;
  readonly event: string;
  readonly when?: string;
  readonly message?: string;
}

const clip = (v: string | undefined, max: number) => {
  const t = (v ?? '').trim();
  return t ? t.slice(0, max) : null;
};

/** The external host that sent the reader here, never the full URL. */
const referrerHost = (): string | null => {
  try {
    const h = document.referrer ? new URL(document.referrer).host : '';
    return h && h !== location.host ? h.slice(0, 200) : null;
  } catch {
    return null;
  }
};

export const shouldRecord = (host: string) => PRODUCTION_HOSTS.has(host);

export const enquiryRow = (kind: EnquiryKind, placement: string, fields?: EnquiryFields) => ({
  kind,
  placement: clip(placement, 40),
  landing: clip(location.pathname + location.hash, 120),
  referrer_host: referrerHost(),
  ...(kind === 'enquiry' && fields
    ? {
        name: clip(fields.name, 120),
        event: clip(fields.event, 200),
        event_when: clip(fields.when, 200),
        message: clip(fields.message, 4000),
      }
    : {}),
});

export const recordEnquiry = (kind: EnquiryKind, placement: string, fields?: EnquiryFields) => {
  if (typeof window === 'undefined' || !shouldRecord(location.host)) return;
  try {
    // keepalive lets the post finish while the mail app or a new tab opens.
    void fetch(ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryRow(kind, placement, fields)),
    }).catch(() => {});
  } catch {
    /* never let counting get in the way of asking */
  }
};

/** Which part of the page a link sat in: its section id, else its landmark. */
const placementOf = (el: Element): string => {
  const section = el.closest('section[id], aside[id], [data-placement]');
  if (section) return (section as HTMLElement).dataset.placement || section.id;
  const landmark = el.closest('header, nav, footer, [role="dialog"]');
  return landmark ? (landmark.getAttribute('role') || landmark.tagName.toLowerCase()) : 'page';
};

/**
 * One listener for every email and booking link, on both trees, so a new
 * button anywhere is counted without anyone remembering to wire it.
 */
export const installEnquiryTrace = () => {
  if (typeof document === 'undefined') return;
  const mail = `mailto:${site.email}`.toLowerCase();
  const call = site.links.calendly.replace(/\/$/, '');
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (href.toLowerCase().startsWith(mail)) recordEnquiry('email', placementOf(a));
      else if (href.replace(/\/$/, '').startsWith(call)) recordEnquiry('call', placementOf(a));
    },
    true,
  );
};
