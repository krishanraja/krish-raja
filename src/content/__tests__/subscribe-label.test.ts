/**
 * Make Your Mind Up has paid tiers (POSITIONING.md), and "free" is a price
 * (CLAUDE.md, "Deliberately absent"). So no button on the site describes the
 * channel as free.
 *
 * Ruling (Krish, 2026-11-14): krishraja.com 5.8, "Subscribe" without "free".
 */
import { describe, expect, it } from 'vitest';

import { home } from '../home';

describe('the subscribe buttons name no price', () => {
  const channelCard = home.practice.options.find((o) => o.id === 'channel');
  const labels = [channelCard?.cta, home.channel.subscribe.label];

  it('both buttons exist', () => {
    expect(labels.every((l) => typeof l === 'string' && l.length > 0)).toBe(true);
  });

  it.each(labels)('"%s" does not say free', (label) => {
    expect(label).not.toMatch(/\bfree\b/i);
  });

  it('both buttons read "Subscribe"', () => {
    expect(labels).toEqual(['Subscribe', 'Subscribe']);
  });
});
