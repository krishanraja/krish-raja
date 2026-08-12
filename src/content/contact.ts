import type { ContactContent } from './types';
import { site } from './site';

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
  eyebrow: 'Contact',
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
      detail: 'themindmaker.ai',
      href: site.links.mindmaker,
      icon: 'building-2',
      external: true,
    },
    {
      action: 'Read Mindmaker Live',
      detail: 'live.themindmaker.ai',
      href: site.links.mindmakerLive,
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
