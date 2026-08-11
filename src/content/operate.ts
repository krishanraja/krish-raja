import type { OperateContent } from './types';

export const operate: OperateContent = {
  id: 'how-i-operate',
  eyebrow: 'How I operate',
  title: { desktop: 'How I operate', mobile: 'The operating stack' },
  sub: 'The lab. What one operator can run with the right stack, tested on real commercial problems.',

  pillars: [
    {
      icon: 'target',
      title: 'The Revenue Engine',
      body: 'AI-powered cold email, LinkedIn DMs, and named-account sequences across multiple ventures. Enterprise GTM engines built on agents, not people.',
    },
    {
      icon: 'bot',
      title: 'The Operating System',
      badge: '14 agents, 45 workflows',
      body: 'A 14-agent fleet replacing a 15-person team. Ops, email triage, content synthesis, lead scoring, dependency mapping, credential health, all running 24/7 with named roles (Marcus, Kai, Zara, Maya, and more).',
    },
    {
      icon: 'file-text',
      title: 'The Content Engine',
      body: 'Automated newsletter production, podcast synthesis, slide generation, editorial calendars. Techonomic and Signal & Noise ship without me being the bottleneck.',
    },
    {
      icon: 'wrench',
      title: 'The Build Loop',
      body: 'Voice clones, video agents, memory webs, autonomous researchers, API-connected assistants. Voyage agents in production across Anthropic, Gemini, and OpenAI.',
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
