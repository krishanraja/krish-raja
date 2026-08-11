import type { WorkContent } from './types';

export const work: WorkContent = {
  id: 'writing',
  eyebrow: 'Writing & speaking',
  title: { desktop: 'Writing & speaking', mobile: "The longest arguments I've made" },
  sub: {
    desktop: "The longest-running arguments I've made, plus recent conversations.",
    mobile: 'Plus recent conversations.',
  },

  items: [
    {
      title: 'Predicting the Future of Haptic Design (2011)',
      type: 'Research',
      summary:
        "Master's thesis predicting the evolution of haptic and tactile interfaces.",
      description:
        "A Master's thesis predicting the evolution of haptic and tactile interfaces through interviews with UX leaders at IDEO, Microsoft, and Google. Most of what was predicted has now played out.",
      // No link and no action label on purpose. This card shipped with an
      // empty anchor that went nowhere. It is a description-only dialog until
      // a real URL exists.
      // TODO(krish): is the thesis online anywhere? Supply a URL and the Read
      // button comes back.
      asset: 'masters-thesis',
      icon: 'book-open',
    },
    {
      title: 'Zero to Multi-Million ARR: Scaling APAC',
      type: 'Case Study',
      summary: "Playbook for launching Captify's APAC business from zero.",
      description:
        "Detailed walkthrough of building Captify's APAC business from zero. Team, GTM, product-market fit, and the decisions that enabled rapid scaling.",
      link: 'https://www.youtube.com/watch?v=6_bf9L1OX3s&t=271s',
      actionLabel: 'Watch',
      asset: 'give-it-a-nudge',
      icon: 'video',
    },
    {
      title: 'My Take on AI in Media',
      type: 'Podcast',
      summary:
        'November 2025 podcast discussing how AI is restructuring media businesses.',
      description:
        'November 2025 podcast discussing how AI is restructuring media businesses, from content creation to monetization.',
      link: 'https://open.spotify.com/episode/2c5xrFDlPC1Oqw9kcFKDay?si=ocqEDPLPSummNkaPT6T2Tg',
      actionLabel: 'Listen',
      asset: 'podcast-tile',
      icon: 'mic',
    },
  ],

  /** Desktop only. The portfolio Write tab covers this on mobile. */
  publishRow: [
    {
      prefix: 'Writing regularly at',
      link: { label: 'Mindmaker Live', href: 'https://live.themindmaker.ai' },
    },
    {
      prefix: 'Hosting',
      link: {
        label: 'Signal & Noise',
        href: 'https://www.mediaradar.com/signal-and-noise',
      },
    },
  ],
};
