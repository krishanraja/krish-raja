import type { PortfolioContent } from './types';
import { site } from './site';

/**
 * One primary block, three branches, a secondary shelf.
 *
 * This was five equal cards until 12 Aug 2026: Mindmaker, Fractionl Pulse,
 * CTRL, Mindmaker Live and Signal & Noise, all the same size on one row. Five
 * peers is a statement that the five things carry equal weight, which is the
 * opposite of the consolidation Krish is doing. Mindmake is the focus; CTRL and
 * Content are arms of it, so they sit inside it. Signal & Noise, the two
 * Fractionl products and Full Time are real work and stay on the page one tier
 * down, because this is the only place on the site they appear at all.
 *
 * Meliora and AdFixus are still off entirely. The advisory engagements are not
 * named on this site; the receipts section carries the same work anonymized.
 */
export const portfolio: PortfolioContent = {
  id: 'portfolio',
  title: 'My portfolio exists to help others.',
  sub: 'Whether it be advisory, product or content, everything runs out of one operating system to compound effects, and is geared to helping people & businesses discover how to control AI.',
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
        formats: [
          { name: 'The Money of AI', asset: 'format-the-money-of-ai' },
          { name: 'Building with AI', asset: 'format-building-with-ai' },
        ],
      },
    ],
  },

  /**
   * Order matters here, and only for one reason: Pulse and Circle are the same
   * brand and share the Fractionl mark, so they sit next to each other. Split
   * apart they read as one card rendered twice rather than two products.
   */
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
      name: 'Full Time',
      description: 'An interactive AI football podcast because I believe this is what\'s next in media.',
      asset: 'full-time',
      url: 'https://fulltime.fm',
      role: 'Build experiment',
      isBeta: true,
      plateOnLight: true,
    },
    {
      name: 'Pulse',
      description: 'Live verified market intelligence on fractional supply and demand.',
      asset: 'fractionl',
      // The product, not the parent company. This pointed at fractionl.ai, which
      // is the Fractionl umbrella site: a reader who clicked the Pulse card
      // landed somewhere that does not mention Pulse.
      url: 'https://pulse.fractionl.ai',
      role: 'Build experiment',
      isBeta: true,
      plateOnLight: true,
    },
    {
      name: 'Circle',
      description: 'Surface your existing network around your next revenue stream.',
      asset: 'fractionl',
      // Its own product at its own address. Circle came off the page in the
      // first place because it pointed at Pulse's URL, which made it look like
      // one thing listed twice. It is not: Pulse is market intelligence, Circle
      // is a network recall tool, and they share only the Fractionl mark.
      url: 'https://circle.fractionl.ai',
      role: 'Build experiment',
      isBeta: true,
      plateOnLight: true,
    },
  ],
};
