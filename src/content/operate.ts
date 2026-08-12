import type { OperateContent } from './types';

/**
 * Four cards, deliberately the same shape as each other.
 *
 * The Operating System card used to carry a "14 agents, 45 workflows" chip and
 * a body three times longer than its neighbours, so one of four read as a
 * different component. The chip is gone (the counts are in the hero status line
 * and the OS section), and the bodies are now within a few words of each other.
 *
 * TODO(krish): the Build Loop used to say "Voyage agents in production across
 * Anthropic, Gemini, and OpenAI". Dropped "Voyage" because I could not tell
 * what it names and it reads as a typo. Say the word and it goes back.
 */
export const operate: OperateContent = {
  id: 'how-i-operate',
  // One title, both trees. The mobile variant said "The operating stack", which
  // was written to sit under an eyebrow rather than because anyone said it.
  title: "I've built my own AI OS.",
  sub: 'I use only what I\'ve tested on myself to solve customer problems.',

  pillars: [
    {
      icon: 'target',
      title: 'The Revenue Engine',
      body: 'I don\'t take care of research, cold email, nurture or CRM any more. My goal is to begin my day with decisions and selections, not questions and admin.',
    },
    {
      icon: 'bot',
      title: 'The Operating System',
      body: 'My 14-agent fleet does what a 15-person team used to as they work: hand offs, audits and health checks, so the system is the IT team.',
    },
    {
      icon: 'file-text',
      title: 'The Content Engine',
      body: 'I have very specific writing standards, so I constantly work to encode my taste, standards & judgement, building my AI brain.',
    },
    {
      icon: 'wrench',
      title: 'The Build Loop',
      body: 'Voice clones, video clones, memory webs & learning loops in production across all models. I hold a Friday arvo WIP so they self-reflect on their week.',
    },
  ],

  flywheel: {
    title: 'One flywheel',
    points: [
      'Standards are universal',
      'Learnings carry forward',
      'Failure and check ins are important lessons',
      'Momentum compounds',
    ],
  },
};
