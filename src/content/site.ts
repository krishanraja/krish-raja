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

  spine: 'I run an autonomous AI business; I help companies commercialize theirs.',
  cluster: 'content, media and IP businesses',

  title: 'Krish Raja: Operator-advisor running an agentic AI business',
  description:
    'I run a 14-agent AI business in production and help companies commercialize theirs. 16 years commercializing products at Microsoft, Nine, Captify, and Singtel. Founder of Mindmaker. Writer of Techonomic.',
  jobTitle: 'Operator-advisor and founder of Mindmaker',

  url: 'https://www.krishraja.com',
  canonical: 'https://www.krishraja.com/',
  email: 'hello@krishraja.com',
  ogImage: 'https://www.krishraja.com/og-image.png',
  ogImageAlt: 'Krish Raja: Operator-advisor',
  twitterHandle: '@krishraja',
  locale: 'en_US',
  language: 'en-US',
  websiteDescription:
    'Personal website of Krish Raja, operator-advisor and founder of Mindmaker',
  updated: '2026-08-11',

  // Prose below is rendered into public/llms.txt by scripts/generate-static.mts.
  // It lives here, next to the meta it has to agree with, so the two cannot drift.
  bio: 'Krish Raja runs an autonomous AI business and helps companies commercialize theirs. Sixteen years commercializing media, data and technology businesses across London, Sydney and New York.',

  nowHeading: 'What he does now',
  now: [
    {
      name: 'Mindmaker OS',
      detail:
        'a 14-agent, 45-workflow autonomous operating system in production, with stack components licensed to three businesses. It runs the business and is the lab the advisory work comes out of.',
    },
    {
      name: 'Mindmaker',
      qualifier: 'Founder',
      detail: 'advisory for leaders building their working style alongside AI. Sold at themindmaker.ai.',
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
      name: 'Techonomic',
      detail: 'newsletter on AI, data commercialization and revenue growth for executives.',
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

  sameAs: [
    'https://www.linkedin.com/in/krish-raja',
    'https://themindmaker.ai',
    'https://www.techonomic.co',
    'https://thebuildereconomy.com',
  ],

  knowsAbout: [
    'Agentic Systems Architecture',
    'AI Commercialization',
    'Multi-Agent Orchestration',
    'Memory Architecture for AI',
    'Cost Optimization for AI Operations',
    'Product Marketing for AI',
    'Go-to-Market Strategy',
    'The Builder Economy',
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
