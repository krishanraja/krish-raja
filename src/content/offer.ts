import type { OfferContent } from './types';
import { site } from './site';

/**
 * One card, because there is one thing sold and it is sold somewhere else.
 *
 * No price appears here or anywhere in this repo. Pricing lives on
 * themindmaker.ai only, so there is exactly one place to keep current.
 *
 * Link to the Mindmaker root only. The two deeper routes it used to link to
 * are orphaned on that site and serve retired prices. They are listed in
 * project-documentation/retired-names.json and the test suite enforces it.
 */
export const offer: OfferContent = {
  id: 'work-with-me',
  // No eyebrow: with one card the title says it, and mobile would repeat itself.
  eyebrow: '',
  title: 'Work with me',
  sub: 'One practice, capped. Everything else here is build work.',

  cards: [
    {
      icon: 'building-2',
      title: 'Work with Mindmaker',
      body: 'Mindmaker is a capped advisory practice. I take a small number of engagements a year, from one decision to a full rebuild of how a business decides. Everything, including pricing, lives on the Mindmaker site.',
      cta: 'See how it works',
      href: site.links.mindmaker,
      primary: true,
    },
  ],
};
