import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowUpRight, X } from 'lucide-react';
import { deck } from '@/content';
import { pick, type DeckSlide } from '@/content/types';
import { usePrefersReducedMotion } from '@/components/OsGallery';

const card = (id: string) => `/media/deck/${id}-640.webp`;
const full = (id: string) => `/media/deck/${id}-1600.webp`;

const deckTitle = (id: string) => deck.decks.find((d) => d.id === id)?.title ?? '';
const deckHref = (id: string) => deck.decks.find((d) => d.id === id)?.href;

/**
 * The full-screen reader.
 *
 * The cards are unreadable by design: these slides were built for a projector,
 * and at 330px the body text is about two pixels tall. This is where the slide
 * is actually legible. Arrow keys and swipe move between slides, Escape closes.
 */
const Reader = ({
  index,
  onClose,
  onMove,
}: {
  index: number;
  onClose: () => void;
  onMove: (delta: number) => void;
}) => {
  const slide = deck.slides[index];
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, onMove]);

  const href = deckHref(slide.deck);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white/70">
        <span className="text-[11px] uppercase tracking-widest">{deckTitle(slide.deck)}</span>
        <span className="text-[11px] tabular-nums">
          {index + 1} / {deck.slides.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-3 pb-3">
        <img
          src={full(slide.id)}
          alt={slide.alt}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
      </div>

      {href && (
        <div className="px-4 pb-5 text-center" style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {deck.sessionLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};

/**
 * A deck you can flick.
 *
 * Built on Embla, which is already a dependency, so the drag physics are the
 * real thing rather than a hand-rolled approximation: weighted momentum, a
 * rubber band at the ends, and a pointer that stays under your finger.
 *
 * `dragFree` is what makes it feel like a deck rather than a slideshow. There
 * is no snap fighting the flick, so a hard swipe sends it spinning and it
 * settles where the physics put it.
 *
 * Cards tilt and shrink with distance from the centre, recomputed from the
 * scroll position each frame, so the rail reads as a fanned stack.
 *
 * When nobody is touching it, it drifts. Any interaction stops the drift; it
 * resumes a few seconds after the last one.
 */
const SlideDeck = () => {
  const reduced = usePrefersReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    dragFree: !reduced,
    align: 'center',
    containScroll: false,
    skipSnaps: true,
  });

  const [open, setOpen] = useState<number | null>(null);
  const idleUntil = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  /** Tilt and scale each card by how far it sits from the centre. */
  const shape = useCallback(() => {
    if (!embla || reduced) return;
    const progress = embla.scrollProgress();
    const snaps = embla.scrollSnapList();
    const engine = embla.internalEngine();

    snaps.forEach((snap, i) => {
      let diff = snap - progress;
      // Unwrap the loop so the cards either side of the seam tilt correctly.
      // This is Embla's own pattern for tweening across a looped boundary.
      engine.slideLooper.loopPoints.forEach((point) => {
        if (point.index !== i) return;
        const target = point.target();
        if (target === 0) return;
        diff = Math.sign(target) === -1 ? snap - (1 + progress) : snap + (1 - progress);
      });

      const d = Math.max(-1.6, Math.min(1.6, diff * snaps.length * 0.55));
      const el = slideRefs.current[i];
      if (!el) return;
      el.style.transform = `translateY(${Math.abs(d) * 10}px) rotate(${d * 3.2}deg) scale(${1 - Math.abs(d) * 0.08})`;
      el.style.opacity = `${Math.max(0.35, 1 - Math.abs(d) * 0.35)}`;
      el.style.zIndex = `${100 - Math.round(Math.abs(d) * 100)}`;
    });
  }, [embla, reduced]);

  useEffect(() => {
    if (!embla) return;
    shape();
    embla.on('scroll', shape).on('reInit', shape);
    return () => {
      embla.off('scroll', shape).off('reInit', shape);
    };
  }, [embla, shape]);

  // Idle drift. Cancelled by any interaction, resumed after a pause.
  useEffect(() => {
    if (!embla || reduced) return;

    const pause = () => {
      idleUntil.current = performance.now() + 3500;
    };
    embla.on('pointerDown', pause);
    const root = embla.rootNode();
    root.addEventListener('wheel', pause, { passive: true });

    let frame = 0;
    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      if (now < idleUntil.current || open !== null) return;
      if (document.hidden) return;
      const engine = embla.internalEngine();
      engine.location.add(-0.35);
      engine.target.set(engine.location);
      engine.scrollLooper.loop(-1);
      engine.slideLooper.loop();
      engine.translate.to(engine.location.get());
      shape();
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      embla.off('pointerDown', pause);
      root.removeEventListener('wheel', pause);
    };
  }, [embla, reduced, open, shape]);

  const move = useCallback((delta: number) => {
    setOpen((current) => {
      if (current === null) return current;
      const next = (current + delta + deck.slides.length) % deck.slides.length;
      return next;
    });
  }, []);

  const renderCard = (slide: DeckSlide, i: number) => (
    <div
      key={slide.id}
      className="min-w-0 flex-[0_0_72%] px-2 sm:flex-[0_0_46%] lg:flex-[0_0_30%]"
    >
      <div
        ref={(el) => {
          slideRefs.current[i] = el;
        }}
        className="will-change-transform"
        style={{ transition: reduced ? undefined : 'opacity 120ms linear' }}
      >
        <button
          type="button"
          onClick={() => setOpen(i)}
          aria-label={`${slide.alt}. ${deck.readerHint}`}
          className="group block w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-md transition-shadow duration-300 hover:shadow-xl active:scale-[0.98] motion-safe:transition-transform"
        >
          <img
            src={card(slide.id)}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="aspect-[16/9] w-full object-cover"
          />
          <span className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            {deckTitle(slide.deck)}
            <span className="text-primary opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              {deck.readerHint}
            </span>
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <section id={deck.id} className="overflow-hidden bg-muted/30 py-12 md:py-20 scroll-mt-16">
      <div className="container-width">
        <div className="mb-5 px-5 md:mb-10 md:px-0 md:text-center">
          <p className="mobile-eyebrow mb-2 md:hidden">{deck.eyebrow}</p>
          <h2 className="mobile-h2 md:headline-lg md:mb-4">{pick(deck.title, 'desktop')}</h2>
          <p className="mobile-body mt-2 text-muted-foreground md:body-lg md:mx-auto md:mt-0 md:max-w-2xl">
            {pick(deck.sub, 'desktop')}
          </p>
        </div>
      </div>

      {/* Full-bleed: the deck should run off both edges. */}
      <div className="cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y py-5">
          {deck.slides.map(renderCard)}
        </div>
      </div>

      {open !== null && <Reader index={open} onClose={() => setOpen(null)} onMove={move} />}
    </section>
  );
};

export default SlideDeck;
