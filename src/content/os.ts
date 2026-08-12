import type { OsContent } from './types';

/**
 * The operating system, running.
 *
 * Four screen recordings of Mindmaker OS, all portrait phone captures, so the
 * player frames them as a device rather than a 16:9 tile.
 *
 * `source` names the master under public/files/os screenshots/.
 * `npm run media` transcodes each one to /media/os/<id>.mp4 with a poster at
 * /media/os/<id>.jpg. The masters run 8 to 16 Mbps and are not shipped.
 *
 * To add a recording: drop the file in public/files/os screenshots/, add an
 * entry here, run `npm run media`. No component edits.
 *
 * TODO(krish): the org recording shows "12 agents, 200 runs in last batch" on
 * screen, while every surface of this site says 14 agents. A visitor who
 * watches the clip sees the contradiction. Either recapture it, or tell me
 * which number is right and the copy follows. See FACTS.md.
 */
export const os: OsContent = {
  id: 'operating-system',
  eyebrow: 'The OS',
  title: 'The OS in action.',
  sub: 'I point my mobile OS at the things I need or like doing while on the go. The desktop dash is a full living, breathing deep-work control center.',

  entries: [
    {
      id: 'content',
      title: 'Content',
      note: 'I know why I don\'t publish as often as I should and so does my Content OS. It is designed to push me through my bottlenecks and make it easy to iterate, even on the fly.',
      source: 'os-content-final-lite.mp4',
      alt: 'Screen recording of the Mindmaker OS content editor, swiping through queued content ideas',
    },
    {
      id: 'network',
      title: 'Network',
      note: 'I can talk to my Network OS, which knows everyone I\'ve ever connected with on any platform - and helps me remember them in the right moment.',
      source: 'os-network-final.mp4',
      alt: 'Screen recording of Mindmaker OS surfacing warm introduction paths from a personal network',
    },
    {
      id: 'product',
      title: 'Product marketing',
      note: 'I can\'t keep on top of earned marketing, so my Growth OS does. It figures out what the internet says in relation to the products I offer, and creates a GEO plan for me.',
      source: 'os-product-final.mp4',
      alt: 'Screen recording of the Mindmaker OS product marketing view showing customer touchpoints',
    },
    {
      id: 'org',
      title: 'The org',
      note: 'The agents hand over, clock off and self-organize job descriptions regularly, based on what\'s actually required. A look in to the future of work.',
      source: 'os-org-final.mp4',
      alt: 'Screen recording of the Mindmaker OS agent inventory showing the fleet at work',
    },
  ],
};
