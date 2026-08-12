import type { DeckContent } from './types';

/**
 * The thinking: a flickable deck of slides from four talks.
 *
 * Sources are the masters in public/files/slides/, 3600x2025 each.
 * `npm run media` renders two WebP widths per slide:
 * /media/deck/<id>-640.webp for the card, /media/deck/<id>-1600.webp for the
 * full-screen reader. The masters are not shipped.
 *
 * These slides were built for a projector, so the body text does not read at
 * card size on a phone. The deck is texture; the reader is where you read.
 *
 * Two exclusions, on purpose:
 * 1. agentic_org_chart_09 leads with "Operator, not advisor", which is a
 *    retired self-description. See project-documentation/POSITIONING.md.
 * 2. Slides whose main content is a quote attributed to a named third party
 *    (agentic_org_chart_08, vibe_coding_47). Everything here is Krish's own
 *    analysis, which is the only thing this site should assert.
 *
 * To add a slide: one entry here, then `npm run media`.
 */
export const deck: DeckContent = {
  id: 'the-thinking',
  title: 'I\'ve run sessions with 4000+ leaders.',
  sub: 'Here\'s how I set the scene, feel free to flick through.',
  readerHint: 'Tap to read',
  sessionLabel: 'See the session',

  decks: [
    {
      id: 'autonomous_business',
      title: 'The Autonomous Business',
      href: 'https://maven.com/p/99a529/build-an-autonomous-business-with-ai',
    },
    {
      id: 'agentic_org_chart',
      title: 'The Agentic Org Chart',
      href: 'https://maven.com/p/48674a/create-your-business-agentic-org-chart',
    },
    {
      id: 'vibe_coding',
      title: 'Vibe Coding',
      href: 'https://maven.com/p/b118d0/vibe-coding-how-your-competitors-are-pulling-ahead',
    },
    // No session page for this one, so no link rather than a guessed one.
    { id: 'ai_economics', title: 'The Economics of AI' },
  ],

  slides: [
    // The Autonomous Business
    { id: 'ab-17', deck: 'autonomous_business', source: 'autonomous_business_17.jpg', alt: "Slide: you're not adding a tool to your company, you're hiring a second species of worker" },
    { id: 'ab-23', deck: 'autonomous_business', source: 'autonomous_business_23.jpg', alt: 'Slide: AI is the brain, automation and data are the machine' },
    { id: 'ab-25', deck: 'autonomous_business', source: 'autonomous_business_25.jpg', alt: 'Slide: a terminal showing the fleet actually running, captioned before any theory, here it is' },
    { id: 'ab-26', deck: 'autonomous_business', source: 'autonomous_business_26.jpg', alt: 'Slide: she does not ask permission for routine work, she asks for the judgment calls' },
    { id: 'ab-29', deck: 'autonomous_business', source: 'autonomous_business_29.jpg', alt: "Slide: the teams pulling ahead aren't executing the work, they're governing it" },
    { id: 'ab-31', deck: 'autonomous_business', source: 'autonomous_business_31.jpg', alt: 'Slide: each step eliminates something you were doing yourself' },
    { id: 'ab-42', deck: 'autonomous_business', source: 'autonomous_business_42.jpg', alt: 'Slide: 120 emails of noise become 8 actions of signal' },
    { id: 'ab-46', deck: 'autonomous_business', source: 'autonomous_business_46.jpg', alt: 'Slide: the model is the brain, the harness is the body around it' },

    // The Agentic Org Chart
    { id: 'aoc-05', deck: 'agentic_org_chart', source: 'agentic_org_chart_05.jpg', alt: 'Slide: 78 percent of organizations used AI in 2024, almost none of them redrew the org chart' },
    { id: 'aoc-06', deck: 'agentic_org_chart', source: 'agentic_org_chart_06.jpg', alt: 'Slide: 49,135 AI-attributed job cuts in four months of 2026' },
    { id: 'aoc-11', deck: 'agentic_org_chart', source: 'agentic_org_chart_11.jpg', alt: "Slide: you're hiring a workforce, not buying a tool" },
    { id: 'aoc-15', deck: 'agentic_org_chart', source: 'agentic_org_chart_15.jpg', alt: 'Slide: this is a management problem wearing a technical costume' },
    { id: 'aoc-16', deck: 'agentic_org_chart', source: 'agentic_org_chart_16.jpg', alt: 'Slide: every org chart before 2025 had a human in every box' },
    { id: 'aoc-19', deck: 'agentic_org_chart', source: 'agentic_org_chart_19.jpg', alt: 'Slide: as the base automates, the pyramid becomes a diamond' },
    { id: 'aoc-25', deck: 'agentic_org_chart', source: 'agentic_org_chart_25.jpg', alt: 'Slide: never let a worker grade its own homework' },
    { id: 'aoc-37', deck: 'agentic_org_chart', source: 'agentic_org_chart_37.jpg', alt: 'Slide: she asks for judgment calls, not permission' },

    // Vibe Coding
    { id: 'vc-22', deck: 'vibe_coding', source: 'vibe_coding_22.jpg', alt: 'Slide: the whole method fits in six words, spot spec brief build verify govern' },
    { id: 'vc-23', deck: 'vibe_coding', source: 'vibe_coding_23.jpg', alt: 'Slide: code was never your bottleneck' },
    { id: 'vc-26', deck: 'vibe_coding', source: 'vibe_coding_26.jpg', alt: 'Slide: you are the architect, AI is a contractor at 100x speed' },
    { id: 'vc-27', deck: 'vibe_coding', source: 'vibe_coding_27.jpg', alt: 'Slide: the brief is the new codebase' },
    { id: 'vc-28', deck: 'vibe_coding', source: 'vibe_coding_28.jpg', alt: 'Slide: same model, same afternoon, different brief, three days against fourteen minutes' },
    { id: 'vc-32', deck: 'vibe_coding', source: 'vibe_coding_32.jpg', alt: 'Slide: so do humans, that is why audit exists' },
    { id: 'vc-42', deck: 'vibe_coding', source: 'vibe_coding_42.jpg', alt: 'Slide: the tool is cheap now, your brain is the moat' },

    // The Economics of AI
    { id: 'ae-04', deck: 'ai_economics', source: 'ai_economics_04.jpg', alt: 'Slide: the price per unit fell 98 percent, total spending rose 320 percent' },
    { id: 'ae-05', deck: 'ai_economics', source: 'ai_economics_05.jpg', alt: 'Slide: the spending buys growth that software never produced' },
    { id: 'ae-10', deck: 'ai_economics', source: 'ai_economics_10.jpg', alt: 'Slide: it behaves like an electricity bill and arrives looking like a rent bill' },
    { id: 'ae-11', deck: 'ai_economics', source: 'ai_economics_11.jpg', alt: 'Slide: an invoice with one number on it cannot be managed' },
    { id: 'ae-19', deck: 'ai_economics', source: 'ai_economics_19.jpg', alt: 'Slide: four changes, multiplied together' },
    { id: 'ae-23', deck: 'ai_economics', source: 'ai_economics_23.jpg', alt: 'Slide: match the price of the model to the cost of getting it wrong' },
    { id: 'ae-25', deck: 'ai_economics', source: 'ai_economics_25.jpg', alt: 'Slide: cheaper per unit of text, more expensive per finished task' },
  ],
};
