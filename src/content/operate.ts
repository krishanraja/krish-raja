import type { OperateContent } from './types';

export const operate: OperateContent = {
  id: 'how-i-operate',
  eyebrow: 'How I operate',
  title: { desktop: 'How I operate', mobile: 'The operating stack' },
  sub: "An autonomous business running on AI in production — here's the stack.",

  pillars: [
    {
      icon: 'target',
      title: { desktop: 'The Revenue Engine', mobile: 'Revenue engine' },
      body: {
        desktop:
          'AI-powered cold email, LinkedIn DMs, and named-account sequences across multiple ventures. Enterprise GTM engines built on agents, not people.',
        mobile:
          'AI-powered cold email, LinkedIn DMs, named-account sequences across multiple ventures. Enterprise GTM built on agents, not people.',
      },
    },
    {
      icon: 'bot',
      title: { desktop: 'The Operating System', mobile: 'Operating system' },
      badge: { desktop: '14 agents, 45 workflows', mobile: '14 agents · 45 workflows' },
      body: {
        desktop:
          'A 14-agent fleet replacing a 15-person team. Ops, email triage, content synthesis, lead scoring, dependency mapping, credential health, all running 24/7 with named roles (Marcus, Kai, Zara, Maya, and more).',
        mobile:
          'A 14-agent fleet replacing a 15-person team. Ops, triage, synthesis, lead scoring, dependency mapping — all running 24/7 with named roles.',
      },
    },
    {
      icon: 'file-text',
      title: { desktop: 'The Content Engine', mobile: 'Content engine' },
      body: {
        desktop:
          'Automated newsletter production, podcast synthesis, slide generation, editorial calendars. Techonomic and Signal & Noise ship without me being the bottleneck.',
        mobile:
          'Automated newsletter, podcast synthesis, slide generation, editorial calendars. Techonomic and Signal & Noise ship without me being the bottleneck.',
      },
    },
    {
      icon: 'wrench',
      title: { desktop: 'The Build Loop', mobile: 'Build loop' },
      body: {
        desktop:
          'Voice clones, video agents, memory webs, autonomous researchers, API-connected assistants. Voyage agents in production across Anthropic, Gemini, and OpenAI.',
        mobile:
          'Voice clones, video agents, memory webs, autonomous researchers, API-connected assistants in production.',
      },
    },
  ],

  flywheel: {
    title: 'One flywheel',
    body: 'The ventures generate case material that advising and writing both draw on, which is why the same lessons keep showing up across all three.',
    points: [
      'Every venture feeds the whole',
      'Learnings carry across projects',
      'One failure prevents the next',
      'Momentum through iteration',
    ],
  },
};
