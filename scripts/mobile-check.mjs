/**
 * Live mobile checks. `npm run mobile:check` against a running preview.
 *
 * These exist because of what the static checks missed on 12 August 2026. The
 * build was green, the unit suite was green, and the phone was still serving
 * the desktop tree at 40% scale, a marquee animating four logos that already
 * fit on screen, and a two-row dock hiding five of its nine destinations. None
 * of that is expressible as an assertion about the content layer, and all of it
 * is obvious to anything that opens the page at phone size and looks.
 *
 * So: drive a real browser at real device sizes and assert on what rendered.
 *
 *   node scripts/mobile-check.mjs [url]
 */
import { chromium, devices } from 'playwright';

const URL = process.argv[2] ?? 'http://127.0.0.1:4173/';
const EXECUTABLE = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';

const failures = [];
const passes = [];
const check = (ok, label, detail = '') => {
  (ok ? passes : failures).push(detail ? `${label} (${detail})` : label);
};

/**
 * Nothing in the portfolio may be clipped, on either tree.
 *
 * The Also Building cards used `truncate` and `line-clamp-1`, so a real
 * sentence became "Conversations with operators on how AI is..." for every
 * reader. The clamps are gone; this is what stops them coming back, and it
 * catches the other direction too, a name overflowing a box that got narrower.
 *
 * Both trees, deliberately. The first version of this ran only on the phone
 * profiles, which never render LivePortfolio, so it passed while the desktop
 * card was still truncating: a guard that cannot fail is not a guard.
 */
const clippedText = (page) =>
  page.evaluate(() => {
    const bad = [];
    const section = document.querySelector('section#portfolio');
    if (!section) return ['no portfolio section'];
    for (const el of section.querySelectorAll('h3, h4, p, span')) {
      if (el.children.length > 0) continue;
      const text = (el.textContent ?? '').trim();
      if (!text) continue;
      if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) {
        bad.push(`${el.tagName.toLowerCase()} "${text.slice(0, 30)}"`);
      }
    }
    return bad;
  });

const browser = await chromium.launch({ executablePath: EXECUTABLE });

/** Every profile that must land on the mobile tree. */
const phones = [
  ['Pixel 7', devices['Pixel 7']],
  ['iPhone 13', devices['iPhone 13']],
  ['iPhone SE', devices['iPhone SE']],
  [
    // Chrome for Android with "Request desktop site" on: a ~980px virtual
    // viewport, a desktop UA, and a finger for a pointer.
    'Android, desktop-site mode',
    {
      viewport: { width: 980, height: 1750 },
      isMobile: true,
      hasTouch: true,
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    },
  ],
];

for (const [name, profile] of phones) {
  const ctx = await browser.newContext(profile);
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  const onMobileTree = await page.evaluate(() => document.body.dataset.mobileSnap === 'true');
  check(onMobileTree, `${name}: renders the mobile tree`);

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  check(!overflows, `${name}: no horizontal overflow`);

  /**
   * The check that was missing, and the reason three rounds of mobile fixes
   * looked like nothing had changed.
   *
   * Rendering the mobile tree is half the job. The other half is rendering it
   * at phone scale. Chrome's desktop-site mode lays out at ~980px and shrinks
   * the result to fit the screen, so a correct mobile layout still arrived at
   * 42% size with 6px body text. Nothing measured that, because every
   * measurement was taken inside the 980px document where all of it looked
   * right.
   *
   * `offsetWidth` is the layout width and reflects the root zoom; the bounding
   * rect does not. The gap between the two is the correction.
   */
  const scale = await page.evaluate(() => ({
    layout: document.body.offsetWidth,
    painted: Math.round(document.body.getBoundingClientRect().width),
    bodyText: Math.round(
      parseFloat(getComputedStyle(document.querySelector('#hero p')).fontSize),
    ),
  }));
  check(
    scale.layout >= 320 && scale.layout <= 460,
    `${name}: the document lays out at phone width`,
    `${scale.layout}px`,
  );
  check(
    scale.painted >= scale.layout,
    `${name}: painted at least as wide as it is laid out`,
    `${scale.layout} -> ${scale.painted}`,
  );

  // Breakpoints measure the viewport, which zoom does not change, so a phone in
  // desktop-site mode still fires `md:`. Nothing in the mobile tree may depend
  // on that: shared components take their layout from a prop instead.
  const desktopVariants = await page.evaluate(() => {
    const bad = [];
    const roots = document.querySelectorAll('main#main, header[role="banner"], [role="navigation"]');
    for (const el of [...roots].flatMap((r) => [r, ...r.querySelectorAll('[class]')])) {
      const cls = typeof el.className === 'string' ? el.className : '';
      const hit = cls.match(/\b(sm|md|lg|xl):[A-Za-z0-9_./[\]-]+/g);
      if (hit) bad.push(`${el.tagName.toLowerCase()} ${hit.slice(0, 2).join(' ')}`);
    }
    return bad;
  });
  check(
    desktopVariants.length === 0,
    `${name}: nothing in the mobile tree keys off a breakpoint`,
    desktopVariants.slice(0, 3).join('; '),
  );

  // A tap target under 40px is a miss on a phone.
  const small = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll('a, button')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (el.offsetHeight < 40 && (el.textContent ?? '').trim().length > 0) {
        bad.push(`${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 28)}" ${el.offsetHeight}px`);
      }
    }
    return bad;
  });
  check(small.length === 0, `${name}: every tap target clears 40px`, small.slice(0, 4).join('; '));

  // A fixed pixel budget, not a multiple of the viewport, because the content
  // is the same on an SE and a Pixel and only the wrapping differs. 950px is
  // roughly a screen and a bit on any phone: enough for a heading, an intro
  // and a list, and short of the multi-screen slog this is here to prevent.
  const tall = await page.evaluate(() => {
    const BUDGET = 950;
    return [...document.querySelectorAll('section[id]')]
      .map((s) => ({ id: s.id, h: s.offsetHeight }))
      .filter((s) => s.h > BUDGET)
      .map((s) => `${s.id} ${s.h}px`);
  });
  check(tall.length === 0, `${name}: no section outruns its height budget`, tall.join('; '));

  const clipped = await clippedText(page);
  check(
    clipped.length === 0,
    `${name}: no clipped text in the portfolio`,
    clipped.slice(0, 3).join('; '),
  );

  // The dock is orientation, not a page. One row, nothing scrolling sideways.
  const dock = await page.evaluate(() => {
    const el = document.querySelector('[role="navigation"][aria-label]');
    if (!el) return null;
    return {
      height: el.offsetHeight,
      scrolls: [...el.querySelectorAll('*')].some((n) => n.scrollWidth > n.clientWidth + 1),
      items: el.querySelectorAll('a, button').length,
    };
  });
  check(dock !== null, `${name}: the dock is present`);
  if (dock) {
    check(dock.height <= 110, `${name}: the dock stays under 110px`, `${dock.height}px`);
    check(!dock.scrolls, `${name}: nothing in the dock scrolls sideways`);
    check(dock.items <= 5, `${name}: the dock holds five slots or fewer`, `${dock.items}`);
  }

  // Every horizontal rail must actually be swipeable and land somewhere.
  const rails = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.mobile-snap-track')) {
      out.push({
        overflowing: el.scrollWidth > el.clientWidth + 1,
        id: el.closest('section[id]')?.id ?? '?',
      });
    }
    return out;
  });
  check(rails.length > 0, `${name}: horizontal rails exist`);
  check(
    rails.every((r) => r.overflowing),
    `${name}: every rail has something to swipe to`,
    rails.filter((r) => !r.overflowing).map((r) => r.id).join('; '),
  );

  // The contact sheet is the site's one ask. It has to open.
  const contactButton = page.locator('[role="navigation"] button').last();
  await contactButton.click();
  await page.waitForTimeout(600);
  const sheetOpen = await page.evaluate(
    () => document.querySelector('[role="dialog"]') !== null,
  );
  check(sheetOpen, `${name}: the contact sheet opens from the dock`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Nothing invented. The eyebrow labels are gone from every section header.
  const invented = await page.evaluate(() => {
    const banned = [
      'The operating stack',
      '60-minute Maven sessions',
      'Taken by more than 4,000 people',
    ];
    const text = document.body.innerText;
    return banned.filter((b) => text.includes(b));
  });
  check(invented.length === 0, `${name}: no invented mobile-only copy`, invented.join('; '));

  await ctx.close();
}

/** A touchscreen laptop keeps the desktop tree: coarse pointer, but not primary. */
const laptop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const laptopPage = await laptop.newPage();
await laptopPage.goto(URL, { waitUntil: 'networkidle' });
await laptopPage.waitForTimeout(600);
check(
  await laptopPage.evaluate(() => document.body.dataset.mobileSnap !== 'true'),
  'Desktop 1440: keeps the desktop tree',
);
await laptopPage.evaluate(() => document.querySelector('section#portfolio')?.scrollIntoView());
await laptopPage.waitForTimeout(400);
const laptopClipped = await clippedText(laptopPage);
check(
  laptopClipped.length === 0,
  'Desktop 1440: no clipped text in the portfolio',
  laptopClipped.slice(0, 3).join('; '),
);
await laptop.close();

await browser.close();

for (const p of passes) console.log(`  ok    ${p}`);
for (const f of failures) console.error(`  FAIL  ${f}`);
console.log(`\nmobile: ${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
