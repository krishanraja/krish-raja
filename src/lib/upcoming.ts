import type { UpcomingLesson } from '@/content/types';

/**
 * Pure, so the page and scripts/generate-static.mts agree on what "announced"
 * means. No React and no assets: the generator imports this under plain Node.
 */

/** Krish has created it in Maven: a link and a title are both filled in. */
export const isAnnounced = (u: UpcomingLesson): boolean =>
  /^https:\/\//.test(u.link.trim()) && u.title.trim().length > 0;

/** Announced and not started yet. The page hides it the moment it begins. */
export const isAhead = (u: UpcomingLesson, now: number): boolean =>
  isAnnounced(u) && Date.parse(u.startDate) > now;

/** "3 Dec" in the zone it is announced in, for the row's number column. */
export const shortDate = (u: UpcomingLesson): string =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: u.timeZone }).format(
    new Date(u.startDate),
  );

/**
 * "3 December 2026, 12:00 UTC-05:00", for llms.txt and the crawler copy. The
 * offset is read off startDate rather than asked of Intl, whose zone names
 * differ between Node builds (GMT-5 here, EST there) and would make the
 * generated files drift from one machine to the next.
 */
export const longDate = (u: UpcomingLesson): string => {
  const at = new Date(u.startDate);
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: u.timeZone }).format(at);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: u.timeZone }).format(at);
  const offset = u.startDate.match(/([+-]\d{2}:\d{2})$/)?.[1];
  return `${day}, ${time}${offset ? ` UTC${offset}` : ''}`;
};
