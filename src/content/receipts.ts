import type { ReceiptsContent } from './types';

/**
 * Every figure here is canonical. See project-documentation/FACTS.md for the
 * source of each one and the rules attached to it, including the rule that
 * the $254K client is never named.
 */
export const receipts: ReceiptsContent = {
  id: 'proof-points',
  eyebrow: 'Receipts',
  title: { desktop: 'Sixteen years of receipts', mobile: 'Sixteen years of proof' },
  sub: 'The track record that informs the advice.',

  tabs: {
    receipts: { desktop: 'Receipts', mobile: 'receipts' },
    journey: { desktop: 'Journey', mobile: 'journey' },
    credentials: { desktop: 'Credentials', mobile: 'credentials' },
  },
  credentialsHeading: 'Recognition & Credentials',
  journeyHeading: 'Global Journey',
  engagementsHeading: 'Named Engagements',

  achievements: [
    {
      icon: 'trending-up',
      category: 'Revenue Growth',
      metric: '$9M → $61M',
      context: 'Broadcaster Digital Transformation',
      description:
        'Led digital revenue 7x over 3 years. Triple-digit growth in 2 of 3 years. 70+ commercial products launched.',
    },
    {
      icon: 'rocket',
      category: 'Market Creation',
      metric: '$0 → $12M ARR',
      context: 'Built Region from Zero',
      description: {
        desktop:
          'Launched APAC programmatic business from scratch: team, product, pipeline. First hire to market leader.',
        mobile:
          'Launched APAC programmatic from scratch: team, product, pipeline. First hire to market leader.',
      },
    },
    {
      icon: 'users',
      category: 'Team → Agent Fleet',
      metric: '18 People → 14 Agents',
      context: 'From human team to autonomous OS',
      description: {
        desktop:
          'Led an 18-person org across three continents. Now running a 14-agent fleet across multiple ventures. Built the org chart, then built the agent chart.',
        mobile:
          'Led an 18-person org across three continents. Now running a 14-agent fleet across multiple ventures.',
      },
    },
    {
      icon: 'target',
      category: 'P&L Leadership',
      metric: '$55M P&L',
      context: 'Data & Automation',
      description:
        'Ran full P&L for data and automation division. 22% EBITDA. Guided M&A and portfolio transformation.',
    },
  ],

  engagements: [],

  credentials: [
    'Founder, Mindmaker',
    'Writer, Techonomic Newsletter',
    {
      desktop: 'Harvard Business School (Finance, Analytics & Economics)',
      mobile: 'Harvard Business School',
    },
    'MA Design Strategy (Distinction)',
    { desktop: 'Sydney Opera House Keynote Speaker', mobile: 'Sydney Opera House Keynote' },
    { desktop: 'Published Author, Speaker & Writer', mobile: 'Published Author & Speaker' },
    'Ex-Microsoft Automation Specialist',
    'First Global Automated Media Campaigns (2010)',
  ],

  journey: [
    {
      city: 'London',
      period: '2008-2013',
      role: 'From coding to customer success',
      story:
        'Started at Microsoft, learning what it takes to ship at enterprise scale. Coded the first global automated media campaigns years before the industry caught up.',
    },
    {
      city: 'Sydney',
      period: '2013-2024',
      role: 'From Sales to Product & Corp Strategy',
      story:
        'Hired repeatedly to modernize legacy businesses and launch new revenue streams. Built regions, teams, and commercial systems from scratch.',
    },
    {
      city: 'New York',
      period: '2024-2026',
      role: {
        desktop: 'From commercial career to full-stack portfolio',
        mobile: 'From career to full-stack portfolio',
      },
      story:
        'Operating an autonomous AI business and advising companies commercializing theirs.',
    },
  ],
};
