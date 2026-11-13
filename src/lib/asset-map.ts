/**
 * Resolves the asset keys used in src/content/ to bundled image URLs.
 *
 * The content layer stays pure data so it can be imported under plain Node by
 * the generator script and the test suite. Vite asset imports live here
 * instead. Explicit imports rather than import.meta.glob, so unused assets are
 * not emitted into the build.
 */
import nine from '@/assets/nine_logo.png';
import singtel from '@/assets/singtel_logo.png';
import bbc from '@/assets/bbc_logo.png';
import microsoft from '@/assets/microsoft_logo.png';
import krishHeadshot from '@/assets/krish-headshot.jpg';

const assets: Record<string, string> = {
  nine,
  singtel,
  bbc,
  microsoft,

  'krish-headshot': krishHeadshot,
};

/** Look up a content asset key. Returns undefined for an unknown key. */
export const asset = (key: string | undefined): string | undefined =>
  key ? assets[key] : undefined;
