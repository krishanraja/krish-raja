import type { LessonsContent } from './types';

/**
 * The student count is 4,000+, confirmed by Krish. The old copy also claimed
 * "20 years of business building", which contradicted the spine sentence's
 * sixteen; that claim is gone and is not coming back. See FACTS.md.
 */
export const lessons: LessonsContent = {
  id: 'lightning-lessons',
  eyebrow: 'Lightning Lessons',
  title: { desktop: 'See me in action.', mobile: 'Free, 60-minute Maven sessions' },
  sub: {
    desktop:
      'Here are some of the live sessions I lead to help leaders paint a better picture of the future of AI businesses.',
    mobile: 'Taken by more than 4,000 people.',
  },
  badge: 'Free',

  lessons: [
    {
      title: "Build Your AI's Permanent Identity",
      description:
        'Give your AI a durable identity so it stays consistent across tools, sessions, and teams.',
      asset: 'lesson-permanent-identity',
      link: 'https://maven.com/p/8fba42/build-your-ai-s-permanent-identity',
    },
    {
      title: 'Build an Autonomous Business with AI',
      description:
        'Design and run an autonomous business where AI handles the heavy lifting.',
      asset: 'lesson-autonomous-business',
      link: 'https://maven.com/p/99a529/build-an-autonomous-business-with-ai',
    },
    {
      title: 'Vibe Coding: How Your Competitors Are Pulling Ahead',
      description:
        'See how AI-native teams are shipping faster, and the unfair advantage you can build with vibe coding.',
      asset: 'lesson-vibe-coding-unfair',
      link: 'https://maven.com/p/b118d0/vibe-coding-how-your-competitors-are-pulling-ahead',
    },
    {
      title: 'Create Your Business Agentic Org Chart',
      description:
        'Map out the agents, roles, and handoffs that run your business alongside your team.',
      asset: 'lesson-agentic-org-chart',
      link: 'https://maven.com/p/48674a/create-your-business-agentic-org-chart',
    },
    {
      title: 'Build Your AI Chief of Staff',
      description:
        'Stand up an AI chief of staff that drives execution, follow-ups, and decisions for you.',
      asset: 'lesson-ai-chief-of-staff',
      link: 'https://maven.com/p/dd0ebd/build-your-ai-chief-of-staff',
    },
  ],
};
