import type { OfferContent } from './types';

export const offer: OfferContent = {
  id: 'work-with-me',
  eyebrow: 'Work with me',
  title: { desktop: 'Work with me', mobile: 'Three ways in', sheet: 'Work with me' },
  sub: {
    desktop: 'Three ways in. Pick the one that fits.',
    mobile: 'Pick the one that fits.',
    sheet: 'Three ways in. Pick the one that fits.',
  },

  cards: [
    {
      icon: 'users',
      title: 'Join the AI Decision Cohort',
      eyebrow: 'Quarterly · $3,500 / seat',
      body: 'Three weeks, mostly async, fifteen senior leaders. You bring a nervous AI decision; you leave with a board-ready answer. Quarterly, $3,500 per seat.',
      cta: 'See the cohort',
      href: 'https://themindmaker.ai/cohort',
      primary: true,
    },
    {
      icon: 'building-2',
      title: 'Hire Mindmaker for enterprise work',
      eyebrow: 'Signal Session $15k · Revenue Architecture $60k+',
      body: 'If your company has AI capabilities but no clear commercial strategy, I help commercialize them. The Signal Session ($15k, 1 day) for alignment. The Revenue Architecture ($60k+, 30 days) for the full build.',
      cta: 'See enterprise offers',
      href: 'https://themindmaker.ai/enterprise',
      primary: false,
    },
    {
      icon: 'book-open',
      title: 'Read before you hire',
      eyebrow: 'Free',
      body: "Techonomic is where I think out loud. Signal & Noise is where I interrogate peers. Both are free. Start there if you're not ready for a call.",
      cta: 'Read Techonomic',
      href: 'https://www.techonomic.co',
      primary: false,
    },
  ],
};
