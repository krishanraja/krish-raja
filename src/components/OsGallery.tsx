import { useEffect, useRef, useState } from 'react';
import { ImageOff, Play } from 'lucide-react';
import type { OsEntry } from '@/content/types';
import { asset } from '@/lib/asset-map';

/** True when the visitor has asked for reduced motion. */
const usePrefersReducedMotion = () => {
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

/** Plays only once the tile is actually on screen, and only if motion is welcome. */
const useInView = <T extends HTMLElement>(enabled: boolean) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, inView };
};

/**
 * One screen or clip. An entry with no asset renders a labelled placeholder
 * rather than a broken image, so a section that is still being filled says so.
 */
export const OsTile = ({ entry, compact = false }: { entry: OsEntry; compact?: boolean }) => {
  const reduced = usePrefersReducedMotion();
  const isVideo = entry.kind === 'video';
  const src = asset(entry.asset);
  const poster = asset(entry.poster);
  const { ref, inView } = useInView<HTMLVideoElement>(Boolean(src) && isVideo && !reduced);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) void el.play().catch(() => undefined);
    else el.pause();
  }, [inView, ref]);

  return (
    <figure className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      <div className="relative aspect-video overflow-hidden bg-muted/50">
        {!src ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
            <ImageOff className="h-5 w-5 text-muted-foreground/60" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70">
              Screenshot to come
            </span>
          </div>
        ) : isVideo ? (
          <>
            <video
              ref={ref}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              controls={reduced}
              aria-label={entry.alt}
              className="h-full w-full object-cover"
            />
            {reduced && !poster && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Play className="h-8 w-8 text-foreground/70" aria-hidden="true" />
              </div>
            )}
          </>
        ) : (
          <img
            src={src}
            alt={entry.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className={compact ? 'p-3' : 'p-4'}>
        <div className="mb-1 flex items-baseline gap-2">
          <h3 className={`font-semibold text-foreground ${compact ? 'text-[13.5px]' : 'text-sm'}`}>
            {entry.title}
          </h3>
          {entry.date && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {entry.date}
            </span>
          )}
        </div>
        <p className={`leading-snug text-muted-foreground ${compact ? 'text-[12px]' : 'text-xs'}`}>
          {entry.note}
        </p>
      </figcaption>
    </figure>
  );
};
