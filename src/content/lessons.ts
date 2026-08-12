import type { LessonsContent } from './types';

/**
 * The student count is 4,000+, confirmed by Krish. The old copy also claimed
 * "20 years of business building", which contradicted the spine sentence's
 * sixteen; that claim is gone and is not coming back. See FACTS.md.
 */
export const lessons: LessonsContent = {
  id: 'lightning-lessons',
  // No "Free" on either surface. It was a chip on every card and the first word
  // of a mobile-only heading; free is a price, and prices live on themindmaker.ai.
  //
  // That mobile heading is gone with it, along with the mobile-only sub "Taken
  // by more than 4,000 people." Both were written to fill a layout slot rather
  // than because Krish said them. The 4,000 figure is not lost: the deck section
  // carries it on both trees, in his own words.
  title: 'See me in action.',
  sub: 'Here are some of the live sessions I lead to help leaders paint a better picture of the future of AI businesses.',

  /**
   * Employers that have sent someone to a Lightning Lesson, from the Maven
   * attendee export. Twenty-eight of them, in the order Krish supplied.
   *
   * Every mark is the brand's own, pulled from Brandfetch by domain and
   * committed under public/files/brand logos/. `npm run media` renders them.
   * Nothing here is a client, a customer or an endorsement, and the label says
   * exactly what the data supports: people from these companies attended.
   * Per-company attendee counts are in FACTS.md and are not published, because
   * most of them are one.
   */
  attendeesLabel: 'Attendees from household name businesses learn with me',
  attendees: [
    { slug: 'walmart', name: 'Walmart', domain: 'walmart.com' },
    { slug: 'pepsico', name: 'PepsiCo', domain: 'pepsico.com' },
    { slug: 'pg', name: 'P&G', domain: 'pg.com' },
    { slug: 'bmw', name: 'BMW', domain: 'bmw.com' },
    { slug: 'toyota', name: 'Toyota', domain: 'toyota.com' },
    { slug: 'ford', name: 'Ford', domain: 'ford.com' },
    { slug: 'boeing', name: 'Boeing', domain: 'boeing.com' },
    { slug: 'pfizer', name: 'Pfizer', domain: 'pfizer.com' },
    { slug: 'roche', name: 'Roche', domain: 'roche.com' },
    { slug: 'bayer', name: 'Bayer', domain: 'bayer.com' },
    { slug: 'fedex', name: 'FedEx', domain: 'fedex.com' },
    { slug: 'visa', name: 'Visa', domain: 'visa.com' },
    { slug: 'mastercard', name: 'Mastercard', domain: 'mastercard.com' },
    { slug: 'american-express', name: 'American Express', domain: 'americanexpress.com' },
    { slug: 'goldman-sachs', name: 'Goldman Sachs', domain: 'goldmansachs.com' },
    { slug: 'deloitte', name: 'Deloitte', domain: 'deloitte.com' },
    { slug: 'pwc', name: 'PwC', domain: 'pwc.com' },
    { slug: 'accenture', name: 'Accenture', domain: 'accenture.com' },
    { slug: 'loreal', name: "L'Oreal", domain: 'loreal.com' },
    { slug: 'adidas', name: 'Adidas', domain: 'adidas.com' },
    { slug: 'lego', name: 'LEGO', domain: 'lego.com' },
    { slug: 'tesco', name: 'Tesco', domain: 'tesco.com' },
    { slug: 'cargill', name: 'Cargill', domain: 'cargill.com' },
    { slug: 'wells-fargo', name: 'Wells Fargo', domain: 'wellsfargo.com' },
    { slug: 'rbc', name: 'RBC', domain: 'rbc.com' },
    { slug: 'capital-one', name: 'Capital One', domain: 'capitalone.com' },
    { slug: 'cibc', name: 'CIBC', domain: 'cibc.com' },
    { slug: 'us-bank', name: 'US Bank', domain: 'usbank.com' },
  ],

  lessons: [
    {
      title: "Build Your AI's Permanent Identity",
      description:
        'Give your AI a durable identity so it stays consistent across tools, sessions, and teams.',
      asset: 'lesson-permanent-identity',
      link: 'https://maven.com/p/8fba42/build-your-ai-s-permanent-identity',
    },
    {
      title: 'Build an Autonomous Business with AI',
      description:
        'Design and run an autonomous business where AI handles the heavy lifting.',
      asset: 'lesson-autonomous-business',
      link: 'https://maven.com/p/99a529/build-an-autonomous-business-with-ai',
    },
    {
      title: 'Vibe Coding: How Your Competitors Are Pulling Ahead',
      description:
        'See how AI-native teams are shipping faster, and the unfair advantage you can build with vibe coding.',
      asset: 'lesson-vibe-coding-unfair',
      link: 'https://maven.com/p/b118d0/vibe-coding-how-your-competitors-are-pulling-ahead',
    },
    {
      title: 'Create Your Business Agentic Org Chart',
      description:
        'Map out the agents, roles, and handoffs that run your business alongside your team.',
      asset: 'lesson-agentic-org-chart',
      link: 'https://maven.com/p/48674a/create-your-business-agentic-org-chart',
    },
    {
      title: 'Build Your AI Chief of Staff',
      description:
        'Stand up an AI chief of staff that drives execution, follow-ups, and decisions for you.',
      asset: 'lesson-ai-chief-of-staff',
      link: 'https://maven.com/p/dd0ebd/build-your-ai-chief-of-staff',
    },
  ],
};
