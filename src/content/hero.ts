import type { HeroContent } from './types';
import { site } from './site';

export const hero: HeroContent = {
  // The eyebrow is gone on purpose. It did no work, and "operator-advisor" is a
  // retired self-description. See project-documentation/POSITIONING.md.
  eyebrow: '',
  status: '14 agents · 45 workflows',
  h1: site.spine,
  sub: 'I\'ve spent 16 years commercializing data and tech for content and media businesses, and now I\'m an operator, builder and advisor, helping commercial leaders who want to take control of AI. Read my Substack →',
  channel: {
    // Arrows are affordances, not copy. Each surface renders its own.
    label: 'Read Mindmaker Live',
    href: site.links.mindmakerLive,
  },
  // One label, one destination, shared with the nav CTA. Both used to say
  // "Work with me" and point at a section of that name; that section folded
  // into Contact on 12 Aug 2026, so both now say what the section they land on
  // says.
  primaryCta: 'Get in touch',
  primaryHref: '#contact',
  secondaryCta: 'How I operate',
  secondaryHref: '#how-i-operate',
  trustLabel: 'Experience across',
  // McCann (seven months) and BBC (eleven months), both 2007 to 2008, are off.
  trustLogos: [
    { asset: 'microsoft', alt: 'Microsoft' },
    { asset: 'nine', alt: 'Nine' },
    { asset: 'singtel', alt: 'SingTel' },
    { asset: 'captify', alt: 'Captify' },
  ],
};
