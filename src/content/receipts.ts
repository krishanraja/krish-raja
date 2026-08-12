import type { ReceiptsContent } from './types';

/**
 * Every figure here is canonical. See project-documentation/FACTS.md for the
 * source of each one and the rules attached to it, including the rule that
 * the $254K client is never named.
 */
export const receipts: ReceiptsContent = {
  id: 'proof-points',
  eyebrow: 'Receipts',
  title: 'Sixteen years of receipts',
  sub: 'The track record that informs the advice.',

  tabs: {
    receipts: 'Receipts',
    journey: 'Journey',
    credentials: 'Credentials',
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
        "Led digital revenue 7x over 3 years. Triple-digit growth in 2 of 3 years. 70+ commercial products launched, including APAC's first authenticated CTV product.",
    },
    {
      icon: 'rocket',
      category: 'Market Creation',
      metric: '$0 → $12M ARR',
      context: 'Built Region from Zero',
      description:
        'Launched APAC programmatic business from scratch: team, product, pipeline. First hire to market leader.',
    },
    {
      icon: 'users',
      category: 'Team → Agent Fleet',
      metric: '18 People → 14 Agents',
      context: 'From human team to autonomous OS',
      description:
        'Led an 18-person org across three continents. Now running a 14-agent fleet across multiple ventures. Built the org chart, then built the agent chart.',
    },
    {
      icon: 'globe',
      category: 'Platform Revenue, APAC',
      metric: '$4M → $38M',
      context: 'Twelve markets, two technology M&As',
      description:
        'Scaled SingTel platform revenue across twelve markets through two technology M&As.',
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

  engagements: [
    {
      name: 'AdFixus',
      role: 'Fractional SVP Enterprise',
      // The $254K client is never named. Hearst, Arena Group and The Weather
      // Company are pipeline, which is a different claim. See FACTS.md.
      description:
        'Repositioned from cookie-deprecation defense to first-party identity infrastructure. Contracted a $254K POC with a major US publisher and rebuilt enterprise pipeline with Hearst, Arena Group and The Weather Company.',
    },
    {
      name: 'Meliora',
      role: 'Executive Advisory',
      description: 'Gen AI advisory and ventures for media, telco and entertainment.',
    },
  ],

  credentials: [
    'Founder, Mindmaker',
    'B&T 30 Under 30, Strategy',
    'Writer, Mindmaker Live',
    'Harvard Business School (Finance, Analytics & Economics)',
    'MA Design Strategy (Distinction)',
    'Sydney Opera House Keynote Speaker',
    'Published Author, Speaker & Writer',
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
      role: 'From commercial career to full-stack portfolio',
      story:
        'Operating an autonomous AI business and advising companies commercializing theirs.',
    },
  ],

  // The same canonical figures as `achievements`, written as prose for
  // public/llms.txt. The consistency suite fails the build if the two disagree.
  roles: [
    {
      org: 'Nine Entertainment',
      title: 'Head of Data & Automation',
      detail:
        "grew data and automation revenue from $9M to $61M in three years. Launched 70+ commercial products, including APAC's first authenticated CTV product. Built a $55M automated marketplace from scratch. Ran a $55M P&L at 22% EBITDA.",
    },
    {
      org: 'Captify',
      title: 'Managing Director APAC',
      detail:
        'built APAC from $0 to $12M ARR in three years at 22% EBITDA, as first hire scaling to an 18-person team.',
    },
    {
      org: 'Nexxen (SingTel)',
      title: 'Head of Platform & Product Strategy APAC',
      detail:
        'scaled platform revenue from $4M to $38M across twelve markets through two technology M&As.',
    },
    {
      org: 'Microsoft UK',
      title: '',
      detail:
        'built and deployed automated media campaigns in 2010, years before programmatic had a name.',
    },
  ],
};
