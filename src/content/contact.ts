import type { ContactContent } from './types';
import { site } from './site';

export const contact: ContactContent = {
  id: 'contact',
  eyebrow: 'Contact',
  title: 'Get in touch',
  sub: 'For speaking, writing, or a direct line.',

  links: [
    {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      icon: 'mail',
      external: false,
      copyable: true,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/krish-raja',
      href: site.links.linkedin,
      icon: 'linkedin',
      external: true,
    },
    {
      label: 'For work inquiries',
      value: {
        desktop: 'Book a call through Mindmaker',
        mobile: 'Book a call through Mindmaker',
        sheet: 'Book through Mindmaker',
      },
      href: site.links.mindmaker,
      icon: 'arrow-up-right',
      sheetIcon: 'calendar',
      external: true,
    },
  ],

  copySuccess: 'Email copied',
  copyError: 'Could not copy',
  copyLabel: 'Copy email',
};
