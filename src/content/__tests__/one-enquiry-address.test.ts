/**
 * One enquiry address, everywhere: krish@mindmake.co, the one FACTS.md pins.
 * Speaker forms, pitches and every published surface use it. A second mailbox
 * on the page is a mailbox no enquiry reader watches.
 *
 * Ruling (Krish, 2026-11-14): krishraja.com 5.10, one enquiry address, the
 * mindmake.co one that FACTS.md pins; the speaker forms use it too.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import * as content from '../index';
import { site } from '../site';

const ADDRESS = 'krish@mindmake.co';
const root = resolve(__dirname, '../../..');
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[a-z]{2,}/g;

/** Every string value in the content layer (values only, never comments). */
const strings: string[] = [];
const walk = (node: unknown) => {
  if (typeof node === 'string') strings.push(node);
  else if (Array.isArray(node)) node.forEach(walk);
  else if (node && typeof node === 'object') Object.values(node).forEach(walk);
};
walk(content);

const published = ['index.html', 'public/llms.txt', 'public/proof.json', 'public/site.webmanifest'];
const componentFiles = (dir: string): string[] =>
  readdirSync(resolve(root, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? componentFiles(`${dir}/${e.name}`) : /\.(tsx?|js)$/.test(e.name) ? [`${dir}/${e.name}`] : [],
  );

describe('one enquiry address', () => {
  it('the site publishes the pinned address', () => {
    expect(site.email).toBe(ADDRESS);
  });

  it('the content layer holds no other address', () => {
    const found = strings.flatMap((s) => s.match(EMAIL) ?? []);
    expect(found.length).toBeGreaterThan(0);
    expect([...new Set(found)]).toEqual([ADDRESS]);
  });

  it.each(published)('%s publishes no other address', (file) => {
    const found = readFileSync(resolve(root, file), 'utf8').match(EMAIL) ?? [];
    expect([...new Set(found)].filter((a) => a !== ADDRESS)).toEqual([]);
  });

  it('no component or server route hard-codes an address', () => {
    for (const file of [...componentFiles('src/components'), ...componentFiles('api')]) {
      const code = readFileSync(resolve(root, file), 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1');
      expect(code.match(EMAIL) ?? [], file).toEqual([]);
    }
  });
});
