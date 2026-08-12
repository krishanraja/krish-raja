import { useEffect, useRef, useState } from 'react';
import type { OsEntry } from '@/content/types';

/** True when the visitor has asked for reduced motion. Defaults to true until known. */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
};

/**
 * One recording, framed as the phone it was captured on.
 *
 * All four sources are portrait screen captures, so a 16:9 tile would letterbox
 * them into nothing. The frame is the honest presentation and it reads at a
 * glance as "this is the app, running".
 *
 * Nothing downloads until the clip is near the viewport: preload is none and
 * the src is only attached once observed. Playback starts when it is on screen
 * and pauses when it leaves, so four videos never decode at once.
 */
export const OsClip = ({ entry }: { entry: OsEntry }) => {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);

  const src = `/media/os/${entry.id}.mp4`;
  const poster = `/media/os/${entry.id}.jpg`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setArmed(true);
        setInView(e.isIntersecting);
      },
      { rootMargin: '200px', threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced || !armed) return;
    if (inView) void el.play().catch(() => undefined);
    else el.pause();
  }, [inView, reduced, armed]);

  return (
    <figure className="flex h-full flex-col">
      <div className="relative mx-auto w-full max-w-[260px]">
        {/* Device frame. The bezel is what makes a portrait capture read as an app. */}
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-border/70 bg-black shadow-lg ring-1 ring-black/5">
          <video
            ref={videoRef}
            src={armed ? src : undefined}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            controls={reduced}
            aria-label={entry.alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <figcaption className="mx-auto mt-4 max-w-[280px] text-center">
        <h3 className="mb-1 text-sm font-semibold text-foreground">{entry.title}</h3>
        <p className="text-xs leading-snug text-muted-foreground">{entry.note}</p>
      </figcaption>
    </figure>
  );
};
