import { describe, expect, it } from 'vitest';
import { lessons } from '@/content/lessons';
import type { UpcomingLesson } from '@/content/types';
import { isAhead, isAnnounced, longDate, shortDate } from '../upcoming';

const slot: UpcomingLesson = {
  startDate: '2026-12-03T12:00:00-05:00',
  timeZone: 'America/New_York',
  link: 'https://maven.com/p/abc123/example',
  title: 'Example',
  description: '',
};
const start = Date.parse(slot.startDate);

describe('the next live session slot', () => {
  it('stays hidden until both a link and a title are filled in', () => {
    expect(isAnnounced({ ...slot, link: '' })).toBe(false);
    expect(isAnnounced({ ...slot, title: '  ' })).toBe(false);
    expect(isAnnounced({ ...slot, link: 'maven.com/p/abc' })).toBe(false);
    expect(isAnnounced(slot)).toBe(true);
  });

  it('shows before the start and never after it', () => {
    expect(isAhead(slot, start - 60_000)).toBe(true);
    expect(isAhead(slot, start)).toBe(false);
    expect(isAhead(slot, start + 60_000)).toBe(false);
  });

  it('dates it in the zone it is announced in', () => {
    expect(shortDate(slot)).toBe('3 Dec');
    expect(longDate(slot)).toBe('3 December 2026, 12:00 UTC-05:00');
  });

  it('carries a start time with an explicit offset and a real zone', () => {
    const u = lessons.upcoming;
    expect(u.startDate, 'startDate needs an offset, or it is read as UTC').toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?[+-]\d{2}:\d{2}$/,
    );
    expect(Number.isNaN(Date.parse(u.startDate))).toBe(false);
    expect(() => new Intl.DateTimeFormat('en-GB', { timeZone: u.timeZone })).not.toThrow();
  });

  it('links an announced session to Maven, like every other lesson', () => {
    const u = lessons.upcoming;
    if (u.link) expect(u.link).toMatch(/^https:\/\/maven\.com\//);
    for (const l of lessons.lessons) expect(l.link).toMatch(/^https:\/\/maven\.com\//);
  });
});
