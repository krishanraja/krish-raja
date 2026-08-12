/**
 * Turns the masters in public/files/ into something shippable in public/media/.
 *
 *   npm run media          build anything missing or out of date
 *   npm run media -- --check   report what is missing, exit 1
 *   npm run media -- --force   rebuild everything
 *
 * Deliberately not wired into `npm run build`. It takes minutes, the inputs
 * change rarely, and the outputs are committed.
 *
 * What it does and why:
 *
 * - Video. The four OS recordings are portrait phone captures encoded at 8 to
 *   16 Mbps, 84MB in total. Nobody should download that to see a 6-second loop
 *   on a phone. They come out at 720x1280, CRF 30, no audio (playback is muted
 *   anyway), faststart so the first frame arrives before the file does, plus a
 *   poster still for the reduced-motion path.
 *
 * - Slides. 3600x2025 masters at roughly 420KB each. Two WebP widths: 640 for
 *   the deck card, 1600 for the full-screen reader.
 *
 * - Appearances. Content-index captures down to 800px WebP. Only records the
 *   manifest marks `approved` are ever emitted; reject and unavailable records
 *   are skipped loudly.
 *
 * The work list comes from the content layer, so an entry that is not on the
 * site does not get built, and an entry on the site with no derivative fails
 * `--check`.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

import { os } from '../src/content/os.js';
import { deck } from '../src/content/deck.js';
import { appearances } from '../src/content/appearances.js';
import { lessons } from '../src/content/lessons.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const check = argv.includes('--check');
const force = argv.includes('--force');

const FILES = resolve(root, 'public/files');
const MEDIA = resolve(root, 'public/media');

const missing: string[] = [];
const built: string[] = [];

/** Rebuild when the output is absent or older than its source. */
const stale = (src: string, out: string) => {
  if (force) return true;
  if (!existsSync(out)) return true;
  return statSync(src).mtimeMs > statSync(out).mtimeMs;
};

const need = (src: string, out: string, label: string) => {
  if (!existsSync(src)) throw new Error(`missing source: ${src}`);
  if (!stale(src, out)) return false;
  if (check) {
    missing.push(label);
    return false;
  }
  mkdirSync(dirname(out), { recursive: true });
  return true;
};

/* ------------------------------------------------------------------ video */

const ffmpeg = (args: string[]) => {
  if (!ffmpegPath) throw new Error('ffmpeg-static did not resolve a binary');
  execFileSync(ffmpegPath, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
};

for (const entry of os.entries) {
  const src = resolve(FILES, 'os screenshots', entry.source);
  const mp4 = resolve(MEDIA, `os/${entry.id}.mp4`);
  const poster = resolve(MEDIA, `os/${entry.id}.jpg`);

  if (need(src, mp4, `os/${entry.id}.mp4`)) {
    ffmpeg([
      '-i', src,
      // Portrait capture. Cap the long edge at 1280 and keep even dimensions.
      '-vf', "scale='min(720,iw)':-2:flags=lanczos",
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-preset', 'slow',
      '-crf', '30',
      '-pix_fmt', 'yuv420p',
      // Muted playback, so the audio track is dead weight.
      '-an',
      '-movflags', '+faststart',
      mp4,
    ]);
    built.push(`os/${entry.id}.mp4`);
  }

  if (need(src, poster, `os/${entry.id}.jpg`)) {
    ffmpeg(['-i', src, '-ss', '00:00:01', '-frames:v', '1', '-vf', "scale='min(720,iw)':-2", '-q:v', '5', poster]);
    built.push(`os/${entry.id}.jpg`);
  }
}

/* --------------------------------------------------- os poster fingerprints */

/**
 * A 16x16 grayscale average hash of each poster, written to
 * public/media/os/fingerprints.json.
 *
 * This exists because of a real failure on 12 August 2026. A master arrived
 * named `new os content vid.mp4`, was renamed to `os-content-final.mp4` on the
 * strength of that name, and transcoded. It was a recording of the Org screen,
 * so the site shipped the same agent roster under both "Content" and "The org",
 * and every automated check passed: ffprobe parsed it, the file shrank, the
 * page rendered, the tests were green.
 *
 * Nothing in code can know whether a video is about content. What code can know
 * is that two entries claiming to be different recordings look identical, which
 * is what the test suite asserts against these hashes. It is the cheap half of
 * the problem, and it is the half that actually shipped.
 */
export const posterFingerprint = async (file: string): Promise<string> => {
  const { data } = await sharp(file)
    .greyscale()
    .resize(16, 16, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  let bits = '';
  for (const px of data) bits += px > mean ? '1' : '0';
  return bits;
};

if (!check) {
  const fingerprints: Record<string, string> = {};
  for (const entry of os.entries) {
    fingerprints[entry.id] = await posterFingerprint(resolve(MEDIA, `os/${entry.id}.jpg`));
  }
  writeFileSync(
    resolve(MEDIA, 'os/fingerprints.json'),
    `${JSON.stringify(fingerprints, null, 2)}\n`,
    'utf8',
  );
}

/* ----------------------------------------------------------------- slides */

for (const slide of deck.slides) {
  const src = resolve(FILES, 'slides', slide.source);
  for (const width of [640, 1600]) {
    const out = resolve(MEDIA, `deck/${slide.id}-${width}.webp`);
    if (need(src, out, `deck/${slide.id}-${width}.webp`)) {
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width > 1000 ? 80 : 74, effort: 6 })
        .toFile(out);
      built.push(`deck/${slide.id}-${width}.webp`);
    }
  }
}

/* -------------------------------------------------- attendee brand logos */

/**
 * Twenty-eight employer marks for the Lightning Lessons strip, sized by area
 * rather than by height and composited onto one canvas.
 *
 * Masters come from Brandfetch, by domain, and live in public/files/brand
 * logos/. They arrive with wildly different amounts of padding baked in, so
 * they are trimmed to their ink first; untrimmed, the padding is what the
 * height would be sizing.
 *
 * Then the part that matters.
 *
 * A row of logos set to a common height is not a row of logos at a common
 * size. FedEx is a 4:1 wordmark and the BMW roundel is 1:1, so at a shared
 * 28px height the roundel carries a seventh of the ink and reads as an
 * afterthought next to its neighbours. Scaling each mark to a constant *area*
 * inside a fixed box is what makes a mixed set of wordmarks and roundels look
 * like one row, and it is the reason this is done here rather than in CSS: the
 * component cannot know an aspect ratio, and the content layer must not.
 */
const BRAND_BOX = { width: 200, height: 72 };
const BRAND_INK = 0.5; // fraction of the box each mark should occupy

for (const brand of lessons.attendees) {
  const src = resolve(FILES, 'brand logos', `${brand.slug}.png`);
  const out = resolve(MEDIA, `brands/${brand.slug}.webp`);
  if (!need(src, out, `brands/${brand.slug}.webp`)) continue;

  const trimmed = await sharp(src).trim({ threshold: 8 }).toBuffer();
  const { width = 1, height = 1 } = await sharp(trimmed).metadata();

  const targetArea = BRAND_BOX.width * BRAND_BOX.height * BRAND_INK;
  let h = Math.round(Math.sqrt((targetArea * height) / width));
  let w = Math.round((h * width) / height);
  // Never let a wide wordmark run out of the box.
  const fit = Math.min(BRAND_BOX.width / w, BRAND_BOX.height / h, 1);
  w = Math.max(1, Math.round(w * fit));
  h = Math.max(1, Math.round(h * fit));

  const mark = await sharp(trimmed).resize({ width: w, height: h, fit: 'fill' }).toBuffer();
  await sharp({
    create: {
      width: BRAND_BOX.width,
      height: BRAND_BOX.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: mark, gravity: 'centre' }])
    .webp({ quality: 88, effort: 6 })
    .toFile(out);
  built.push(`brands/${brand.slug}.webp`);
}

/* ------------------------------------------------------------ appearances */

/**
 * The manifest is the authority on which captures may be published. Parsed
 * here rather than duplicated, so a status change in the manifest changes what
 * this script will emit.
 */
const manifestPath = resolve(FILES, 'content index/krish-raja-content-index.md');
const manifest = readFileSync(manifestPath, 'utf8');

export const manifestRecords = (): Map<string, { status: string; filename: string | null; urls: string[] }> => {
  const records = new Map<string, { status: string; filename: string | null; urls: string[] }>();
  for (const block of manifest.split('```yaml').slice(1)) {
    const body = block.split('```')[0];
    const id = /appearance_id:\s*(\S+)/.exec(body)?.[1];
    if (!id) continue;
    const status = /screenshot_status:\s*(\S+)/.exec(body)?.[1] ?? 'unknown';
    const rawName = /screenshot_filename:\s*(\S+)/.exec(body)?.[1] ?? 'null';
    const urls = [...body.matchAll(/^\s*-\s+(https?:\/\/\S+)$/gm)].map((m) => m[1]);
    records.set(id, { status, filename: rawName === 'null' ? null : rawName, urls });
  }
  return records;
};

const records = manifestRecords();

for (const item of appearances.items) {
  if (!item.appearanceId || !item.media) continue;
  const record = records.get(item.appearanceId);
  if (!record) throw new Error(`no manifest record for ${item.appearanceId}`);
  if (record.status !== 'approved') {
    throw new Error(
      `${item.appearanceId} is marked "${record.status}" in the content index and must not be published`,
    );
  }
  if (!record.filename) throw new Error(`${item.appearanceId} is approved but has no filename`);

  const src = resolve(FILES, 'content index', record.filename);
  const out = resolve(root, 'public', item.media.replace(/^\//, ''));
  if (need(src, out, item.media)) {
    await sharp(src).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(out);
    built.push(item.media);
  }
}

/* ------------------------------------------------------------------ done  */

if (check) {
  if (missing.length) {
    console.error(`${missing.length} derivative(s) missing or stale:`);
    for (const m of missing) console.error(`  ${m}`);
    console.error('Run `npm run media`.');
    process.exit(1);
  }
  console.log('media: every derivative is present and current');
} else {
  writeFileSync(
    resolve(MEDIA, 'README.md'),
    [
      '# Generated media',
      '',
      'Everything here is produced by `npm run media` from the masters in',
      '`public/files/`. Do not edit these by hand; the next run overwrites them.',
      '',
      'The work list comes from `src/content/os.ts`, `src/content/deck.ts` and',
      '`src/content/appearances.ts`, so adding an entry there and rerunning is',
      'the whole process for adding a recording, a slide or an appearance.',
      '',
      'Appearance captures are only emitted for records the content index marks',
      '`approved`. The script throws on anything else.',
      '',
    ].join('\n'),
    'utf8',
  );
  console.log(built.length ? `media: built ${built.length} file(s)` : 'media: nothing to do');
}
