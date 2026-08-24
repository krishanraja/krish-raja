import type { HeroContent } from './types';
import { site } from './site';

export const hero: HeroContent = {
  // The eyebrow is gone on purpose. It did no work, and "operator-advisor" is a
  // retired self-description. See project-documentation/POSITIONING.md. The
  // "14 agents · 45 workflows" status line went the same way on 20 Aug 2026:
  // only the mobile tree ever rendered it, and the counts read better in the OS
  // section, which shows them running.
  h1: site.spine,
  // The link that follows is a link, not a sentence. This used to end with
  // "Read my Substack →" in the prose as well, so the words rendered twice, once
  // as dead text and once as the anchor beside it. The anchor keeps the words.
  sub: 'From writing automations at Microsoft 16 years ago, to launching and running entire businesses commercializing data and tech, I have made myself the blueprint for becoming a true AI-era leader, and my mission is to help others chart that path too.',
  channel: {
    // Arrows are affordances, not copy. Each surface renders its own.
    label: 'Read my Substack',
    href: site.links.content,
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
