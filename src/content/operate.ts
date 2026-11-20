import type { OperateContent } from './types';
import { home } from './home';

/**
 * The hero's bold line and the four pillars the brain graphic
 * (BrainBloom) labels. The pillars are deliberately the same shape as each
 * other: when one carried a count chip and a body three times longer, one of
 * four read as a different component.
 */
const titleParts = ['The pace of change is intense.', "I'm here to help."] as const;

export const operate: OperateContent = {
  id: 'how-i-operate',
  titleParts,
  title: titleParts.join(' '),
  sub: home.brainAria,

  pillars: [
    {
      icon: 'target',
      title: 'The Revenue Engine',
      short: 'Revenue',
      body: 'I don\'t do research, cold email, nurture or CRM any more, the system does. I begin my day with decisions and trade offs, not admin.',
    },
    {
      icon: 'bot',
      title: 'The Operating System',
      short: 'Operating System',
      body: 'My 14-agent fleet does what a 15-person team used to as they work: hand offs, audits and health checks. The IT team is the system itself.',
    },
    {
      icon: 'file-text',
      title: 'The Taste & Judgement Engine',
      short: 'Taste & Judgement',
      body: 'I have specific standards for what goes out in my name, so I encode my taste, standards & judgement - codifying my AI brain privately.',
    },
    {
      icon: 'wrench',
      title: 'The Build Loop',
      short: 'Build Loop',
      body: 'Voice clones, video clones, memory webs & learning loops in production across all models. I hold a Friday arvo WIP so they self-reflect on their week.',
    },
  ],
};
