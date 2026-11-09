import type { HomeContent } from './types';
import { site } from './site';
import { portfolio } from './portfolio';
import { lessons } from './lessons';

/**
 * The homepage built on 9 Nov 2026, approved by Krish round by round in review.
 *
 * Every line here is either one he wrote in review ("Your AI Chief of Staff.",
 * "Book an immersion session", "What's coming in AI, before it's obvious.") or
 * an existing approved string reused from its own module. The two brand lines
 * are each brand's own: "Promote your AI from intern to chief of staff." is
 * mindmake.co's page title, and the channel line is makeyourmindup.ai's.
 *
 * The three ways in share one card anatomy on purpose: label, title, one line,
 * one button. Krish rejected the first version for carrying three or four
 * blocks of text per card and for headers that sat differently on each card.
 */

const MYMU = 'https://home.makeyourmindup.ai';

export const home: HomeContent = {
  loader: {
    tagline: 'Your AI Chief of Staff.',
    label: 'Loading',
  },
  bitmoji: '/media/home/bitmoji.jpg',

  practice: {
    id: 'build',
    title: 'Build Your AI Chief of Staff',
    sub: portfolio.primary.description,
    options: [
      {
        id: 'speaking',
        label: 'Speaking & immersion sessions',
        title: lessons.title,
        line: 'POSSIBLE 2026 · Cannes Lions 2026 · Sydney Opera House · Maven',
        cta: 'Book an immersion session',
        image: '/media/home/stage.jpg',
        tone: 'light',
      },
      {
        id: 'mindmake',
        label: 'Build your AI brain with me',
        title: 'Promote your AI from intern to chief of staff.',
        line: portfolio.primary.description,
        cta: 'See the advisory practice',
        href: site.links.mindmake,
        image: '/media/home/mindmake-engine.webp',
        video: '/media/home/mindmake-engine.mp4',
        wordmark: '/media/home/mindmake-wordmark.png',
        wordmarkAlt: 'Mindmake',
        tone: 'light',
      },
      {
        id: 'channel',
        label: 'Subscribe to the channel',
        title: "What's coming in AI, before it's obvious.",
        series: true,
        cta: 'Subscribe free',
        href: `${MYMU}/subscribe`,
        image: '/media/home/mymu-robot.webp',
        wordmark: '/media/home/mymu-wordmark.png',
        wordmarkAlt: 'Make Your Mind Up',
        tone: 'dark',
      },
    ],
  },

  channel: {
    id: 'live',
    title: 'Make Your Mind Up',
    sub: "What's coming in AI, before it's obvious.",
    wordmark: '/media/home/mymu-wordmark.png',
    series: [
      { name: 'follow.the.money', day: 'Mon' },
      { name: 'under.the.hood', day: 'Wed' },
      { name: 'mind.the.gap', day: 'Fri' },
    ],
    subscribe: { label: 'Subscribe free', href: `${MYMU}/subscribe` },
    youtube: { label: 'YouTube', href: 'https://www.youtube.com/@makeyourmind-up' },
    feedUrl: `${MYMU}/feed`,
    youtubeChannelId: 'UCvxmp6eKUqrjGGbCGl7f9-A',
    snapshotLabel: 'Latest episodes',
    // Fallback only. The page asks /api/live first (api/live.js), which reads the
    // Substack and YouTube feeds and caches them at the edge for 30 minutes. This
    // list is what shows if that call fails, so refresh it now and then by hand.
    snapshot: [
      {
        title: 'Why every country wants its own AI, and what that means for your business',
        link: `${MYMU}/p/why-every-country-wants-its-own-ai`,
        date: '2026-11-06',
        series: 'mind.the.gap',
        format: 'Watch now (5 mins)',
        video: 'SxWsxqbrJh4',
      },
      {
        title: 'AI used to reply. Now it acts first. Claude Duet is the start.',
        link: `${MYMU}/p/ai-used-to-reply-now-it-acts-first`,
        date: '2026-11-04',
        series: 'under.the.hood',
        format: 'Listen now',
        video: '2ikBqjPsB7o',
      },
      {
        title: "Claude's AI is eating the jobs of its own humans. What does that signal for the rest of us?",
        link: `${MYMU}/p/claudes-ai-is-eating-the-jobs-of`,
        date: '2026-11-02',
        series: 'follow.the.money',
        format: 'Watch now (5 mins)',
        video: 'TXvQmPEGRKs',
      },
      {
        title: 'Can Meta’s Muse or Grok Bot run my life? I tested both.',
        link: `${MYMU}/p/can-metas-muse-or-grok-bot-run-my`,
        date: '2026-10-24',
        format: 'Watch now (5 mins)',
        video: '1nCobSFt2rc',
      },
    ],
  },

  ask: {
    title: 'Tell me about the event.',
    fields: {
      name: 'Name',
      namePlaceholder: 'Your name',
      event: 'Event or organization',
      eventPlaceholder: 'Event name',
      when: 'Date and city',
      whenPlaceholder: 'When and where',
      message: 'What you have in mind',
      messagePlaceholder: 'The audience, the topic, the format.',
    },
    subjectPrefix: 'Speaking enquiry: ',
    note: 'Opens your email app, addressed to',
    submit: 'Write the email',
    sentTitle: 'Your email is ready to send',
    sentBody: 'If your email app did not open, write to',
    sentOr: 'or',
    sentCall: 'book a call with me',
    close: 'Close',
  },

  swipeHint: 'Swipe for more',
  brainCaption: 'Founder of Mindmake',
  brainAria: 'The operating system as a brain, one part lit at a time',
  brainPartsAria: 'Parts of the operating system',
  wallFilters: [
    { id: 'all', label: 'All' },
    { id: 'podcast', label: 'Podcasts' },
    { id: 'talk', label: 'Talks' },
    { id: 'press', label: 'Press' },
  ],
};

