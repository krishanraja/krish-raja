/**
 * The guard rail that stops five contradictory positionings coexisting again.
 *
 * These tests read the content layer and the generated artifacts. They fail the
 * build when a surface disagrees with another, when a retired name comes back,
 * or when banned copy slips in.
 *
 * The rules under test are written down in CLAUDE.md and
 * project-documentation/POSITIONING.md. If a test here fails, the fix is
 * usually the copy, not the test.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { staleArtifacts } from '../../../scripts/generate-static.mjs';

import { site } from '../site';
import { hero } from '../hero';
import { operate } from '../operate';
import { portfolio } from '../portfolio';
import { receipts } from '../receipts';
import { appearances } from '../appearances';
import { deck } from '../deck';
import { os } from '../os';
import { lessons } from '../lessons';
import { contact } from '../contact';
import { nav } from '../nav';

const root = resolve(__dirname, '../../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

const indexHtml = read('index.html');
const llmsTxt = read('public/llms.txt');
const sitemapXml = read('public/sitemap.xml');

const modules = { site, hero, operate, os, deck, portfolio, receipts, appearances, lessons, contact, nav };

/** Every string value anywhere in the content layer, with its path. */
const contentStrings: { path: string; value: string }[] = [];
const walk = (node: unknown, path: string) => {
  if (typeof node === 'string') {
    contentStrings.push({ path, value: node });
  } else if (Array.isArray(node)) {
    node.forEach((child, i) => walk(child, `${path}[${i}]`));
  } else if (node && typeof node === 'object') {
    for (const [key, child] of Object.entries(node)) walk(child, `${path}.${key}`);
  }
};
for (const [name, mod] of Object.entries(modules)) walk(mod, name);

/** Content strings that are URLs or asset/icon keys rather than prose. */
const isProse = (s: { path: string; value: string }) =>
  !/^(https?:|mailto:|#|@)/.test(s.value) &&
  !/\.(href|url|link|asset|icon|sheetIcon|ctaHref|secondaryHref|canonical|ogImage)$/.test(s.path) &&
  !/(sameAs|alumniOf)\[/.test(s.path);

const prose = contentStrings.filter(isProse);

describe('the spine holds across every surface', () => {
  it('the hero H1 is the spine sentence', () => {
    expect(hero.h1).toBe(site.spine);
  });

  it('the meta description reaches index.html, the JSON-LD and llms.txt intact', () => {
    expect(indexHtml).toContain(`<meta name="description" content="${site.description}" />`);
    expect(indexHtml).toContain(`<meta property="og:description" content="${site.description}" />`);
    expect(indexHtml).toContain(`<meta name="twitter:description" content="${site.description}" />`);
    expect(indexHtml).toContain(JSON.stringify(site.description).slice(1, -1));
  });

  it('the title is identical across title, og and twitter', () => {
    expect(indexHtml).toContain(`<title>${site.title}</title>`);
    expect(indexHtml).toContain(`<meta name="title" content="${site.title}" />`);
    expect(indexHtml).toContain(`<meta property="og:title" content="${site.title}" />`);
    expect(indexHtml).toContain(`<meta name="twitter:title" content="${site.title}" />`);
  });

  it('llms.txt opens with the same bio that site.ts defines', () => {
    expect(llmsTxt).toContain(site.bio);
  });

  it('the sitemap points at the canonical URL', () => {
    expect(sitemapXml).toContain(`<loc>${site.canonical}</loc>`);
    expect(sitemapXml).toContain(`<lastmod>${site.updated}</lastmod>`);
  });
});

describe('the canonical numbers do not drift', () => {
  // Every figure below is in project-documentation/FACTS.md. A figure that
  // differs across two surfaces is a defect.
  const metrics = receipts.achievements.map((a) => a.metric);
  const prosaic = receipts.roles.map((r) => r.detail).join(' ');

  it('the receipt cards and the llms.txt prose agree on Nine', () => {
    expect(metrics).toContain('$9M → $61M');
    expect(prosaic).toContain('$9M to $61M');
    expect(llmsTxt).toContain('$9M to $61M');
  });

  it('the receipt cards and the llms.txt prose agree on Captify', () => {
    expect(metrics).toContain('$0 → $12M ARR');
    expect(prosaic).toContain('$0 to $12M ARR');
    expect(llmsTxt).toContain('$0 to $12M ARR');
  });

  it('the Nexxen figure survives the Market Launches merge', () => {
    // Captify and Nexxen share one card now, so $4M to $38M lives in that
    // card's description rather than in a metric of its own. Without this,
    // the merge could quietly drop a canonical figure and nothing would fail.
    const descriptions = receipts.achievements.map((a) => a.description).join(' ');
    expect(descriptions).toContain('$4M to $38M');
    expect(prosaic).toContain('$4M to $38M');
    expect(llmsTxt).toContain('$4M to $38M');
  });

  it('Nine P&L is $55M at 22% EBITDA wherever it appears', () => {
    expect(metrics).toContain('$55M P&L');
    expect(llmsTxt).toContain('$55M P&L at 22% EBITDA');
  });

  it('the agent and workflow counts agree everywhere they appear', () => {
    const counted = prose.filter((s) => /\d+ agents/.test(s.value));
    expect(counted.length).toBeGreaterThan(0);
    for (const s of counted) {
      expect(s.value, `${s.path} disagrees on the agent count`).toMatch(/14 agents/);
    }
    expect(llmsTxt).toContain('14-agent, 45-workflow');
  });

  it('every years-of-experience claim says sixteen', () => {
    // The spine sentence says sixteen. Lightning Lessons used to say twenty.
    // Only career-length claims count: "7x over 3 years" is a duration, so the
    // pattern starts at ten.
    //
    // Digits pass as well as the word. What must not drift is the number, and
    // "16" is the same number as "sixteen"; the twenty this test was written to
    // catch fails either way. The hero says 16 and the meta and the footer say
    // sixteen, which is a style split rather than a factual one.
    const claims = prose.filter((s) =>
      /\b(1[0-9]|2[0-9]|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+years\b/i.test(
        s.value,
      ),
    );
    for (const claim of claims) {
      expect(claim.value, `${claim.path} disagrees on years of experience`).toMatch(
        /\b(sixteen|16) years\b/i,
      );
    }
  });

  it('the Maven student count is 4,000 wherever it appears', () => {
    // Confirmed by Krish. An earlier source said 100+, which must not return.
    const claims = prose.filter((s) => /\b(students|people have taken|taken by)\b/i.test(s.value));
    for (const claim of claims) {
      expect(claim.value, `${claim.path} states a different student count`).toMatch(/4,000/);
    }
    const all = [...prose.map((s) => s.value), llmsTxt].join('\n');
    expect(all, 'the retired 100+ student count is back').not.toMatch(/\b100\+\s+(enterprise\s+)?students/i);
  });

  it('no surface invents a venture count', () => {
    const all = [...prose.map((s) => s.value), indexHtml, llmsTxt].join('\n');
    expect(all).not.toMatch(/\b\d+\s+ventures\b/);
  });
});

describe('retired names never come back', () => {
  // The list lives outside src/ on purpose, so that grepping the source for a
  // retired name returns nothing. See project-documentation/retired-names.json.
  const retired: { names: string[]; urlFragments: string[] } = JSON.parse(
    read('project-documentation/retired-names.json'),
  );

  it.each(retired.names)('a retired name appears nowhere in the content layer (%#)', (name) => {
    const hits = prose.filter((s) => s.value.includes(name)).map((s) => s.path);
    expect(hits, `retired name still in the content layer: ${name}`).toEqual([]);
  });

  it.each(retired.names)('a retired name appears nowhere in the generated files (%#)', (name) => {
    expect(indexHtml, `retired name still in index.html: ${name}`).not.toContain(name);
    expect(llmsTxt, `retired name still in llms.txt: ${name}`).not.toContain(name);
  });

  it.each(retired.urlFragments)('nothing links to a dead or orphaned URL (%#)', (fragment) => {
    const urls = contentStrings.filter((s) => s.value.startsWith('http')).map((s) => s.value);
    for (const url of urls) {
      expect(url, `link to a retired URL: ${fragment}`).not.toContain(fragment);
    }
    expect(indexHtml, `retired URL in index.html: ${fragment}`).not.toContain(fragment);
    expect(llmsTxt, `retired URL in llms.txt: ${fragment}`).not.toContain(fragment);
  });
});

describe('structured data stays honest', () => {
  // Named in project-documentation/retired-names.json rather than here, so that
  // grepping src/ for a banned property returns nothing.
  const banned: string[] = JSON.parse(
    read('project-documentation/retired-names.json'),
  ).structuredDataBans;

  it.each(banned)('the structured data carries no banned property (%#)', (property) => {
    expect(indexHtml, `banned property in the page: ${property}`).not.toContain(property);
  });

  it('makes no geographic market claim', () => {
    // The journey section is biography and is the one place a place name belongs.
    expect(site.title).not.toMatch(/\b(UK|London|New York|Sydney|APAC)\b/);
    expect(site.description).not.toMatch(/\b(UK|London|New York)\b/);
    expect(site.jobTitle).not.toMatch(/\b(UK|London|New York|Sydney|APAC)\b/);
  });

  it('quotes no price for anything sold', () => {
    // Pricing lives on themindmaker.ai only, so there is one place to keep
    // current. Track-record figures are a different thing and are allowed:
    // $9M to $61M is a receipt, not a price.
    // The offer used to be its own section. It folded into Contact on
    // 12 Aug 2026, so the section that asks for the sale is the one checked.
    const contactCopy = [
      ...contact.links.map((l) => `${l.action} ${l.detail}`),
      typeof contact.sub === 'string' ? contact.sub : Object.values(contact.sub).join(' '),
    ].join('\n');
    expect(contactCopy, 'the contact section quotes a figure').not.toMatch(/[$£€]\s?[\d,]/);

    const all = [...prose.map((s) => s.value), indexHtml, llmsTxt].join('\n');
    expect(all, 'a per-seat price survives').not.toMatch(/per seat|\/\s?seat/i);
    expect(all, 'a retired price survives').not.toMatch(/\$3,500|\$15k|\$60k/i);

    // Free is a price. It was a chip on all five Lightning Lessons cards and
    // the first word of the mobile heading, and it came off both on 12 Aug
    // 2026. "feel free" is the idiom and is not what this catches.
    const lessonsCopy = [lessons.title, lessons.sub]
      .map((c) => (typeof c === 'string' ? c : Object.values(c).join(' ')))
      .join('\n');
    expect(lessonsCopy, 'Free is back on the lessons').not.toMatch(/\bfree\b/i);
    expect(lessons, 'the Free chip is back').not.toHaveProperty('badge');
  });
});

describe('the advisory work stays anonymous', () => {
  // Decided 12 Aug 2026: no client name and no dollar figure anywhere near the
  // advisory engagements. FACTS.md still records all of it; the site does not
  // publish any of it. The receipts section carries one anonymized entry.
  const confidential = [
    'AdFixus',
    'Meliora',
    '$254K',
    'Hearst',
    'Arena Group',
    'The Weather Company',
  ];

  it.each(confidential)('no surface names %s', (name) => {
    const hits = prose.filter((s) => s.value.includes(name)).map((s) => s.path);
    expect(hits, `confidential detail in the content layer: ${name}`).toEqual([]);
    expect(indexHtml, `confidential detail in index.html: ${name}`).not.toContain(name);
    expect(llmsTxt, `confidential detail in llms.txt: ${name}`).not.toContain(name);
  });
});

describe('the copy rules hold', () => {
  const bannedWords = [
    'leverage', 'synergy', 'empower', 'seamless', 'game-changer', 'cutting-edge',
    'best-in-class', 'drive value', 'impactful', 'robust', 'transformative',
    'elevate', 'delve', 'deep dive', 'unpack', 'at the end of the day',
    "in today's world", "it's worth noting", 'mission-critical',
  ];

  const bannedPhrases = [
    'at the intersection of',
    'uniquely positioned to',
    'what sets',
    'I am passionate about',
  ];

  it.each(bannedWords)('no user-facing copy says "%s"', (word) => {
    const hits = prose
      .filter((s) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(s.value))
      .map((s) => `${s.path}: ${s.value}`);
    expect(hits).toEqual([]);
  });

  it.each(bannedPhrases)('no user-facing copy says "%s"', (phrase) => {
    const hits = prose
      .filter((s) => s.value.toLowerCase().includes(phrase.toLowerCase()))
      .map((s) => s.path);
    expect(hits).toEqual([]);
  });

  it('never uses harness as a metaphor', () => {
    // Banned as a verb ("harness the power of"). The noun is a real term of art
    // in the agent decks, so "building the harness" stays.
    const hits = prose
      .filter((s) => /\bharness(es|ing|ed)?\s+(the|your|our|its|their)\s/i.test(s.value))
      .map((s) => s.path);
    expect(hits).toEqual([]);
  });

  it('contains no em dash', () => {
    // Written as an escape so that grepping src/ for the character itself
    // returns nothing, which is the check Krish runs.
    const EM_DASH = '\u2014';
    const hits = contentStrings.filter((s) => s.value.includes(EM_DASH)).map((s) => s.path);
    expect(hits).toEqual([]);
    expect(indexHtml).not.toContain(EM_DASH);
    expect(llmsTxt).not.toContain(EM_DASH);
    expect(sitemapXml).not.toContain(EM_DASH);
  });

  it('ships no dead anchor', () => {
    const links = contentStrings.filter((s) => /\.(href|link)$/.test(s.path));
    for (const link of links) {
      expect(link.value, `${link.path} goes nowhere`).not.toBe('#');
      expect(link.value.length, `${link.path} is empty`).toBeGreaterThan(0);
    }
  });
});

describe('the content index is the authority on what may be published', () => {
  // public/files/content index/krish-raja-content-index.md carries a capture,
  // a verification status and the source URLs for every appearance. Two of its
  // records are marked do-not-publish. These tests make that a build failure
  // rather than a instruction someone has to remember.
  const manifest = read('public/files/content index/krish-raja-content-index.md');

  const records = new Map<string, { status: string; filename: string | null; urls: string[] }>();
  for (const block of manifest.split('```yaml').slice(1)) {
    const body = block.split('```')[0];
    const id = /appearance_id:\s*(\S+)/.exec(body)?.[1];
    if (!id) continue;
    records.set(id, {
      status: /screenshot_status:\s*(\S+)/.exec(body)?.[1] ?? 'unknown',
      filename: (/screenshot_filename:\s*(\S+)/.exec(body)?.[1] ?? 'null').replace('null', ''),
      urls: [...body.matchAll(/^\s*-\s+(https?:\/\/\S+)$/gm)].map((m) => m[1]),
    });
  }

  const withRecord = appearances.items.filter((i) => i.appearanceId);

  it('the manifest parsed', () => {
    expect(records.size).toBeGreaterThan(30);
    expect(withRecord.length).toBeGreaterThan(10);
  });

  it.each(withRecord.map((i) => [i.appearanceId!, i] as const))(
    'the capture for %s is approved',
    (id, item) => {
      const record = records.get(id);
      expect(record, `no manifest record for ${id}`).toBeDefined();
      expect(record!.status, `${id} is marked "${record!.status}" and must not be published`).toBe(
        'approved',
      );
      expect(item.media, `${id} has no image`).toBeTruthy();
    },
  );

  it.each(withRecord.filter((i) => i.href).map((i) => [i.appearanceId!, i.href!] as const))(
    'the link for %s is one of its own source URLs',
    (id, href) => {
      const record = records.get(id)!;
      const normalise = (u: string) => u.replace(/#page=\d+$/, '').replace(/\/$/, '');
      expect(
        record.urls.map(normalise),
        `${href} is not evidence listed against ${id}`,
      ).toContain(normalise(href));
    },
  );

  it('nothing anywhere references a rejected or unavailable capture', () => {
    const banned = [...records.entries()]
      .filter(([, r]) => r.status !== 'approved')
      .map(([id]) => id);
    expect(banned.length, 'expected the manifest to still mark some records unusable').toBeGreaterThan(0);
    const everything = [...contentStrings.map((s) => s.value), indexHtml, llmsTxt].join('\n');
    for (const id of banned) {
      expect(everything, `${id} is marked do-not-publish in the content index`).not.toContain(id);
    }
  });
});

describe('every referenced media file exists', () => {
  const exists = (p: string) => existsSync(resolve(root, 'public', p.replace(/^\//, '')));

  it.each(os.entries.map((e) => e.id))('the %s recording and poster are built', (id) => {
    expect(exists(`/media/os/${id}.mp4`), `/media/os/${id}.mp4 is missing`).toBe(true);
    expect(exists(`/media/os/${id}.jpg`), `/media/os/${id}.jpg is missing`).toBe(true);
  });

  it('no two OS entries ship the same recording', () => {
    // 12 August 2026: a master arrived named `new os content vid.mp4`, was
    // renamed to os-content-final.mp4 on the strength of that name, and
    // transcoded. It was a recording of the Org screen, so the site shipped the
    // same agent roster labelled both "Content" and "The org". Every check
    // passed. ffprobe parsed it, the file shrank 20x, the page rendered, the
    // suite was green, and the only way to notice was to look at a frame.
    //
    // Nothing here can know whether a video is about content. It can know that
    // two entries claiming to be different recordings are the same picture.
    // Genuinely different captures of this app run 69 to 128 bits apart, so 32
    // is far below anything real and far above nothing.
    const fingerprints: Record<string, string> = JSON.parse(
      read('public/media/os/fingerprints.json'),
    );
    const hamming = (a: string, b: string) => {
      let n = 0;
      for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) n += 1;
      return n;
    };

    for (const entry of os.entries) {
      expect(fingerprints[entry.id], `${entry.id} has no poster fingerprint`).toBeTruthy();
    }

    const ids = os.entries.map((e) => e.id);
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        const distance = hamming(fingerprints[ids[i]], fingerprints[ids[j]]);
        expect(
          distance,
          `${ids[i]} and ${ids[j]} look like the same recording (${distance} bits apart)`,
        ).toBeGreaterThan(32);
      }
    }
  });

  it('every deck slide has both renditions', () => {
    const missing = deck.slides.flatMap((s) =>
      [640, 1600]
        .map((w) => `/media/deck/${s.id}-${w}.webp`)
        .filter((p) => !exists(p)),
    );
    expect(missing, 'run `npm run media`').toEqual([]);
  });

  it('every appearance image is built', () => {
    const missing = appearances.items
      .map((i) => i.media)
      .filter((m): m is string => Boolean(m))
      .filter((m) => !exists(m));
    expect(missing, 'run `npm run media`').toEqual([]);
  });

  it('every deck slide names a real deck', () => {
    const ids = new Set(deck.decks.map((d) => d.id));
    for (const slide of deck.slides) {
      expect(ids, `${slide.id} points at an unknown deck`).toContain(slide.deck);
    }
  });
});

describe('spelling is consistent', () => {
  // US throughout, decided 12 August 2026. The spine sentence moved with it and
  // LinkedIn has to match. See project-documentation/POSITIONING.md.
  it.each(['commercialis', 'organis', 'defence', 'optimis', 'recognis'])(
    'no content uses the British form "%s"',
    (stem) => {
      const hits = prose.filter((s) => new RegExp(stem, 'i').test(s.value)).map((s) => s.path);
      expect(hits).toEqual([]);
    },
  );
});

describe('the generated artifacts are in sync with src/content/', () => {
  it('no generated file has drifted', () => {
    // Fails if index.html, llms.txt or sitemap.xml was hand-edited, or a
    // content change was committed without running `npm run generate`.
    expect(staleArtifacts()).toEqual([]);
  });
});
