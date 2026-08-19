import type { ContactContent } from './types';
import { site } from './site';

/** The label under each row is the destination, so it is read off the href. */
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/**
 * The only place on the site that asks for anything.
 *
 * "Work with me" used to sit directly above this, a whole section explaining
 * one card whose button linked to themindmaker.ai. It said nothing this
 * section could not, so it folded in here on 12 Aug 2026 and the nav CTA and
 * the hero button now both land on this anchor.
 *
 * Four rows, in the order a stranger needs them: reach me, understand the
 * practice, read the work, book the time. LinkedIn came off the list, because
 * four clear choices beat five and the footer already carries it.
 *
 * No price appears here. Pricing lives on themindmaker.ai only.
 */
export const contact: ContactContent = {
  id: 'contact',
  title: 'Get in touch',
  sub: 'I\'d love to hear from you - get in touch.',

  links: [
    {
      action: 'Email me directly',
      detail: site.email,
      href: `mailto:${site.email}`,
      icon: 'mail',
      external: false,
      copyable: true,
    },
    {
      action: 'See the advisory practice',
      detail: host(site.links.mindmake),
      href: site.links.mindmake,
      icon: 'building-2',
      external: true,
    },
    {
      action: 'Read what I publish',
      detail: host(site.links.content),
      href: site.links.content,
      icon: 'file-text',
      external: true,
    },
    {
      action: 'Book a call with me',
      detail: 'calendly.com/krish-raja',
      href: site.links.calendly,
      icon: 'calendar',
      external: true,
    },
  ],

  copySuccess: 'Email copied',
  copyError: 'Could not copy',
  copyLabel: 'Copy email',
};
