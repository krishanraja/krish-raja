import type { ReceiptsContent } from './types';

/**
 * Every figure here is canonical. See project-documentation/FACTS.md for the
 * source of each one.
 *
 * Two changes on 12 Aug 2026:
 *
 * 1. Four achievement cards, not five. The grid is four wide, so the fifth
 *    orphaned onto a row of its own. Captify and Nexxen were both market
 *    launches, so they are one card now and both figures survive: the metric
 *    carries $0 to $12M, the description carries $4M to $38M.
 * 2. The named engagements are gone. AdFixus and Meliora are now one
 *    anonymized advisory entry, with no client name and no dollar figure. The
 *    $254K POC, Hearst, Arena Group and The Weather Company are all off the
 *    site. FACTS.md still records them; the site does not publish them.
 */
export const receipts: ReceiptsContent = {
  id: 'proof-points',
  title: 'Success across UK, AU and USA.',
  sub: 'I\'ve launched markets, built revenue streams and pivoted businesses with receipts, which lays the foundation for my work.',

  tabs: {
    receipts: 'Receipts',
    journey: 'Journey',
    credentials: 'Credentials',
  },
  credentialsHeading: 'Recognition & Credentials',
  journeyHeading: 'Global Journey',
  engagementsHeading: 'Advisory work',

  achievements: [
    {
      icon: 'trending-up',
      category: 'Revenue Growth',
      metric: '$9M → $61M',
      context: 'Broadcaster Digital Transformation',
      description:
        "Took digital revenue up 7x in three years, triple-digit growth in two of them. 70+ commercial products out the door, including APAC's first authenticated CTV product.",
    },
    {
      icon: 'rocket',
      category: 'Market Launches',
      metric: '$0 → $12M ARR',
      context: 'Built one region, scaled another',
      description:
        'Launched an APAC data business from scratch as first hire: team, product, pipeline. Then took a platform business from $4M to $38M across twelve markets through 2 technology M&As.',
    },
    {
      icon: 'users',
      category: 'Team → Agent Fleet',
      metric: '18 People → 14 Agents',
      context: 'From human team to autonomous OS',
      description:
        'Led an 18-person org across three continents. Now I run a 14-agent fleet across the ventures, and help leaders envisage the path to theirs. ',
    },
    {
      icon: 'target',
      category: 'P&L Leadership',
      metric: '$55M P&L',
      context: 'Data & Automation',
      description:
        'Ran the full P&L for a data and automation division at 22% EBITDA. Guided M&A and portfolio transformation.',
    },
  ],

  // One entry, anonymized. No client name and no dollar figure, so nothing
  // here needs a permission it does not have. See the note at the top.
  engagements: [
    {
      name: 'Executive advisory',
      role: 'Media, content IP, telco and entertainment businesses',
      description:
        'Working to help on first-party data infrastructure, IP, content and AI. This usually involves corporate strategy, product strategy and GTM strategy end-to-end.',
    },
  ],

  credentials: [
    'Founder, Mindmake',
    'B&T 30 Under 30, Strategy',
    'Writer, Mindmake Content',
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
