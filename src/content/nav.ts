import type { NavContent } from './types';

export const nav: NavContent = {
  skipLink: 'Skip to main content',
  brand: 'Krish Raja',
  brandAria: 'Krish Raja - Home',
  navAria: 'Main navigation',
  // Matches hero.primaryCta and the section it lands on, so the same words
  // appear in the nav, the hero and the section heading.
  ctaLabel: 'Get in touch',
  ctaHref: '#contact',

  items: [
    { label: 'How I operate', href: '#how-i-operate' },
    { label: 'The OS', href: '#operating-system' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Work', href: '#selected-work' },
    { label: 'Lessons', href: '#lightning-lessons' },
    { label: 'Contact', href: '#contact' },
  ],

  footerItems: [
    { label: 'How I operate', href: '#how-i-operate' },
    { label: 'The OS', href: '#operating-system' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Selected work', href: '#selected-work' },
    { label: 'Contact', href: '#contact' },
  ],

  footerTagline:
    'Sixteen years commercializing content, media and IP businesses. Now building the AI systems that run them.',
  footerRights: 'All rights reserved.',
  sitemapLabel: 'Sitemap',
  linkedInAria: 'LinkedIn profile',

  dockAria: 'Section navigation and primary actions',
  /**
   * Four, plus the contact slot the dock adds itself. Five is the whole row.
   *
   * This was nine chips in a horizontally scrolling rail with a full-width
   * button underneath, so the dock was two rows deep, four of its nine
   * destinations were off-screen at any moment, and it ate 110px of every
   * screen to duplicate headings the page already shows. A phone tab bar is
   * orientation, not a sitemap. Krish's own OS app runs five fixed slots in one
   * row, which is the pattern this now follows.
   */
  dockItems: [
    { id: 'hero', label: 'Home', icon: 'home' },
    { id: 'operating-system', label: 'The OS', icon: 'monitor' },
    { id: 'portfolio', label: 'Portfolio', icon: 'briefcase' },
    { id: 'proof-points', label: 'Receipts', icon: 'award' },
  ],
  contactAria: 'Contact options',

};
