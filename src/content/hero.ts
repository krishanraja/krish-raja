import type { HeroContent } from './types';

export const hero: HeroContent = {
  // The eyebrow is gone on purpose. It did no work, and "operator-advisor" is a
  // retired self-description. See project-documentation/POSITIONING.md. The
  // "14 agents · 45 workflows" status line went the same way on 20 Aug 2026:
  // only the mobile tree ever rendered it. The counts live in llms.txt.
  //
  // The hero lead lives in operate.titleParts. The audience badges belong to the engagement section.
  h1: 'Your AI Chief of Staff.',
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
