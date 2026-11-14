/**
 * The speaking card names stages. An event the site's own records file only as
 * podcast recordings (appearances.ts, kind 'podcast') does not belong on it: a
 * booker who checks would find the card overstated. Those recordings stay in
 * In public, under Podcasts.
 *
 * Ruling (Krish, 2026-11-14): krishraja.com 5.9, POSSIBLE and Cannes Lions move
 * from the speaking card to podcasts.
 */
import { describe, expect, it } from 'vitest';

import { appearances } from '../appearances';
import { home } from '../home';

const card = home.practice.options.find((o) => o.id === 'speaking');
const venues = (card?.line ?? '').split(' · ').map((v) => v.trim()).filter(Boolean);
// "Cannes Lions 2026" -> "Cannes Lions": match on the event, not the year.
const eventName = (v: string) => v.replace(/\s*\d{4}$/, '');

describe('the speaking card names only stages', () => {
  it('names at least one venue', () => {
    expect(venues.length).toBeGreaterThan(0);
  });

  it.each(venues)('%s is not recorded only as a podcast', (venue) => {
    const name = eventName(venue).toLowerCase();
    const mentions = appearances.items.filter((a) =>
      `${a.outlet} ${a.title}`.toLowerCase().includes(name),
    );
    const onlyPodcasts = mentions.length > 0 && mentions.every((a) => a.kind === 'podcast');
    expect(onlyPodcasts, `${venue} appears in appearances.ts only as podcasts`).toBe(false);
  });

  it('the POSSIBLE and Cannes recordings are still published, as podcasts', () => {
    for (const event of ['possible', 'cannes']) {
      const items = appearances.items.filter((a) => `${a.outlet} ${a.title}`.toLowerCase().includes(event));
      expect(items.length).toBeGreaterThan(0);
      expect(items.every((a) => a.kind === 'podcast')).toBe(true);
    }
  });
});
