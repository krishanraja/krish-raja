import { appearances } from './appearances';
import { deck } from './deck';
import { receipts } from './receipts';
import { site } from './site';

const appearance = (id: string) => {
  const item = appearances.items.find(item => item.appearanceId === id);
  if (!item?.href) throw new Error(`Missing public appearance: ${id}`);
  return item.href;
};

const talk = (id: string) => {
  const item = deck.decks.find(item => item.id === id);
  if (!item?.href) throw new Error(`Missing public talk: ${id}`);
  return { title: item.title, href: item.href };
};

export interface ProfileEntry {
  label: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
}

export interface DiscoveryProfile {
  path: string;
  intent: 'leadership' | 'speaking';
  label: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  image: { path: string; alt: string; width: number; height: number };
  action: string;
  subject: string;
  sample: { label: string; href: string };
  section: string;
  entries: ProfileEntry[];
  aside: { title: string; text: string; link: { label: string; href: string } };
  invitation: string;
  prompt: string;
  updated: string;
}

const careerSources: Record<string, { label: string; href: string }> = {
  'Nine Entertainment': { label: 'Read my article for Nine', href: appearance('nine-data-transaction-byline') },
  Captify: { label: 'Read Captify’s appointment announcement', href: appearance('captify-hire-announcement') },
  'Nexxen (SingTel)': { label: 'See my contribution to IAB Australia’s CTV handbook', href: appearance('iab-connected-tv-handbook') },
};

export const executiveProfile: DiscoveryProfile = {
  path: '/executive-profile',
  intent: 'leadership',
  label: 'Executive profile',
  title: 'Krish Raja | Media & Entertainment Technology Executive and Adviser',
  description: 'Krish Raja’s executive profile for senior leadership and advisory roles in creative, media and entertainment technology. See his record at Nine, Captify and Nexxen.',
  headline: 'Commercial leadership in media and AI.',
  intro: 'At Nine, I grew data and automation revenue from $9M to $61M. At Captify, I built the APAC business from scratch. Today I advise leaders in creative, media and entertainment technology on AI, product strategy and growth.',
  image: { path: '/media/home/krish-headshot.jpg', alt: 'Krish Raja', width: 800, height: 800 },
  action: 'Discuss a role or advisory brief',
  subject: 'Leadership or advisory enquiry',
  sample: { label: 'See the commercial record', href: '#commercial-record' },
  section: 'The commercial record',
  entries: receipts.roles.filter(role => role.title).map(role => ({
    label: role.org,
    title: role.title,
    text: 'I ' + role.detail,
    link: careerSources[role.org],
  })),
  aside: {
    title: 'Advisory work today',
    text: 'I work with leaders who own a product, a revenue target or a catalogue of rights. Together we decide where first-party data and AI can earn their keep, what is worth bringing to market, and who should own the decision.',
    link: { label: 'Explore my advisory practice', href: site.links.mindmake },
  },
  invitation: 'Have a leadership or advisory brief?',
  prompt: 'Tell me about the business, the mandate and the decision the next leader needs to make.',
  updated: '2026-11-20',
};

const autonomous = talk('autonomous_business');
const orgChart = talk('agentic_org_chart');
const coding = talk('vibe_coding');

export const speakerProfile: DiscoveryProfile = {
  path: '/ai-keynote-speaker',
  intent: 'speaking',
  label: 'AI keynote speaker',
  title: 'Krish Raja | AI Keynote Speaker for Leadership Teams',
  description: 'Book Krish Raja for an AI keynote. Watch his leadership demo, explore talks on AI and the future of work, and see his Sydney Opera House speaking experience.',
  headline: 'AI keynote speaker for leaders.',
  intro: 'When an AI agent does the work, who makes the call? I show leadership teams what I give my agents at Mindmake and which decisions I keep. I’ve spoken at the Sydney Opera House and taught more than 4,000 students on Maven.',
  image: { path: '/media/home/stage.jpg', alt: 'Krish Raja speaking into a microphone', width: 700, height: 373 },
  action: 'Ask about a keynote',
  subject: 'AI keynote enquiry',
  sample: { label: 'Watch my AI leadership demo', href: appearance('ai-leadership-dothinkdo-webinar') },
  section: 'Talks for your audience',
  entries: [
    { label: 'Business strategy', title: autonomous.title, text: 'Which parts of a business can already run with AI? Follow a piece of work from brief to delivery and see the decisions I still make myself.', link: { label: 'See the Maven session', href: autonomous.href } },
    { label: 'Leadership teams', title: orgChart.title, text: 'Put an AI agent on an org chart. Who briefs it, who checks its work and who answers when it gets something wrong? The room leaves with a way to draw its own.', link: { label: 'See the Maven session', href: orgChart.href } },
    { label: 'Creative and product teams', title: coding.title, text: 'What happens when the person with the idea can build the first version? We look at how a team moves from a brief to working software and where judgement matters most.', link: { label: 'See the Maven session', href: coding.href } },
  ],
  aside: {
    title: 'A short speaker bio',
    text: 'Krish Raja is the founder of Mindmake and a commercial strategy leader who has built media and technology businesses at Nine, Captify and Nexxen. He has spoken at Adobe Symposium at the Sydney Opera House and taught more than 4,000 students on Maven. His talks explore what happens to work, revenue and human judgement when a business starts running on AI.',
    link: { label: 'Read the Adobe Symposium interview', href: appearance('adobe-symposium-opera-house-keynote') },
  },
  invitation: 'Who will be in the room?',
  prompt: 'Send the event, date and what you want your audience to take away. I’ll help you choose a talk.',
  updated: '2026-11-20',
};

export const discoveryProfiles = [executiveProfile, speakerProfile];
