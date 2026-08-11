import type { HeroContent } from './types';

export const hero: HeroContent = {
  eyebrow: {
    desktop: "Hi, I'm Krish. Operator-advisor.",
    mobile: 'Operator-advisor',
  },
  status: '14 agents · 45 workflows',
  h1: 'I run an autonomous AI business; I help companies commercialize theirs.',
  sub: {
    desktop:
      '16 years commercializing products at Microsoft, Nine, Captify, and Singtel. $9M → $61M revenue growth. $0 → $12M ARR. Now operating a 14-agent fleet across multiple ventures.',
    mobile:
      '16 years commercializing products at Microsoft, Nine, Captify, and Singtel. $9M → $61M revenue. $0 → $12M ARR. Now operating a 14-agent fleet.',
  },
  channel: {
    label: { desktop: 'Read Techonomic →', mobile: 'Read Techonomic' },
    href: 'https://www.techonomic.co',
  },
  primaryCta: 'Work with me',
  secondaryCta: { desktop: 'How I operate', mobile: 'How I operate ↓' },
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
