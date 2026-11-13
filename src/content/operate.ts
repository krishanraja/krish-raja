import type { OperateContent } from './types';

/**
 * The hero's bold line and fit copy, and the four pillars the brain graphic
 * (BrainBloom) labels. The pillars are deliberately the same shape as each
 * other: when one carried a count chip and a body three times longer, one of
 * four read as a different component.
 */
/**
 * The hero paragraph, broken into a lead, four traits and a closing line
 * (Krish, 2026-11-11), because one five-line grey paragraph read as a block on
 * a phone. Was: "I work best with curious leaders with a determination to
 * evolve, strong standards and clear north stars and an imaginative nature -
 * and I work to 🚀 businesses who are building the next era of creative and
 * media technologies."
 */
const fit = {
  lead: 'I work best with leaders who are',
  traits: ['curious', 'determined to evolve', 'strong standards, clear north stars', 'imaginative'],
  close: 'I work to 🚀 businesses building the next era of creative and media technologies.',
} as const;

export const operate: OperateContent = {
  id: 'how-i-operate',
  // One title, both trees. The mobile variant said "The operating stack", which
  // was written to sit under an eyebrow rather than because anyone said it.
  title: "The pace of change is intense. I'm here to help.",
  sub: `${fit.lead} ${fit.traits.slice(0, -1).join(', ')} and ${fit.traits[fit.traits.length - 1]}. ${fit.close}`,
  fit,

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
