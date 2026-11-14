/**
 * Both subscribe buttons carry the four tags the publication engine's own
 * links use (growth-makeyourmindup engine/route.py: source, medium, campaign,
 * and a lower-case utm_content unique per placement), so a reader who
 * subscribes from krishraja.com is credited to it rather than read as
 * unattributed. Built once in site.ts; home.ts only points at it.
 *
 * Ruling (Krish, 2026-11-14): krishraja.com 5.12, the two subscribe links carry
 * the publication's tracking tags, krishraja.com counted as an organic source
 * (SYNTHESIS D9, I-09).
 */
import { describe, expect, it } from 'vitest';

import { home } from '../home';
import { site } from '../site';

const channelCard = home.practice.options.find((o) => o.id === 'channel');
const hrefs = [channelCard?.href ?? '', home.channel.subscribe.href];

describe('the subscribe links are tagged', () => {
  it('each button uses the one constant in site.ts', () => {
    expect(hrefs).toEqual([site.links.subscribe.build, site.links.subscribe.live]);
  });

  it.each(hrefs)('%s carries the four tags', (href) => {
    const url = new URL(href);
    expect(`${url.origin}${url.pathname}`).toBe('https://home.makeyourmindup.ai/subscribe');
    expect(url.searchParams.get('utm_source')).toBe('krishraja.com');
    expect(url.searchParams.get('utm_medium')).toBe('referral');
    expect(url.searchParams.get('utm_campaign')).toBe('growth');
    const content = url.searchParams.get('utm_content') ?? '';
    expect(content).toMatch(/^[a-z0-9-]+$/);
  });

  it('each placement has its own utm_content', () => {
    const contents = hrefs.map((h) => new URL(h).searchParams.get('utm_content'));
    expect(new Set(contents).size).toBe(contents.length);
  });
});
