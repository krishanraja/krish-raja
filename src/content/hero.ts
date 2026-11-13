import type { HeroContent } from './types';

export const hero: HeroContent = {
  // The eyebrow is gone on purpose. It did no work, and "operator-advisor" is a
  // retired self-description. See project-documentation/POSITIONING.md. The
  // "14 agents · 45 workflows" status line went the same way on 20 Aug 2026:
  // only the mobile tree ever rendered it. The counts live in llms.txt.
  //
  // The paragraph under the hero is operate.fit (Krish, 2026-11-11). The old
  // "From writing automations at Microsoft..." sub and the Substack link beside
  // it came off with the 9 Nov rebuild and were deleted as stale on 13 Nov.
  h1: 'Your AI Chief of Staff.',
  // One label, one destination, shared with the nav CTA. Both used to say
  // "Work with me" and point at a section of that name; that section folded
  // into Contact on 12 Aug 2026, so both now say what the section they land on
  // says.
  primaryCta: 'Get in touch',
  secondaryCta: 'AI Immersion Sessions',
  secondaryHref: '#lightning-lessons',
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
