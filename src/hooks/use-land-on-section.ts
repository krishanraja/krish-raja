import { useEffect } from 'react';
import { sectionLinks } from '@/content/links';

/** The section id a path like `/thinking` names, or undefined. */
export const sectionIdForPath = (pathname: string): string | undefined => {
  const path = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  return sectionLinks.find((l) => l.path === path)?.section.id;
};

/**
 * Lands the reader on the section a short address or a `#hash` names.
 *
 * The browser's own hash jump fires before React has rendered anything, so on a
 * single page app it finds no element and does nothing. And one jump is not
 * enough: slides, posters and logos load after it and push the section down.
 * So it re-aligns a few times over the first two seconds, and stops the moment
 * the reader scrolls, taps or presses a key, because moving the page under a
 * reader who has started reading is worse than landing a little off.
 *
 * Runs once the tree is chosen (`ready`), since the mobile and desktop trees
 * are swapped whole and the target element only exists after that.
 */
export const useLandOnSection = (ready: boolean) => {
  useEffect(() => {
    if (!ready) return;
    const id =
      sectionIdForPath(window.location.pathname) ??
      (window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : undefined);
    if (!id) return;

    let cancelled = false;
    const timers: number[] = [];
    const align = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      // `instant` overrides the smooth scroll-behavior on <html>: an animated
      // glide down the whole page reads as the site doing something to you.
      el?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    };
    const stop = () => {
      cancelled = true;
    };

    const events = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));

    requestAnimationFrame(align);
    for (const ms of [120, 350, 700, 1200, 2000]) timers.push(window.setTimeout(align, ms));
    window.addEventListener('load', align, { once: true });

    return () => {
      stop();
      timers.forEach((t) => window.clearTimeout(t));
      events.forEach((e) => window.removeEventListener(e, stop));
      window.removeEventListener('load', align);
    };
  }, [ready]);
};
