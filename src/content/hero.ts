import type { HeroContent } from './types';
import { site } from './site';

export const hero: HeroContent = {
  // The eyebrow is gone on purpose. It did no work, and "operator-advisor" is a
  // retired self-description. See project-documentation/POSITIONING.md.
  eyebrow: '',
  status: '14 agents · 45 workflows',
  h1: site.spine,
  // The link that follows is a link, not a sentence. This used to end with
  // "Read my Substack →" in the prose as well, so the words rendered twice, once
  // as dead text and once as the anchor beside it. The anchor keeps the words.
  sub: 'I\'ve spent 16 years commercializing data and tech for content and media businesses, and now I\'m an operator, builder and advisor, helping commercial leaders who want to take control of AI.',
  channel: {
    // Arrows are affordances, not copy. Each surface renders its own.
    label: 'Read my Substack',
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
  // McCann is off: seven months in 2007, and the content index found no
  // verified employment record for it.
  //
  // TODO(krish): BBC replaced Captify here on your instruction, so the strip no
  // longer carries the one logo with a receipt attached. Captify is where the
  // $0 to $12M ARR figure comes from and the hire is verified by Captify's own
  // announcement, which is in the content index. BBC is eleven months in 2007
  // to 2008 and appears only on material you control. Say the word and Captify
  // goes back, or sits alongside BBC as a fifth logo.
  trustLogos: [
    { asset: 'microsoft', alt: 'Microsoft' },
    { asset: 'nine', alt: 'Nine' },
    { asset: 'singtel', alt: 'SingTel' },
    { asset: 'bbc', alt: 'BBC' },
  ],
};
