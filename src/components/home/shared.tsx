import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { home, site } from '@/content';

/* ------------------------------------------------------------------ buttons */

type Tone = 'dark' | 'white' | 'mint' | 'accent' | 'outline';

/** The one button anatomy: label, then a round badge with an arrow. */
export const Btn = ({
  label, tone = 'dark', href, onClick, external, className = '',
}: { label: string; tone?: Tone; href?: string; onClick?: () => void; external?: boolean; className?: string }) => {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      {label}
      <span className="h-badge"><Arrow className={external ? 'h-ur-arrow' : 'h-r-arrow'} aria-hidden /></span>
    </>
  );
  const cls = `h-btn h-btn--${tone} ${className}`;
  if (href) {
    return (
      <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
    );
  }
  return <button type="button" className={cls} onClick={onClick}>{inner}</button>;
};

/* ------------------------------------------------------------------ reveals */

/** Adds `.in` to every `.h-r` under the page once it scrolls into view. Starts after the loader. */
export const useReveals = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -6% 0px' },
    );
    const watch = () => document.querySelectorAll('.h-r:not(.in), .h-blk:not(.in)').forEach((el) => io.observe(el));
    watch();
    // Late content (the live feed, the deck) mounts after the first pass.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [enabled]);
};

/* ------------------------------------------------------------------ loader */

const seen = () => { try { return sessionStorage.getItem('kr-loaded') === '1'; } catch { return false; } };

/**
 * The intro: Bitmoji, name, "Your AI Chief of Staff.", a 000 to 100 count, then
 * it slides away. Once per browser session, so a reader moving between section
 * addresses (/thinking, /live) is not made to wait twice.
 */
export const PageLoader = ({ onDone }: { onDone: () => void }) => {
  const [p, setP] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(() => seen());
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (gone) { done.current(); return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FILL = reduce ? 1 : 1300, t0 = performance.now();
    const ease = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let raf = 0, timer = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / FILL);
      setP(Math.round(ease(t) * 100));
      if (t < 1) { raf = requestAnimationFrame(step); return; }
      setOut(true);
      timer = window.setTimeout(() => {
        try { sessionStorage.setItem('kr-loaded', '1'); } catch { /* private mode */ }
        setGone(true); done.current();
      }, reduce ? 0 : 750);
    };
    document.documentElement.style.overflow = 'hidden';
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); document.documentElement.style.removeProperty('overflow'); };
  }, [gone]);

  useEffect(() => { if (gone) document.documentElement.style.removeProperty('overflow'); }, [gone]);
  if (gone) return null;
  return (
    <div className={`h-loader${out ? ' out' : ''}`} role="status" aria-label={home.loader.label}>
      <div className="c">
        <img className="bm" src={home.bitmoji} alt="" width={96} height={96} />
        <div className="name">{site.name}</div>
        <p className="tag">{home.loader.tagline}</p>
      </div>
      <div className="p">
        <div className="t"><div className="f" style={{ width: `${p}%` }} /></div>
        <div className="row"><span>{home.loader.label}</span><span>{String(p).padStart(3, '0')}</span></div>
      </div>
    </div>
  );
};
