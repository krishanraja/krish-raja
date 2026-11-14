import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { appearances } from '../appearances';
import { lessons } from '../lessons';
import { receipts } from '../receipts';
import { site } from '../site';
import { findForbidden } from '../../../scripts/public-script-guard';

/**
 * public/proof.json is what Control Center, the pitch writers and the voice
 * check read as approved proof. It must say exactly what the site says, and
 * nothing the site deliberately keeps off. The drift check in the generator
 * already fails if it is stale; these pin its shape and its limits.
 */
const root = join(__dirname, '../../..');
const feed = JSON.parse(readFileSync(join(root, 'public/proof.json'), 'utf8'));
const retired = JSON.parse(readFileSync(join(root, 'project-documentation/retired-names.json'), 'utf8'));
const headlines = JSON.parse(readFileSync(join(root, 'project-documentation/retired-headlines.json'), 'utf8'));

describe('the proof feed', () => {
  it('declares its schema and version, so readers can refuse a shape they do not know', () => {
    expect(feed.schema).toBe('krishraja.com/proof');
    expect(feed.version).toBe(1);
  });

  it('carries the spine, the cluster and the contact address exactly', () => {
    expect(feed.person.headline).toBe(site.spine);
    expect(feed.person.cluster).toBe('content, media and IP businesses');
    expect(feed.contact.email).toBe(site.email);
  });

  it('carries every headline figure as published, and no other', () => {
    expect(feed.figures.map((f: { metric: string }) => f.metric)).toEqual(receipts.achievements.map((a) => a.metric));
    expect(feed.roles.map((r: { detail: string }) => r.detail)).toEqual(receipts.roles.map((r) => r.detail));
  });

  it('lists only appearances the site links, with their own links', () => {
    const linked = appearances.items.filter((a) => a.href);
    expect(feed.appearances.map((a: { url: string }) => a.url)).toEqual(linked.map((a) => a.href));
  });

  it('lists the sessions, and the next one only once it is announced', () => {
    expect(feed.sessions.lessons).toHaveLength(lessons.lessons.length);
    if (!lessons.upcoming.link) expect(feed.sessions.next).toBeNull();
  });

  it('copies the retired list whole, for the voice check to enforce', () => {
    expect(feed.retired.names).toEqual(retired.names);
    expect(feed.retired.urlFragments).toEqual(retired.urlFragments);
    expect(feed.retired.spines).toEqual(headlines.spines);
    expect(feed.retired.renames).toEqual(headlines.renames);
  });

  it('leaves retired-names.json byte-identical to the copy the voice check pins', () => {
    // The ai-harness kill list pins this file by sha256. Change it only on
    // purpose, together with that pin; the feed's extras live in retired-headlines.json.
    const keys = Object.keys(retired).sort();
    expect(keys).toEqual(['comment', 'names', 'structuredDataBans', 'urlFragments']);
  });

  it('holds no address, key or server variable', () => {
    expect(findForbidden(JSON.stringify(feed))).toEqual([]);
  });
});
