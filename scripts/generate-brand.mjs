/**
 * Renders every identity image from one master: the bitmoji.
 *
 *   public/favicon.ico            16, 32 and 48 in one file, for every browser tab
 *   public/favicon-16x16.png      ...and as single PNGs
 *   public/favicon-32x32.png
 *   public/favicon.png            512, for anything still asking for the old name
 *   public/icon-192.png           Android home screen and the manifest
 *   public/icon-512.png
 *   public/icon-maskable-512.png  full bleed, face inside the 80% safe zone
 *   public/apple-touch-icon.png   180, opaque, iOS rounds the corners itself
 *   public/og-image.png           1200x630, the card LinkedIn, Slack, WhatsApp
 *                                 and X show when the site is shared
 *
 * Run by hand after changing the bitmoji or the card: `npm run brand`. Then
 * bump the ?v= on site.ogImage so the social networks refetch it.
 *
 * The card is HTML rendered by the same Chromium the phone check uses, in the
 * site's own typeface, so it looks like the site rather than like a template.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => resolve(root, 'public', p);
const MASTER = resolve(root, 'src/assets/krish_bitmoji.jpg');
const MINT = '#7ff0c6';
const INK = '#0a0a0a';

/* ---------------------------------------------------------- the cutout */

// The master is a bitmoji on white. Flood-fill the white from the edges so the
// background goes and the white of the eyes stays.
const cutout = async () => {
  const { data, info } = await sharp(MASTER).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const seen = new Uint8Array(w * h);
  const white = (i) => data[i * 4] > 232 && data[i * 4 + 1] > 232 && data[i * 4 + 2] > 232;
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop();
    if (seen[i] || !white(i)) continue;
    seen[i] = 1;
    data[i * 4 + 3] = 0;
    const x = i % w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (i >= w) stack.push(i - w);
    if (i < w * (h - 1)) stack.push(i + w);
  }
  // Soften the one-pixel fringe the threshold leaves against the background.
  const alpha = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extractChannel(3).blur(0.8).raw().toBuffer();
  for (let i = 0; i < w * h; i++) data[i * 4 + 3] = Math.min(data[i * 4 + 3], alpha[i]);
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
};

/* ------------------------------------------------------------ the icons */

// A mint disc with the bitmoji rising out of the bottom of it: the face fills
// the disc, so it still reads as a face at 16 pixels.
const icon = async (figure, size, { bleed = false, scale = 1.18, lift = 0.02 } = {}) => {
  const fig = Math.round(size * scale);
  const person = await sharp(figure).resize(fig, fig).png().toBuffer();
  const top = Math.round(size * (1 - scale) + size * lift + size * 0.12);
  const left = Math.round((size - fig) / 2);
  const shape = bleed
    ? `<svg width="${size}" height="${size}"><rect width="100%" height="100%" fill="${MINT}"/></svg>`
    : `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${MINT}"/></svg>`;
  const mask = bleed
    ? shape
    : `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`;
  // Lay the figure on a transparent canvas the size of the icon, then clip it.
  // The figure is bigger than the icon, so lay it on a padded canvas and cut the icon out of that.
  const pad = fig + size;
  const layer = await sharp({ create: { width: pad + size, height: pad + size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: person, top: pad + top, left: pad + left }])
    .png().toBuffer()
    // sharp runs extract before composite inside one pipeline, so cut in a second pass.
    .then((b) => sharp(b).extract({ left: pad, top: pad, width: size, height: size }).png().toBuffer());
  const clipped = await sharp(layer).composite([{ input: Buffer.from(mask), blend: 'dest-in' }]).png().toBuffer();
  return sharp(Buffer.from(shape)).composite([{ input: clipped }]).png().toBuffer();
};

// An ICO is a small header and a directory pointing at PNGs; every browser
// since Vista reads PNG entries.
const ico = (pngs) => {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(({ size, buf }, n) => {
    const e = 6 + n * 16;
    head.writeUInt8(size >= 256 ? 0 : size, e);
    head.writeUInt8(size >= 256 ? 0 : size, e + 1);
    head.writeUInt8(0, e + 2);
    head.writeUInt8(0, e + 3);
    head.writeUInt16LE(1, e + 4);
    head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(buf.length, e + 8);
    head.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p.buf)]);
};

/* ------------------------------------------------------------- the card */

const card = async (figurePng) => {
  // Inlined: a page set from a string has no origin, so it may not load file:// fonts.
  const font = (w) =>
    `data:font/woff2;base64,${readFileSync(resolve(root, `node_modules/@fontsource/onest/files/onest-latin-${w}-normal.woff2`)).toString('base64')}`;
  const figure = `data:image/png;base64,${figurePng.toString('base64')}`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: Onest; font-weight: 500; src: url(${font(500)}); }
    @font-face { font-family: Onest; font-weight: 600; src: url(${font(600)}); }
    @font-face { font-family: Onest; font-weight: 700; src: url(${font(700)}); }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; font-family: Onest; background: ${INK}; color: #fff; overflow: hidden; position: relative; }
    .dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.11) 1.2px, transparent 1.6px); background-size: 26px 26px; }
    .glow { position: absolute; width: 900px; height: 900px; left: -260px; top: -120px; background: radial-gradient(closest-side, rgba(127,240,198,.22), transparent); }
    /* Built for the thumbnail, not the full size: LinkedIn shows this about 550px wide and
       compresses it, so anything under ~40px here turns to mush. Three lines, all big. */
    .disc { position: absolute; left: 56px; top: 135px; width: 360px; height: 360px; border-radius: 50%; background: ${MINT}; overflow: hidden; }
    .disc img { position: absolute; width: 386px; left: -13px; top: 22px; }
    .copy { position: absolute; left: 470px; right: 40px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; gap: 26px; }
    h1 { font-size: 118px; font-weight: 700; letter-spacing: -.04em; line-height: .9; white-space: nowrap; }
    .spine { font-size: 50px; font-weight: 600; line-height: 1.1; letter-spacing: -.02em; color: #fff; }
    .role { font-size: 42px; font-weight: 600; letter-spacing: -.015em; color: ${MINT}; }
  </style></head><body>
    <div class="glow"></div>
    <div class="disc"><img src="${figure}" alt=""></div>
    <div class="copy">
      <h1>Krish Raja</h1>
      <div class="spine">AI-Native Commercial<br>Strategy Leader</div>
      <div class="role">Keynote speaker</div>
    </div>
  </body></html>`;
  // Same browser the phone check drives; set CHROMIUM_PATH to use another.
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  await browser.close();
  return sharp(png).png({ compressionLevel: 9, palette: false }).toBuffer();
};

/* ------------------------------------------------------------------ main */

const figure = await cutout();
writeFileSync(resolve(root, 'public/media/home/bitmoji-cutout.png'), await sharp(figure).resize(600, 600).png().toBuffer());

const sizes = { 16: null, 32: null, 48: null };
for (const s of Object.keys(sizes)) sizes[s] = await icon(figure, Number(s));
writeFileSync(out('favicon.ico'), ico(Object.entries(sizes).map(([size, buf]) => ({ size: Number(size), buf }))));
writeFileSync(out('favicon-16x16.png'), sizes[16]);
writeFileSync(out('favicon-32x32.png'), sizes[32]);
writeFileSync(out('favicon.png'), await icon(figure, 512));
writeFileSync(out('icon-192.png'), await icon(figure, 192));
writeFileSync(out('icon-512.png'), await icon(figure, 512));
writeFileSync(out('icon-maskable-512.png'), await icon(figure, 512, { bleed: true, scale: 0.95, lift: 0.04 }));
writeFileSync(out('apple-touch-icon.png'), await icon(figure, 180, { bleed: true, scale: 1.05, lift: 0.02 }));
writeFileSync(out('og-image.png'), await card(figure));
console.log('brand: favicon.ico, favicons, icons, apple-touch-icon and og-image.png written');
