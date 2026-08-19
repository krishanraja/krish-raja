import type { PortfolioContent } from './types';
import { site } from './site';

/**
 * One primary block, three branches, a secondary shelf.
 *
 * This was five equal cards until 12 Aug 2026: Mindmaker, Fractionl Pulse,
 * CTRL, Mindmaker Live and Signal & Noise, all the same size on one row. Five
 * peers is a statement that the five things carry equal weight, which is the
 * opposite of the consolidation Krish is doing. Mindmake is the focus; CTRL and
 * Content are arms of it, so they sit inside it. Fractionl Pulse, Full Time and
 * Signal & Noise are real work and stay on the page one tier down, because this
 * is the only place on the site they appear at all.
 *
 * Meliora and AdFixus are still off entirely. The advisory engagements are not
 * named on this site; the receipts section carries the same work anonymized.
 *
 * TODO(krish): Fractionl Circle is written below and commented out. It needs a
 * URL and one line of its own before it can ship. Its mark is solved, because
 * it shares the Fractionl one already here. Uncomment and fill the two fields.
 *
 */
export const portfolio: PortfolioContent = {
  id: 'portfolio',
  title: 'My focus areas',
  sub: 'Everything runs through Mindmake. Advisory, product and content, out of one operating system.',
  betaBadge: 'Beta',

  primary: {
    name: 'Mindmake',
    description:
      'Helping leaders amplify their expertise with AI to make the next million dollar decision.',
    asset: 'mindmake',
    // The wordmark runs near-black to mint, so the first four letters vanish on
    // a dark card. Same flag, same reason, as the other gradient marks here.
    plateOnDark: true,
    url: site.links.mindmake,
    branches: [
      {
        name: 'Advisory',
        role: 'Capped practice',
        description:
          'A small number of engagements a year, from taking one decision apart to rebuilding how a business decides.',
        mark: 'square',
        url: site.links.mindmake,
      },
      {
        name: 'CTRL',
        role: 'Product',
        description: 'A portable, private memory web so your AI keeps hold of your judgment.',
        mark: 'soft',
        url: site.links.ctrl,
      },
      {
        name: 'Content',
        role: 'Editorial',
        description: 'What I publish, in two formats.',
        mark: 'round',
        url: site.links.content,
        formats: ['The Money of AI', 'Building with AI'],
      },
    ],
  },

  secondaryHeading: 'Also building',
  secondary: [
    {
      name: 'Signal & Noise',
      description:
        'Conversations with operators on how AI is reshaping the content and media industry.',
      asset: 'signal-and-noise',
      url: site.links.signalAndNoise,
      role: 'Executive Host',
      invertOnDark: true,
    },
    {
      name: 'Fractionl Pulse',
      description: 'Live verified market intelligence on fractional supply and demand.',
      asset: 'fractionl',
      url: 'https://fractionl.ai',
      role: 'Build experiment',
      isBeta: true,
      plateOnLight: true,
    },
    {
      name: 'Full Time',
      description: 'An interactive AI football podcast.',
      asset: 'full-time',
      url: 'https://fulltime.fm',
      role: 'Build experiment',
      isBeta: true,
      plateOnLight: true,
    },
    // {
    //   name: 'Fractionl Circle',
    //   description: 'TODO(krish): one line.',
    //   asset: 'fractionl',
    //   url: 'TODO(krish): a URL of its own, not Pulse\'s.',
    //   role: 'Build experiment',
    //   isBeta: true,
    //   plateOnLight: true,
    // },
  ],
};
