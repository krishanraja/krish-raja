import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
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

/* ------------------------------------------------------------------ enquiry form */

const AskCtx = createContext<() => void>(() => {});
export const useAsk = () => useContext(AskCtx);

/**
 * "Get in touch" and "Book an immersion session" open this. It writes an email
 * to the published address and opens the reader's mail app. It never pretends
 * to have sent anything: there is no server here to send it.
 */
export const AskProvider = ({ children, centered }: { children: ReactNode; centered: boolean }) => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const last = useRef<HTMLElement | null>(null);
  const first = useRef<HTMLInputElement>(null);
  const ask = home.ask;

  const show = useCallback(() => { last.current = document.activeElement as HTMLElement; setSent(false); setOpen(true); }, []);
  const close = useCallback(() => { setOpen(false); last.current?.focus?.(); }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    first.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    addEventListener('keydown', key);
    return () => { removeEventListener('keydown', key); document.documentElement.style.removeProperty('overflow'); };
  }, [open, close]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim(), ev = String(f.get('event') || '').trim();
    if (!name || !ev) { (e.currentTarget.querySelector(name ? '[name=event]' : '[name=name]') as HTMLInputElement)?.focus(); return; }
    const body = [`${ask.fields.name}: ${name}`, `${ask.fields.event}: ${ev}`, `${ask.fields.when}: ${f.get('when') || ''}`, '', String(f.get('msg') || '')].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(ask.subjectPrefix + ev)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <AskCtx.Provider value={show}>
      {children}
      {open && (
        <div className={`h-modal${centered ? ' center' : ''}`} role="dialog" aria-modal="true" aria-labelledby="h-ask-t" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="pnl">
            <button type="button" className="x" aria-label={ask.close} onClick={close}><X className="w-4 h-4" /></button>
            {!sent ? (
              <>
                <h2 id="h-ask-t">{ask.title}</h2>
                <form onSubmit={submit} noValidate>
                  <label><span>{ask.fields.name}</span><input ref={first} name="name" autoComplete="name" required placeholder={ask.fields.namePlaceholder} /></label>
                  <label><span>{ask.fields.event}</span><input name="event" required placeholder={ask.fields.eventPlaceholder} /></label>
                  <label><span>{ask.fields.when}</span><input name="when" placeholder={ask.fields.whenPlaceholder} /></label>
                  <label><span>{ask.fields.message}</span><textarea name="msg" rows={4} placeholder={ask.fields.messagePlaceholder} /></label>
                  <p className="note">{ask.note} <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
                  <div className="h-acts"><button type="submit" className="h-btn h-btn--dark">{ask.submit}<span className="h-badge"><ArrowUpRight className="h-ur-arrow" aria-hidden /></span></button></div>
                </form>
              </>
            ) : (
              <div className="ok">
                <h2 id="h-ask-t" style={{ paddingRight: 0, marginBottom: 0 }}>{ask.sentTitle}</h2>
                <p>{ask.sentBody} <a href={`mailto:${site.email}`}>{site.email}</a> {ask.sentOr} <a href={site.links.calendly} target="_blank" rel="noopener noreferrer">{ask.sentCall}</a>.</p>
                <button type="button" className="h-btn h-btn--dark" style={{ padding: '0 1.375rem', justifyContent: 'center' }} onClick={close}>{ask.close}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </AskCtx.Provider>
  );
};
