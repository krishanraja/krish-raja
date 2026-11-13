import type { SiteContent } from './types';

/**
 * The one line to change when mindmake.co resolves.
 *
 * The brand became Mindmake on 12 August 2026 but the domain has no DNS record
 * yet, so the copy renamed and the links did not. Shipping mindmake.co early
 * would put 404s on a site whose whole job is proof. Flip this to true, run
 * `npm run generate`, and every URL moves at once; `npm run links:check` proves
 * the new ones resolve before you do.
 *
 * The contact address is deliberately NOT derived from this. See FACTS.md:
 * krish@mindmake.co is the published contact address (Krish, 2026-10-03). It
 * replaced krish@themindmaker.ai, which still redirects to it.
 */
// Flipped 11 Nov 2026 (Krish). The channel lives at makeyourmindup.ai, not content.mindmake.co.
const DOMAINS_LIVE = true;

const hosts = DOMAINS_LIVE
  ? {
      root: 'https://mindmake.co',
      content: 'https://makeyourmindup.ai',
      ctrl: 'https://ctrl.mindmake.co',
    }
  : {
      root: 'https://themindmaker.ai',
      content: 'https://live.themindmaker.ai',
      ctrl: 'https://ctrl.themindmaker.ai',
    };

/**
 * The single source of truth for identity, positioning and meta.
 *
 * This module feeds the hero, the <title> and every meta tag, both JSON-LD
 * blocks, public/llms.txt and public/sitemap.xml. Change it here and run
 * `npm run generate`. Do not hand-edit the generated artifacts.
 */
export const site: SiteContent = {
  name: 'Krish Raja',
  firstName: 'Krish',
  lastName: 'Raja',
  username: 'krishraja',

  // The spine sentence. Also on his LinkedIn. Must not drift.
  spine: 'AI-Native Commercial Strategy Leader',
  cluster: 'content, media and IP businesses',

  // The browser tab and every search and share card (Krish, 2026-11-13). The
  // spine, then "and Speaker", because event organisers are who this site is
  // for (docs/NORTH_STAR.md). 60 characters, so Google shows it whole.
  title: 'Krish Raja: AI-Native Commercial Strategy Leader and Speaker',
  // 156 characters, under the ~160 Google shows before it cuts. Starts with the
  // name so an answer engine quoting it quotes who it is about. The receipts
  // ($9M to $61M and the rest) moved to llms.txt and the structured data, where
  // there is room for them.
  description:
    'Krish Raja is an AI-native commercial strategy leader, keynote speaker and founder of Mindmake, with sixteen years growing content, media and IP businesses.',
  jobTitle: 'AI-Native Commercial Strategy Leader, founder of Mindmake',

  url: 'https://www.krishraja.com',
  canonical: 'https://www.krishraja.com/',
  // The single published contact address for the whole site (Krish, 2026-10-03).
  // krish@themindmaker.ai still redirects here, so older links keep working.
  email: 'krish@mindmake.co',
  // Rendered by `npm run brand` from the bitmoji. The ?v= changes whenever the
  // card does, because LinkedIn, Slack and WhatsApp cache a preview image by URL
  // and would otherwise keep showing the old one for weeks.
  ogImage: 'https://www.krishraja.com/og-image.png?v=20261113',
  ogImageAlt: 'Krish Raja, AI-native commercial strategy leader and keynote speaker, as his bitmoji',
  // A real photograph for the structured data. Search engines match a person to
  // a face, not to a cartoon, so the bitmoji stays on the cards and the tab.
  personImage: 'https://www.krishraja.com/media/home/krish-headshot.jpg',
  // Krish, 2026-11-13. Credits every share on X to him.
  twitterHandle: '@therealkrisho',
  locale: 'en_GB',
  language: 'en-GB',
  websiteDescription:
    'Personal website of Krish Raja, AI-native commercial strategy leader, keynote speaker and founder of Mindmake',
  updated: '2026-11-13',
  // The hero's own off-white, so a phone's address bar matches the page
  // instead of turning blue.
  themeColor: '#fbfaf8',

  // Prose below is rendered into public/llms.txt by scripts/generate-static.mts.
  // It lives here, next to the meta it has to agree with, so the two cannot drift.
  bio: 'Krish Raja is an AI-native commercial strategy leader and the founder of Mindmake. Sixteen years scaling commercial businesses across Microsoft, Nine Entertainment, SingTel and Captify. He now builds the AI systems that run commercial engines in content, media and IP businesses.',

  nowHeading: 'What he does now',
  now: [
    {
      name: 'Mindmake OS',
      detail:
        'a 14-agent, 45-workflow autonomous operating system in production, with stack components licensed to three businesses. It runs the business and is the lab the advisory work comes out of. Mindmake branches three ways: Advisory, CTRL as the product, and Content as the editorial channel.',
    },
    {
      name: 'Mindmake',
      qualifier: 'Founder',
      detail:
        `a capped advisory practice. A small number of engagements a year, from taking one decision apart to rebuilding how a business decides. Sold at ${hosts.root.replace('https://', '')}.`,
    },
    {
      name: 'CTRL',
      qualifier: 'Coming soon',
      detail:
        "a portable, private memory system that keeps an operator's judgement usable across the tools they work in.",
    },
  ],

  writingHeading: 'Writing and audio',
  writing: [
    {
      name: 'Content',
      qualifier: hosts.content,
      detail:
        'the Mindmake editorial channel. Two formats. The Money of AI follows the money in a shift and names the mechanism. Building with AI gets to why someone built the thing they built.',
    },
    {
      name: 'Signal & Noise',
      qualifier: 'Executive Host',
      detail:
        'a podcast with media operators on how AI is reshaping the industry. A secondary endeavour: the work originates in Mindmake and the channel amplifies it, plus guest hosting.',
    },
    { name: 'Teaches on Maven', detail: '' },
  ],

  // The Build tab names are prefixed by the generator. This is the tail only.
  buildWorkNote:
    'are live experiments from the operating system, not products for sale.',

  education:
    'MA Design Strategy (Distinction), University for the Creative Arts. BA English Language and Linguistics, University of Manchester. Harvard Business School Executive Education. Keynote speaker, Sydney Opera House.',

  // techonomic.co and thebuildereconomy.com are dropped from sameAs. Both are
  // dead (TLS failure and a 404 respectively) and Krish is letting them lapse,
  // decided 12 August 2026. Do not add a redirect for either.

  // Every profile that is verifiably his, from the content index (records 22,
  // 23, 25 and 19, all approved). sameAs is how a search engine or an answer
  // engine decides these are one person, so more verified links means one
  // confident entity instead of several weak ones.
  sameAs: [
    'https://www.linkedin.com/in/krish-raja',
    hosts.root,
    hosts.content,
    'https://substack.com/@krishraja1',
    'https://www.youtube.com/@therealkrisho',
    'https://maven.com/mindmaker',
    'https://www.signalandnoise.ai/executive-voices',
    'https://x.com/therealkrisho',
  ],

  knowsAbout: [
    'Agentic Systems Architecture',
    'AI Commercialisation',
    'Multi-Agent Orchestration',
    'Memory Architecture for AI',
    'Cost Optimisation for AI Operations',
    'Product Marketing for AI',
    'Go-to-Market Strategy',
    'Media and Entertainment Commercial Strategy',
    'AI Literacy for Executives',
    'Revenue Operations',
    'Artificial Intelligence Strategy',
    'AI in Media and Advertising',
    'Advertising Technology',
    'Connected TV',
    'Retail Media',
    'Data Monetisation',
  ],

  // Former employers and universities. The university is "for the Creative
  // Arts", as the education line says; this list had dropped "the".
  alumniOf: [
    'Microsoft',
    'Nine Entertainment',
    'Captify',
    'Nexxen',
    'University for the Creative Arts',
    'University of Manchester',
  ],
  awards: ['B&T 30 Under 30, Strategy (2017)'],

  // Krish, 9 Nov 2026: CTRL is coming soon. Its address does not resolve yet.
  comingSoon: [hosts.ctrl],

  links: {
    linkedin: 'https://www.linkedin.com/in/krish-raja',
    mindmake: hosts.root,
    content: hosts.content,
    ctrl: hosts.ctrl,
    // mediaradar.com/signal-and-noise 404s as of 19 Aug 2026, found by
    // `npm run links:check`. This is the owned channel page, and it is the
    // capture source the content index already records for this appearance.
    signalAndNoise: 'https://www.signalandnoise.ai/executive-voices',
    // Pinned to the event type on Krish's instruction, 2026-08-29, so a booking
    // lands on the intro call rather than a profile page the visitor still has
    // to choose from. Verified 200 on the day it was set. The trade-off the
    // account root avoided is real: renaming or retiring this event type WILL
    // 404 the contact section, so re-verify it if the event is ever changed.
    calendly: 'https://calendly.com/krish-raja/krish-raja',
  },
};
