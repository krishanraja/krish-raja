import type { AppearancesContent } from './types';

/**
 * Selected work: where the record is third-party rather than self-published.
 *
 * Every entry with an `appearanceId` comes from the content index at
 * public/files/content index/krish-raja-content-index.md, which carries the
 * capture, the verification status and the source URLs. Two rules from that
 * manifest are enforced by the test suite rather than trusted to care:
 *
 * 1. Only records marked `approved` may be shown. `krish-raja-linkedin` is
 *    marked reject (the capture is an auth wall) and `techonomic-author-page`
 *    is marked unavailable. Neither appears here or anywhere else.
 * 2. Every `href` must be one of that record's own `source_urls`, so a link
 *    cannot drift away from the evidence that backs it.
 *
 * Owned surfaces in the manifest (Signal & Noise, Content, Mindmake,
 * Meliora, AdFixus, the Maven profile, both Substacks, YouTube) are left out
 * on purpose: the portfolio section already carries them, and this section is
 * for places that invited him rather than places he runs.
 */
export const appearances: AppearancesContent = {
  id: 'selected-work',
  title: 'In public.',
  sub: 'Podcasts, stages and bylines, 2017 to now.',

  filters: [
    { id: 'all', label: 'All' },
    { id: 'podcast', label: 'Podcasts' },
    { id: 'talk', label: 'Talks' },
    { id: 'press', label: 'Press' },
  ],
  moreLabel: 'See the rest of my content',
  previewCount: 6,
  lessLabel: 'Show fewer',

  items: [
    {
      appearanceId: 'adobe-symposium-opera-house-keynote',
      title: 'Why programmatic will not be a word within a few years',
      outlet: 'Adobe Symposium, Sydney Opera House',
      kind: 'talk',
      year: '2017',
      href: 'https://www.marketingmag.com.au/tech-data/nine-head-of-data-and-programmatic-why-programmatic-wont-be-a-word-within-a-few-years/',
      media: '/media/appearances/adobe-symposium-opera-house-keynote.webp',
      // No face in this one, so the masthead and the headline.
      crop: { top: 50, bottom: 140, left: 170, right: 168 },
    },
    {
      appearanceId: 'bt-30-under-30-strategy',
      title: '30 Under 30, Strategy winner',
      outlet: 'B&T',
      kind: 'press',
      year: '2017',
      href: 'https://www.bandt.com.au/winners-revealed-bts-30-30-awards/',
      media: '/media/appearances/bt-30-under-30-strategy.webp',
      // No face in this one, so the masthead and the award headline.
      crop: { top: 315, left: 30, right: 530 },
    },
    {
      appearanceId: 'ai-edge-podcast-episode-1',
      title: 'Where AI meets pop culture, episode 1',
      outlet: 'The AI Edge Podcast',
      kind: 'podcast',
      year: '2025',
      href: 'https://www.youtube.com/watch?v=Jvu7DSN9SnU',
      media: '/media/appearances/ai-edge-podcast-episode-1.webp',
      // All three on the call, Krish on the right.
      crop: { top: 20, bottom: 19 },
    },
    {
      appearanceId: 'cannes-lions-2026-day-4',
      title: 'Cannes Lions 2026, day four',
      outlet: 'Signal & Noise',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.youtube.com/watch?v=6ebe_DRwjsc',
      media: '/media/appearances/cannes-lions-2026-day-4.webp',
      // Already a still rather than a page capture, so this only centers it.
      crop: { left: 110 },
    },
    {
      appearanceId: 'possible-2026-day-1',
      title: 'AI, adtech and CTV, day one',
      outlet: 'POSSIBLE 2026',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.youtube.com/watch?v=6yCi20GFUN4',
      media: '/media/appearances/possible-2026-day-1.webp',
      // The player, him on the left.
      crop: { top: 67, bottom: 160, left: 16, right: 390 },
    },
    {
      appearanceId: 'iab-connected-tv-handbook',
      title: 'Connected Television Handbook, contributor',
      outlet: 'IAB Australia',
      kind: 'press',
      year: '2020',
      href: 'https://iabaustralia.com.au/wp-content/uploads/2017/07/Connected-TV-Handbook-2020-2.pdf',
      media: '/media/appearances/iab-connected-tv-handbook.webp',
      // The council grid, his headshot in the top row.
      crop: { top: 60, bottom: 143, left: 300, right: 60 },
    },
    {
      appearanceId: 'nine-data-transaction-byline',
      title: 'Opening the gateways to data transaction',
      outlet: 'Nine',
      kind: 'press',
      year: '2017',
      href: 'https://www.nineforbrands.com.au/opinion-opening-the-gateways-to-data-transaction/',
      media: '/media/appearances/nine-data-transaction-byline.webp',
      // The portrait under the byline.
      crop: { top: 360, left: 126, right: 514 },
    },
    {
      appearanceId: 'give-it-a-nudge-captify',
      title: 'Scaling Captify Australia from zero',
      outlet: 'Give It A Nudge',
      kind: 'talk',
      year: '2022',
      href: 'https://www.youtube.com/watch?v=6_bf9L1OX3s',
      media: '/media/appearances/give-it-a-nudge-captify.webp',
      // The player, him on stage.
      crop: { top: 67, bottom: 175, left: 16, right: 414 },
    },
    {
      appearanceId: 'ai-leadership-dothinkdo-webinar',
      title: 'Is AI strengthening your leadership, or quietly undermining it?',
      outlet: 'dothinkdo',
      kind: 'talk',
      year: '2026',
      href: 'https://dothinkdo.com/webinars/is-ai-strengthening-your-leadership-or-quietly-undermining-it',
      media: '/media/appearances/ai-leadership-dothinkdo-webinar.webp',
      // His face, in the clip embedded on the page.
      crop: { top: 435, left: 669, right: 104 },
    },
    {
      appearanceId: 'dan-pratl-expertise-as-an-asset',
      title: 'Expertise as an asset',
      outlet: 'Dan Pratl',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.youtube.com/watch?v=dcD-G00RDcE',
      media: '/media/appearances/dan-pratl-expertise-as-an-asset.webp',
      // The player, both faces.
      crop: { top: 67, bottom: 160, left: 16, right: 390 },
    },
    {
      appearanceId: 'cannes-lions-2026-day-3',
      title: 'Cannes Lions 2026, day three',
      outlet: 'Signal & Noise',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.youtube.com/watch?v=SrqZdwyV2PA',
      media: '/media/appearances/cannes-lions-2026-day-3.webp',
      // The player, without the page around it or the sidebar beside it.
      crop: { top: 67, bottom: 160, left: 16, right: 390 },
    },
    {
      appearanceId: 'alanna-laforet-hacker-mentality',
      title: 'Developing a hacker mentality with Alanna Laforet',
      outlet: 'Signal & Noise',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.signalandnoise.ai/post/alanna-laforet-developing-a-hacker-mentality-to-take-control-of-your-career-journey',
      media: '/media/appearances/alanna-laforet-hacker-mentality.webp',
      // The bottom half, which is where the two headshots are.
      crop: { top: 460, left: 20, right: 20 },
    },
    {
      appearanceId: 'cannes-live-justin-kramm',
      title: 'Cannes Live with Justin Kramm',
      outlet: 'Signal & Noise',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.youtube.com/watch?v=lmXf5iiTOVk',
      media: '/media/appearances/cannes-live-justin-kramm.webp',
      // His face, filling the frame.
      crop: { top: 167, bottom: 251, right: 743 },
    },
    {
      appearanceId: 'justin-kramm-authentic-voice',
      title: 'Finding your tribe by finding your authentic voice',
      outlet: 'Justin Kramm',
      kind: 'podcast',
      year: '2026',
      href: 'https://www.youtube.com/watch?v=XXPm0gQOy4k',
      media: '/media/appearances/justin-kramm-authentic-voice.webp',
      // His face, filling the frame.
      crop: { top: 143, bottom: 237, right: 675 },
    },
    {
      appearanceId: 'balancing-the-grind-interview',
      title: 'Balancing the Grind',
      outlet: 'Balance the Grind',
      kind: 'press',
      year: '2021',
      href: 'https://balancethegrind.co/interviews/krish-raja-general-manager-at-captify-australia/',
      media: '/media/appearances/balancing-the-grind-interview.webp',
      // The portrait, without the article column beside it.
      crop: { top: 170, bottom: 280, left: 30, right: 770 },
    },
    {
      appearanceId: 'liveramp-online-identity-panel',
      title: 'Online identity in a world of cookieless browsers',
      outlet: 'LiveRamp',
      kind: 'talk',
      year: '2020',
      href: 'https://liveramp.com.au/blog/online-identity-in-a-world-of-cookieless-browsers/',
      media: '/media/appearances/liveramp-online-identity-panel.webp',
      // No face in this one, so the headline.
      crop: { top: 130, bottom: 185, left: 80, right: 480 },
    },
    {
      appearanceId: 'adobe-digital-data-overload',
      title: 'Digital data overload? AI to the rescue',
      outlet: 'Adobe',
      kind: 'press',
      year: '2017',
      href: 'https://blog.adobe.com/en/publish/2017/05/20/digital-data-overload-ai-to-the-rescue',
      media: '/media/appearances/adobe-digital-data-overload.webp',
      // No face in this one, so the data illustration instead.
      crop: { top: 200, left: 170, right: 186 },
    },
    {
      appearanceId: 'mumbrella360-travel-marketing-panel',
      title: 'Travel marketing panel',
      outlet: 'Mumbrella360',
      kind: 'talk',
      year: '2017',
      href: 'https://mumbrella.com.au/wp-content/uploads/2017/11/Travel_program_PRINT_LR-1.pdf',
      media: '/media/appearances/mumbrella360-travel-marketing-panel.webp',
      // Nothing legible at thumbnail size, so the conference brand block.
      crop: { top: 315, left: 300, right: 260 },
    },
    {
      appearanceId: 'captify-hire-announcement',
      title: 'Captify hires Krish Raja as Australian GM',
      outlet: 'Captify',
      kind: 'press',
      href: 'https://www.captifytechnologies.com/latest/news/captify-hires-video-and-programmatic-executive-krish-raja-as-au-general-manager-to-make-dynamic-and-live-search-data-available-to-australian-programmatic-buyers/',
      media: '/media/appearances/captify-hire-announcement.webp',
      // The portrait and the line naming him.
      crop: { top: 135, bottom: 315, left: 395, right: 405 },
    },
    {
      // No content-index record: it is a book, not a web page, so there is
      // nothing to link and no screenshot to approve.
      title: 'Predicting the Future of Haptic Design',
      outlet: "Master's thesis",
      kind: 'research',
      year: '2011',
      asset: 'masters-thesis',
      note: 'Interviews with UX leaders at IDEO, Microsoft and Google. Most of what it predicted has played out. Published as a book, so there is nothing to link.',
    },
  ],
};
