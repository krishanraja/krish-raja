import type { PortfolioContent } from './types';

/**
 * One flat grid, five cards, no tabs.
 *
 * Advise, Build and Write were three tabs of three, which hid two thirds of
 * the section behind a click and saved no vertical space. Collapsed 12 Aug 2026.
 *
 * Three entries came off at the same time and are not oversights:
 *
 * 1. Meliora and AdFixus. The advisory engagements are no longer named on this
 *    site at all. The receipts section carries the same work anonymized, and
 *    the rule there is no client name and no dollar figure.
 * 2. Fractionl Circle. Same brand, same logo and the same URL as Fractionl
 *    Pulse, so the row read as a duplicate.
 *
 * Order is still advise, then build, then write. `isBeta` marks the build work
 * and the generator reads it to write the Build work line in llms.txt, so it
 * is load-bearing rather than decoration.
 */
export const portfolio: PortfolioContent = {
  id: 'portfolio',
  eyebrow: 'Portfolio',
  title: 'The portfolio',
  sub: 'What I run, what I am still building, and where I write. Some of the Beta ones become products, most are how I learn the stack.',
  betaBadge: 'Beta',

  items: [
    {
      name: 'Mindmaker',
      description: 'Helping leaders find their own way of working alongside AI.',
      asset: 'mindmaker',
      url: 'https://themindmaker.ai',
      role: 'Founder, capped practice',
    },
    {
      name: 'Fractionl Pulse',
      description: 'Live market intelligence on fractional supply and demand.',
      asset: 'fractionl',
      url: 'https://fractionl.ai',
      role: 'Full-Stack Founder',
      isBeta: true,
    },
    {
      name: 'CTRL',
      description: 'A portable, private memory web so your AI keeps hold of your judgment.',
      asset: 'ctrl',
      url: 'https://ctrl.themindmaker.ai',
      role: 'Full-Stack Founder',
      isBeta: true,
    },
    {
      name: 'Mindmaker Live',
      description: 'Where I write. Why people built what they built, and who is paying for it.',
      asset: 'mindmaker-live',
      url: 'https://live.themindmaker.ai',
      role: 'Writer and host',
      plateOnDark: true,
    },
    {
      name: 'Signal & Noise',
      description: 'Conversations with media operators on how AI is reshaping the industry.',
      asset: 'signal-and-noise',
      url: 'https://www.mediaradar.com/signal-and-noise',
      role: 'AI Host',
      invertOnDark: true,
    },
  ],
};
