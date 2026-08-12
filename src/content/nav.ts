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
  dockItems: [
    { id: 'hero', label: 'Home', icon: 'home' },
    { id: 'how-i-operate', label: 'Operate', icon: 'compass' },
    { id: 'operating-system', label: 'The OS', icon: 'monitor' },
    { id: 'the-thinking', label: 'Thinking', icon: 'layers' },
    { id: 'portfolio', label: 'Portfolio', icon: 'briefcase' },
    { id: 'proof-points', label: 'Receipts', icon: 'award' },
    { id: 'selected-work', label: 'Work', icon: 'book-open' },
    { id: 'lightning-lessons', label: 'Lessons', icon: 'mic' },
    { id: 'contact', label: 'Contact', icon: 'mail' },
  ],
  contactAria: 'Contact options',

};
