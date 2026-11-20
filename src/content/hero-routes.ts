import { site } from './site';
import { lessons } from './lessons';

const toolkit = site.links.mindmake + '/2-minute-ai-upgrade-toolkit';

export const heroRoutes = [
  { id: 'audit', short: 'Audit', title: 'Take the Judgement Audit', detail: 'Free · 6 questions', href: toolkit },
  { id: 'modules', short: 'Modules', title: 'Choose an AI Brain module', detail: 'One-off purchase', href: toolkit },
  { id: 'media', short: 'Media', title: 'Subscribe to Make Your Mind Up', detail: 'My media channel', href: site.links.content },
  { id: 'immersion', short: 'Immersion', title: 'See an AI Immersion Session', detail: 'One-off drop-in · For your team', href: '#' + lessons.id },
  { id: 'sprint', short: 'Sprint', title: 'Explore the AI Brain Sprint', detail: '30 days · Build with me', href: site.links.mindmake },
  { id: 'ongoing', short: 'Ongoing', title: 'Discuss a longer-term engagement', detail: 'Ongoing advisory', href: null },
] as const;

export type HeroRoute = typeof heroRoutes[number];

export const routeCopy = {
  portraitAlt: 'Krish Raja',
  openBrain: 'Open my brain',
  mapTabs: ['Revenue', 'System', 'Judgement', 'Build loop'],
  backPortrait: 'Back to portrait',
  region: 'Ways to get started',
  links: 'Go straight to an option',
  pause: 'Pause automatic rotation',
  play: 'Play automatic rotation',
  next: 'Preview next option',
  contact: 'Get in touch',
  sessionInvite: 'Bring an AI Immersion Session to your team.',
  sessionLine: 'Tell me who’s in the room and what you want to explore.',
  addressLabel: 'To',
  otherWays: 'Other ways to get in touch',
  name: 'Your name',
  email: 'Your email',
  message: 'What do you have in mind?',
  send: 'Send enquiry',
  close: 'Close',
  general: 'Get in touch',
  immersion: 'AI Immersion Session',
  ongoing: 'Longer-term engagement',
  leadership: 'Leadership or advisory enquiry',
  mailAction: 'Open in email',
  mailHint: 'Press Send in your email app to finish.',
  sending: 'Sending…',
  accepted: 'Your enquiry is on its way.',
  emailReady: 'Your email is ready to send.',
  retryMail: 'Open your draft again',
  failed: 'Delivery could not be confirmed. You can retry or send the same message from your email app.',
};
