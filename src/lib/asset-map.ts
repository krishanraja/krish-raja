/**
 * Resolves the asset keys used in src/content/ to bundled image URLs.
 *
 * The content layer stays pure data so it can be imported under plain Node by
 * the generator script and the test suite. Vite asset imports live here
 * instead. Explicit imports rather than import.meta.glob, so unused assets are
 * not emitted into the build.
 */
import nine from '@/assets/nine_logo.png';
import mccann from '@/assets/mccann_logo.png';
import captify from '@/assets/captify_logo.png';
import singtel from '@/assets/singtel_logo.png';
import bbc from '@/assets/bbc_logo.png';
import microsoft from '@/assets/microsoft_logo.png';

import mindmaker from '@/assets/mindmaker-icon.png';
import fractionl from '@/assets/fractionl-icon.png';
import ctrl from '@/assets/ctrl-icon.png';
import signalAndNoise from '@/assets/signal-and-noise-logo.png';
import mindmakerLive from '@/assets/mindmaker-live-logo.png';


import mastersThesis from '@/assets/masters-thesis-optimized.webp';
import podcastTile from '@/assets/podcast-tile-optimized.webp';
import giveItANudge from '@/assets/give-it-a-nudge-optimized.webp';

import lessonPermanentIdentity from '@/assets/lesson-permanent-identity.png';
import lessonAutonomousBusiness from '@/assets/lesson-autonomous-business-new.png';
import lessonVibeCodingUnfair from '@/assets/lesson-vibe-coding-unfair.png';
import lessonAgenticOrgChart from '@/assets/lesson-agentic-org-chart.png';
import lessonAiChiefOfStaff from '@/assets/lesson-ai-chief-of-staff.png';

import krishHeadshot from '@/assets/krish-headshot.jpg';
import krishBitmoji from '@/assets/krish_bitmoji.jpg';

const assets: Record<string, string> = {
  nine,
  mccann,
  captify,
  singtel,
  bbc,
  microsoft,

  mindmaker,
  fractionl,
  ctrl,
  'signal-and-noise': signalAndNoise,
  'mindmaker-live': mindmakerLive,

  'masters-thesis': mastersThesis,
  'podcast-tile': podcastTile,
  'give-it-a-nudge': giveItANudge,

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
