/**
 * Resolves the asset keys used in src/content/ to bundled image URLs.
 *
 * The content layer stays pure data so it can be imported under plain Node by
 * the generator script and the test suite. Vite asset imports live here
 * instead. Explicit imports rather than import.meta.glob, so unused assets are
 * not emitted into the build.
 */
import nine from '@/assets/nine_logo.png';
import captify from '@/assets/captify_logo.png';
import singtel from '@/assets/singtel_logo.png';
import bbc from '@/assets/bbc_logo.png';
import microsoft from '@/assets/microsoft_logo.png';

import mindmake from '@/assets/mindmake-wordmark.png';
import mindmakeMark from '@/assets/mindmake-mark.png';
// The two Content formats. Each runs dark at one end and mint at the other, so
// each loses half its letters on a dark card and both sit on a plate.
import formatMoney from '@/assets/format-the-money-of-ai.png';
import formatBuilding from '@/assets/format-building-with-ai.png';
// Every mark below is a gradient on transparency, so each carries a plate flag
// in portfolio.ts saying which mode it disappears in: plateOnLight for the ones
// drawn light, plateOnDark for the Mindmake wordmark, which runs the other way.
// All were supplied with padding baked into the canvas and are cropped to their
// content box, so a height class sizes the glyphs rather than the empty space.
import fractionl from '@/assets/fractionl-pulse-mark.png';
import ctrl from '@/assets/ctrl-wordmark.png';
import fullTime from '@/assets/full-time-mark.png';
import signalAndNoise from '@/assets/signal-and-noise-logo.png';


// podcast-tile and give-it-a-nudge came out on 12 Aug 2026. Both had been
// superseded by content-index captures under /media/appearances/, but the
// imports stayed, and an explicit import is a build instruction: 2.5MB of
// unreachable WebP was being emitted into dist/ on every deploy.
import mastersThesis from '@/assets/masters-thesis-optimized.webp';

import lessonPermanentIdentity from '@/assets/lesson-permanent-identity.png';
import lessonAutonomousBusiness from '@/assets/lesson-autonomous-business-new.png';
import lessonVibeCodingUnfair from '@/assets/lesson-vibe-coding-unfair.png';
import lessonAgenticOrgChart from '@/assets/lesson-agentic-org-chart.png';
import lessonAiChiefOfStaff from '@/assets/lesson-ai-chief-of-staff.png';

import krishHeadshot from '@/assets/krish-headshot.jpg';
import krishBitmoji from '@/assets/krish_bitmoji.jpg';

const assets: Record<string, string> = {
  nine,
  captify,
  singtel,
  bbc,
  microsoft,

  mindmake,
  'mindmake-mark': mindmakeMark,
  'format-the-money-of-ai': formatMoney,
  'format-building-with-ai': formatBuilding,
  fractionl,
  ctrl,
  'full-time': fullTime,
  'signal-and-noise': signalAndNoise,

  'masters-thesis': mastersThesis,

  'lesson-permanent-identity': lessonPermanentIdentity,
  'lesson-autonomous-business': lessonAutonomousBusiness,
  'lesson-vibe-coding-unfair': lessonVibeCodingUnfair,
  'lesson-agentic-org-chart': lessonAgenticOrgChart,
  'lesson-ai-chief-of-staff': lessonAiChiefOfStaff,

  'krish-headshot': krishHeadshot,
  'krish-bitmoji': krishBitmoji,
};

/** Look up a content asset key. Returns undefined for an unknown key. */
export const asset = (key: string | undefined): string | undefined =>
  key ? assets[key] : undefined;
