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
 * krish@themindmaker.ai stays forever, by Krish's decision.
 */
const DOMAINS_LIVE = false;

const hosts = DOMAINS_LIVE
  ? {
      root: 'https://mindmake.co',
      content: 'https://content.mindmake.co',
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
  spine:
    'Commercial AI leader for content, media and IP businesses.',
  cluster: 'content, media and IP businesses',

  title: 'Krish Raja: commercial leader for content, media and IP businesses',
  description:
    'Sixteen years commercializing content, media and IP businesses. $9M to $61M at Nine, $0 to $12M ARR at Captify, $4M to $38M at SingTel. Now running Mindmake OS, a 14-agent AI operating system in production.',
  jobTitle: 'Commercial leader and founder of Mindmake',

  url: 'https://www.krishraja.com',
  canonical: 'https://www.krishraja.com/',
  // Every public address on this site points here, decided 12 Aug 2026. It is
  // the same address the Calendly account bills to, so booking and email land
  // in one inbox rather than two.
  email: 'krish@themindmaker.ai',
  ogImage: 'https://www.krishraja.com/og-image.png',
  ogImageAlt: 'Krish Raja, commercial leader for content, media and IP businesses',
  twitterHandle: '@krishraja',
  locale: 'en_US',
  language: 'en-US',
  websiteDescription:
    'Personal website of Krish Raja, commercial leader for content, media and IP businesses and founder of Mindmake',
  updated: '2026-08-12',
  themeColor: '#0055DD',

  // Prose below is rendered into public/llms.txt by scripts/generate-static.mts.
  // It lives here, next to the meta it has to agree with, so the two cannot drift.
  bio: 'Krish Raja is a commercial leader for content, media and IP businesses, and the founder of Mindmake. Sixteen years commercializing media, data and technology businesses across London, Sydney and New York. He now builds the AI systems that run commercial engines in that same sector.',

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
      detail:
        "a portable, private memory system that keeps an operator's judgment usable across the tools they work in.",
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

  sameAs: ['https://www.linkedin.com/in/krish-raja', hosts.root, hosts.content],

  knowsAbout: [
    'Agentic Systems Architecture',
    'AI Commercialization',
    'Multi-Agent Orchestration',
    'Memory Architecture for AI',
    'Cost Optimization for AI Operations',
    'Product Marketing for AI',
    'Go-to-Market Strategy',
    'Media and Entertainment Commercial Strategy',
    'AI Literacy for Executives',
    'Revenue Operations',
  ],

  alumniOf: ['Microsoft', 'University for Creative Arts', 'University of Manchester'],

  links: {
    linkedin: 'https://www.linkedin.com/in/krish-raja',
    mindmake: hosts.root,
    content: hosts.content,
    ctrl: hosts.ctrl,
    // mediaradar.com/signal-and-noise 404s as of 19 Aug 2026, found by
    // `npm run links:check`. This is the owned channel page, and it is the
    // capture source the content index already records for this appearance.
    signalAndNoise: 'https://www.signalandnoise.ai/executive-voices',
    // The account root rather than one event type, so retiring or renaming an
    // event type cannot leave a 404 on the contact section. Swap it for
    // /krish-raja (30 min, first-time intros) if you want to pin the length.
    calendly: 'https://calendly.com/krish-raja',
  },
};
