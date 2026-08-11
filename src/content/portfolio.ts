import type { PortfolioContent } from './types';

export const portfolio: PortfolioContent = {
  id: 'portfolio',
  eyebrow: 'Portfolio',
  title: 'The portfolio',
  sub: 'What I advise on, what I am building, and what I publish.',
  betaBadge: 'Beta',

  tabs: [
    {
      id: 'advise',
      label: 'Advise',
      icon: 'briefcase',
      items: [
        {
          name: 'Mindmaker',
          description:
            'Helping leaders create their new personal working style alongside AI',
          asset: 'mindmaker',
          url: 'https://themindmaker.ai',
          role: 'Founder, capped practice',
        },
        {
          name: 'Meliora',
          description: 'GenAI transformation for telco, media and entertainment businesses',
          asset: 'meliora',
          url: 'https://www.meliora.company',
          role: 'Associate',
        },
        {
          name: 'AdFixus',
          description:
            'Customer Identity and data infrastructure transformation for media enterprise',
          asset: 'adfixus',
          url: 'https://www.adfixus.com',
          role: 'Fractional SVP: Enterprise',
        },
      ],
    },
    {
      id: 'build',
      label: 'Build work',
      icon: 'rocket',
      note: 'Live experiments from the operating system. Some become products, most are how I learn the stack.',
      items: [
        {
          name: 'Fractionl Circle',
          description: 'The AI-powered matchmaker between your network, ideas and customers.',
          asset: 'fractionl',
          url: 'https://fractionl.ai',
          role: 'Full-Stack Founder',
          isBeta: true,
        },
        {
          name: 'Fractionl Pulse',
          description:
            'Live unique market intelligence tracking fractional supply and demand trends.',
          asset: 'fractionl',
          url: 'https://fractionl.ai',
          role: 'Full-Stack Founder',
          isBeta: true,
        },
        {
          name: 'Ctrl',
          description:
            'Build your portable, private memory web to accelerate your future with AI',
          asset: 'ctrl',
          url: 'https://ctrl.themindmaker.ai',
          role: 'Full-Stack Founder',
          isBeta: true,
        },
      ],
    },
    {
      id: 'write',
      label: 'Write',
      icon: 'mic',
      items: [
        {
          name: 'Techonomic',
          description:
            'Strategic insights on AI, data commercialization, and revenue growth for executives',
          asset: 'techonomic',
          url: 'https://www.techonomic.co',
          role: 'Writer',
          invertOnDark: true,
        },
        {
          name: 'Signal & Noise',
          description:
            'Conversations with world-class media operators exploring how AI is reshaping the industry',
          asset: 'signal-and-noise',
          url: 'https://www.mediaradar.com/signal-and-noise',
          role: 'AI Host',
          invertOnDark: true,
        },
        {
          name: 'The Builder Economy',
          description: 'Conversations with leaders building with AI',
          asset: 'builder-economy',
          url: 'https://thebuildereconomy.com',
          role: 'Host',
        },
      ],
    },
  ],
};
