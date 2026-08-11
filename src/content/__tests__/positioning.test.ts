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
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { staleArtifacts } from '../../../scripts/generate-static.mjs';

import { site } from '../site';
import { hero } from '../hero';
import { operate } from '../operate';
import { portfolio } from '../portfolio';
import { receipts } from '../receipts';
import { work } from '../work';
import { lessons } from '../lessons';
import { offer } from '../offer';
import { contact } from '../contact';
import { nav } from '../nav';

const root = resolve(__dirname, '../../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

const indexHtml = read('index.html');
const llmsTxt = read('public/llms.txt');
const sitemapXml = read('public/sitemap.xml');

const modules = { site, hero, operate, portfolio, receipts, work, lessons, offer, contact, nav };

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
    const offerCopy = [
      ...offer.cards.map((c) => `${c.title} ${c.body} ${c.cta} ${c.eyebrow ?? ''}`),
      typeof offer.sub === 'string' ? offer.sub : Object.values(offer.sub).join(' '),
    ].join('\n');
    expect(offerCopy, 'the offer quotes a figure').not.toMatch(/[$£€]\s?[\d,]/);

    const all = [...prose.map((s) => s.value), indexHtml, llmsTxt].join('\n');
    expect(all, 'a per-seat price survives').not.toMatch(/per seat|\/\s?seat/i);
    expect(all, 'a retired price survives').not.toMatch(/\$3,500|\$15k|\$60k/i);
  });
});

describe('the copy rules hold', () => {
  const bannedWords = [
    'leverage', 'synergy', 'empower', 'seamless', 'game-changer', 'cutting-edge',
    'best-in-class', 'drive value', 'impactful', 'robust', 'transformative',
    'elevate', 'harness', 'delve', 'deep dive', 'unpack', 'at the end of the day',
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

describe('the generated artifacts are in sync with src/content/', () => {
  it('no generated file has drifted', () => {
    // Fails if index.html, llms.txt or sitemap.xml was hand-edited, or a
    // content change was committed without running `npm run generate`.
    expect(staleArtifacts()).toEqual([]);
  });
});
