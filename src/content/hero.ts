import type { HeroContent } from './types';

export const hero: HeroContent = {
  eyebrow: "Hi, I'm Krish. Operator-advisor.",
  status: '14 agents · 45 workflows',
  h1: 'I run an autonomous AI business; I help companies commercialize theirs.',
  sub: '16 years commercializing products at Microsoft, Nine, Captify, and Singtel. $9M → $61M revenue growth. $0 → $12M ARR. Now operating a 14-agent fleet across multiple ventures.',
  channel: {
    // Arrows are affordances, not copy. Each surface renders its own.
    label: 'Read Techonomic',
    href: 'https://www.techonomic.co',
  },
  primaryCta: 'Work with me',
  secondaryCta: 'How I operate',
  secondaryHref: '#how-i-operate',
  trustLabel: 'Experience across',
  trustLogos: [
    { asset: 'nine', alt: 'Nine' },
    { asset: 'mccann', alt: 'McCann' },
    { asset: 'captify', alt: 'Captify' },
    { asset: 'singtel', alt: 'Singtel' },
    { asset: 'bbc', alt: 'BBC' },
    { asset: 'microsoft', alt: 'Microsoft' },
  ],
};
