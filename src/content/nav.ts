import type { NavContent } from './types';

export const nav: NavContent = {
  skipLink: 'Skip to main content',
  brand: 'Krish Raja',
  brandAria: 'Krish Raja - Home',
  navAria: 'Main navigation',
  ctaLabel: 'Work with me',
  ctaHref: '#work-with-me',

  items: [
    { label: 'How I operate', href: '#how-i-operate' },
    { label: 'The OS', href: '#operating-system' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Writing', href: '#writing' },
    { label: 'Latest', href: '#latest' },
    { label: 'Lessons', href: '#lightning-lessons' },
    { label: 'Contact', href: '#contact' },
  ],

  footerItems: [
    { label: 'How I operate', href: '#how-i-operate' },
    { label: 'The OS', href: '#operating-system' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Writing', href: '#writing' },
    { label: 'Latest', href: '#latest' },
    { label: 'Work with me', href: '#work-with-me' },
    { label: 'Contact', href: '#contact' },
  ],

  footerTagline:
    'Sixteen years commercialising content, media and IP businesses. Now building the AI systems that run them.',
  footerRights: 'All rights reserved.',
  sitemapLabel: 'Sitemap',
  linkedInAria: 'LinkedIn profile',

  dockAria: 'Section navigation and primary actions',
  dockItems: [
    { id: 'hero', label: 'Home', icon: 'home' },
    { id: 'how-i-operate', label: 'Operate', icon: 'compass' },
    { id: 'operating-system', label: 'The OS', icon: 'monitor' },
    { id: 'portfolio', label: 'Portfolio', icon: 'layers' },
    { id: 'proof-points', label: 'Receipts', icon: 'award' },
    { id: 'writing', label: 'Writing', icon: 'book-open' },
    { id: 'latest', label: 'Latest', icon: 'radio' },
    { id: 'lightning-lessons', label: 'Lessons', icon: 'mic' },
    { id: 'contact', label: 'Contact', icon: 'mail' },
  ],
  contactAria: 'Contact options',

  // Used only by MobileJumpNav, which is currently imported nowhere.
  // TODO(krish): MobileJumpNav is unreferenced dead code. Delete it, or wire it
  // back in? Left in place rather than removed, since it is not on the kill list.
  jumpItems: [
    { label: 'Operate', href: '#how-i-operate' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Writing', href: '#writing' },
    { label: 'Lessons', href: '#lightning-lessons' },
    { label: 'Work', href: '#work-with-me' },
    { label: 'Contact', href: '#contact' },
  ],
  jumpAria: 'Section quick nav',
};
