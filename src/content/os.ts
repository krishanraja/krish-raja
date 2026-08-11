import type { OsContent } from './types';

/**
 * The operating system, running.
 *
 * To add a screen: drop the file into src/assets/os/, register it in
 * src/lib/asset-map.ts, and add an entry below. No component edits.
 *
 * Stills and short mp4 or webm loops both work. Everything lazy loads, and
 * video respects prefers-reduced-motion by showing its poster frame instead of
 * autoplaying. An entry with no `asset` renders a labelled placeholder tile, so
 * the section is honest about what is missing rather than faking it.
 *
 * TODO(krish): supply screenshots for the six entries below. Nothing here is
 * generated or mocked up, and nothing should be. If a different six would show
 * the fleet better, replace the titles and notes with yours.
 */
export const os: OsContent = {
  id: 'operating-system',
  eyebrow: 'The OS',
  title: 'The operating system, running',
  sub: 'Screens from the fleet that runs the business. 14 agents, 45 workflows, in production.',

  entries: [
    {
      id: 'control-center',
      title: 'Control Center',
      note: 'Every agent, its current task and what it is waiting on.',
      kind: 'image',
      alt: 'The Mindmaker OS control centre showing agent status',
      // TODO(krish): supply screenshot
    },
    {
      id: 'agent-fleet',
      title: 'The fleet',
      note: 'Fourteen agents with named roles, and who hands off to whom.',
      kind: 'image',
      alt: 'The agent fleet view showing named agent roles',
      // TODO(krish): supply screenshot
    },
    {
      id: 'workflows',
      title: 'Workflows',
      note: 'Forty-five workflows, and the runs behind them.',
      kind: 'image',
      alt: 'The workflow list showing recent runs',
      // TODO(krish): supply screenshot
    },
    {
      id: 'decisions-waiting',
      title: 'Decisions waiting',
      note: 'What the fleet will not decide without me.',
      kind: 'image',
      alt: 'The decisions waiting queue',
      // TODO(krish): supply screenshot
    },
    {
      id: 'revenue-engine',
      title: 'The revenue engine',
      note: 'Sequences running against named accounts.',
      kind: 'image',
      alt: 'The revenue engine showing named-account sequences',
      // TODO(krish): supply screenshot
    },
    {
      id: 'content-engine',
      title: 'The content engine',
      note: 'An episode going from transcript to published without me.',
      kind: 'video',
      alt: 'A short clip of the content engine publishing an episode',
      // TODO(krish): supply screen recording, plus a poster still
    },
  ],
};
