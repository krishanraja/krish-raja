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
  eyebrow: 'How I operate',
  title: { desktop: 'How I operate', mobile: 'The operating stack' },
  sub: 'The lab. What one person can run with the right stack, tested on problems that actually pay.',

  pillars: [
    {
      icon: 'target',
      title: 'The Revenue Engine',
      body: 'Cold email, LinkedIn DMs and named-account sequences, all run by agents. The pipeline keeps moving whether or not I am at my desk.',
    },
    {
      icon: 'bot',
      title: 'The Operating System',
      body: 'A 14-agent fleet doing what a 15-person team used to. Ops, email triage, lead scoring, content, credential health, all of it running while I sleep.',
    },
    {
      icon: 'file-text',
      title: 'The Content Engine',
      body: 'Newsletters, podcast synthesis, slide decks, editorial calendars. Mindmaker Live and Signal & Noise both ship without me in the way.',
    },
    {
      icon: 'wrench',
      title: 'The Build Loop',
      body: 'Voice clones, video agents, memory webs, autonomous researchers, in production across Anthropic, Gemini and OpenAI. The ones that break teach me the most.',
    },
  ],

  flywheel: {
    title: 'One flywheel',
    points: [
      'Every venture feeds the next',
      'What I learn in one carries to the rest',
      'Each failure saves the next one',
      'Momentum compounds',
    ],
  },
};
