import type { SectionLink } from './types';
import { operate } from './operate';
import { deck } from './deck';
import { receipts } from './receipts';
import { appearances } from './appearances';
import { lessons } from './lessons';
import { contact } from './contact';
import { home } from './home';

/**
 * Short shareable addresses, one per section, in page order.
 *
 * krishraja.com/thinking opens the homepage scrolled to the slides, and a pasted
 * link previews with that section's own title and sub rather than the homepage
 * card. Each gets a real HTML file at build time (scripts/section-pages.ts), so
 * a crawler that never runs JavaScript still reads the right preview.
 *
 * Paths rather than subdomains: a subdomain is a separate host per section,
 * with its own DNS record and Vercel domain, and lands on the same anchor.
 *
 * The old `#the-thinking` style anchors keep working alongside these.
 */
export const sectionLinks: readonly SectionLink[] = [
  { path: 'operate', section: operate },
  { path: 'build', section: home.practice },
  { path: 'thinking', section: deck },
  { path: 'live', section: home.channel },
  { path: 'work', section: appearances },
  { path: 'lessons', section: lessons },
  { path: 'receipts', section: receipts },
  { path: 'contact', section: contact },
];
