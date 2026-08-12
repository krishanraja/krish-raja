import type { SiteContent } from './types';

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
    'Sixteen years commercializing content, media and IP businesses. Now I build the AI systems that run them.',
  cluster: 'content, media and IP businesses',

  title: 'Krish Raja: commercial leader for content, media and IP businesses',
  description:
    'Sixteen years commercializing content, media and IP businesses. $9M to $61M at Nine, $0 to $12M ARR at Captify, $4M to $38M at SingTel. Now running Mindmaker OS, a 14-agent AI operating system in production.',
  jobTitle: 'Commercial leader and founder of Mindmaker',

  url: 'https://www.krishraja.com',
  canonical: 'https://www.krishraja.com/',
  email: 'hello@krishraja.com',
  ogImage: 'https://www.krishraja.com/og-image.png',
  ogImageAlt: 'Krish Raja, commercial leader for content, media and IP businesses',
  twitterHandle: '@krishraja',
  locale: 'en_US',
  language: 'en-US',
  websiteDescription:
    'Personal website of Krish Raja, commercial leader for content, media and IP businesses and founder of Mindmaker',
  updated: '2026-08-12',
  themeColor: '#0055DD',

  // Prose below is rendered into public/llms.txt by scripts/generate-static.mts.
  // It lives here, next to the meta it has to agree with, so the two cannot drift.
  bio: 'Krish Raja is a commercial leader for content, media and IP businesses, and the founder of Mindmaker. Sixteen years commercializing media, data and technology businesses across London, Sydney and New York. He now builds the AI systems that run commercial engines in that same sector.',

  nowHeading: 'What he does now',
  now: [
    {
      name: 'Mindmaker OS',
      detail:
        'a 14-agent, 45-workflow autonomous operating system in production, with stack components licensed to three businesses. It runs the business and is the lab the advisory work comes out of. Mindmaker is the advisory operated with the OS, Mindmaker Live is its content pillar, CTRL is its app, and Fractionl Circle and Fractionl Pulse sit alongside it.',
    },
    {
      name: 'Mindmaker',
      qualifier: 'Founder',
      detail:
        'a capped advisory practice. A small number of engagements a year, from taking one decision apart to rebuilding how a business decides. Sold at themindmaker.ai.',
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
      name: 'Mindmaker Live',
      qualifier: 'https://live.themindmaker.ai',
      detail:
        'the editorial channel. Two formats. Built gets to why someone built the thing they built. Paid follows the money in a shift and names the mechanism. Replaces Techonomic and The Builder Economy.',
    },
    {
      name: 'Signal & Noise',
      detail: 'podcast with media operators on how AI is reshaping the industry.',
    },
    { name: 'Teaches on Maven', detail: '' },
  ],

  // The Build tab names are prefixed by the generator. This is the tail only.
  buildWorkNote:
    'are live experiments from the operating system, not products for sale.',

  education:
    'MA Design Strategy (Distinction), University for the Creative Arts. BA English Language and Linguistics, University of Manchester. Harvard Business School Executive Education. Keynote speaker, Sydney Opera House.',

  // TODO(krish): techonomic.co no longer resolves and thebuildereconomy.com
  // returns 404. Both are dropped here. Redirect them to live.themindmaker.ai,
  // archive them, or let them lapse?

  sameAs: [
    'https://www.linkedin.com/in/krish-raja',
    'https://themindmaker.ai',
    'https://live.themindmaker.ai',
  ],

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
    mindmaker: 'https://themindmaker.ai',
    mindmakerLive: 'https://live.themindmaker.ai',
    signalAndNoise: 'https://www.mediaradar.com/signal-and-noise',
  },
};
