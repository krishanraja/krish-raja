import { useEffect, useRef, useState, type CSSProperties } from 'react';
import BlockTitle from './BlockTitle';
import { ArrowUpRight } from 'lucide-react';
import { appearances, contact, hero, home, lessons, operate, site, type ChannelItem } from '@/content';
import { asset } from '@/lib/asset-map';
import { useMobileViewportHeight } from '@/hooks/use-mobile';
import AttendeeStrip from '@/components/AttendeeStrip';
import BrainBloom from './BrainBloom';
import { Btn, useAsk } from './shared';

type Tree = { mobile: boolean };
const d = (ms: number): CSSProperties => ({ ['--d' as string]: `${ms}ms` });
/** Timing for a BlockTitle wipe: start delay, one sweep, gap between lines. */
const wipe = (delay: number, dur: number, stagger = 110): CSSProperties =>
  ({ ['--blk-d' as string]: `${delay}ms`, ['--blk-dur' as string]: `${dur}ms`, ['--blk-st' as string]: `${stagger}ms` });
/* ------------------------------------------------------------------ hero */

const TrustStrip = () => (
  <div className="h-exp h-r" style={d(850)} data-trust-strip>
    <span className="h-label">{hero.trustLabel}</span>
    <ul>
      {hero.trustLogos.map((l) => (
        <li key={l.alt}><img src={asset(l.asset)} alt={l.alt} /></li>
      ))}
    </ul>
  </div>
);

export const HomeHero = ({ mobile }: Tree) => {
  const ask = useAsk();
  // Mobile: exactly one screen, trust logos at the foot, the brain on the next screen.
  const screen = useMobileViewportHeight();
  const fit = operate.fit;
  const roomy = !(mobile && screen > 0 && screen < 700);
  const fill = mobile && screen > 0 ? { minHeight: `min(calc(${screen}px - var(--mobile-dock-h, 63px)), 940px)` } : undefined;
  return (
    <section id="hero" className="h-hero">
      <div className="shell grid" style={fill}>
        <div className="copy" style={mobile ? { flex: 1 } : undefined}>
          {/* On a tall phone the screen has more height than the copy. The slack is split
              above and below the copy (auto margins), not left as one hole over the logos. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBlock: mobile ? 'auto' : undefined }}>
            <BlockTitle as="h1" className="h-h1" text={hero.h1} />
            <div className="h-sub h-r" style={d(450)}>
              <b>{operate.title}</b>
            </div>
            {/* On a short phone (an SE is 568px) the fit copy would push the logos
                under the dock; the brain screen right below carries the same idea. */}
            {roomy && (
              <div className="h-fit">
                <p className="lead h-r" style={d(550)}>{fit.lead}</p>
                <ul>
                  {fit.traits.map((t, i) => (
                    <li key={t} style={wipe(750 + i * 140, 380)}>
                      <BlockTitle as="span" text={t} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="h-acts h-r" style={d(700)}>
              <Btn label={hero.primaryCta} onClick={ask} />
              <Btn label={hero.secondaryCta} tone="outline" href={hero.secondaryHref} />
            </div>
            {roomy && <BlockTitle as="p" className="h-close" text={fit.close} style={wipe(1450, 420, 90)} />}
          </div>
          <TrustStrip />
        </div>
        {!mobile && (
          <section id="how-i-operate" className="brain-col h-r" style={{ ...d(300), ['--y' as string]: '24px' }} aria-label={operate.title}>
            <BrainBloom narrow={false} />
          </section>
        )}
      </div>
    </section>
  );
};

/** Mobile only: the brain gets its own screen under the hero. */
export const BrainSection = () => (
  <section id="how-i-operate" className="h-sec h-brain-sec" aria-label={operate.title} style={{ paddingTop: '1.5rem' }}>
    <div className="shell h-r"><BrainBloom narrow /></div>
  </section>
);

/* ------------------------------------------------------------------ three ways in */

export const WaysIn = ({ mobile }: Tree) => {
  const ask = useAsk();
  const p = home.practice;
  return (
    <section id={p.id} className="h-sec">
      <div className="shell">
        <div className="h-sec-head">
          <BlockTitle className="h-h2 h-h2--two" text={p.title} />
          <p className="h-lede h-r" style={d(120)}>{p.sub}</p>
        </div>
        <div className={`h-opts${mobile ? ' h-rail mobile-snap-track' : ''}`}>
          {p.options.map((o, i) => (
            <article key={o.id} className={`h-opt h-r${o.tone === 'dark' ? ' dark' : ''}${o.wordmark ? '' : ' plain'}`} data-id={o.id} style={d(i * 90)}>
              <div className="head">
                {o.video ? <OnScreenVideo src={o.video} poster={o.image} /> : <img className="bg" src={o.image} alt="" loading="lazy" />}
                {o.wordmark && <span className="mk"><img src={o.wordmark} alt={o.wordmarkAlt ?? ''} /></span>}
              </div>
              <div className="body">
                <span className="h-label">{o.label}</span>
                <h3>{o.title}</h3>
                {o.line && <p className="line">{o.line}</p>}
                <div className="h-acts">
                  {o.href
                    ? <Btn label={o.cta} href={o.href} external tone={o.id === 'channel' ? 'mint' : 'dark'} />
                    : <Btn label={o.cta} onClick={ask} />}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="h-swipe">{home.swipeHint} &rarr;</p>
      </div>
    </section>
  );
};

/** A muted loop that plays only while on screen, and never under reduced motion. */
const OnScreenVideo = ({ src, poster }: { src: string; poster: string }) => {
  const [el, setEl] = useState<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!el.getAttribute('src')) el.src = src; el.play().catch(() => {}); } else el.pause();
    }, { threshold: .2 });
    io.observe(el);
    return () => io.disconnect();
  }, [el, src]);
  return <video ref={setEl} className="bg" muted loop playsInline preload="none" poster={poster} aria-hidden />;
};

/* ------------------------------------------------------------------ live channel */

const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

const Episode = ({ it, lead }: { it: ChannelItem; lead: boolean }) => (
  <a className={`h-ep${lead ? ' lead' : ' row'}`} href={it.link} target="_blank" rel="noopener noreferrer">
    <div className="shot">
      {it.video ? (
        <img src={`https://i.ytimg.com/vi/${it.video}/maxresdefault.jpg`} alt="" loading="lazy"
          // YouTube answers a missing maxres with a 120px grey placeholder, not an error.
          onLoad={(e) => { const img = e.currentTarget; if (img.naturalWidth <= 120) img.src = `https://i.ytimg.com/vi/${it.video}/hqdefault.jpg`; }}
          onError={(e) => { const img = e.currentTarget; if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${it.video}/hqdefault.jpg`; }} />
      ) : it.image ? <img src={it.image} alt="" loading="lazy" /> : null}
    </div>
    <div className="meta h-meta"><span>{fmtDate(it.date)}{it.series ? ` · ${it.series}` : ''}</span>{lead && it.format ? <span>{it.format}</span> : null}</div>
    <h3>{it.title}</h3>
  </a>
);

export const Channel = ({ mobile }: Tree) => {
  const c = home.channel;
  const [items, setItems] = useState<readonly ChannelItem[]>(c.snapshot);
  useEffect(() => {
    let live = true;
    fetch('/api/live').then((r) => (r.ok ? r.json() : null)).then((j) => { if (live && Array.isArray(j) && j.length >= 4) setItems(j); }).catch(() => {});
    return () => { live = false; };
  }, []);
  const four = items.slice(0, 4);
  return (
    <section id={c.id} className="h-sec" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="h-live h-dark h-r">
          <div className="mast">
            <div style={{ minWidth: 0 }}>
              <h2 style={{ margin: 0 }}><img src={c.wordmark} alt={c.title} /></h2>
              <p className="tag">{c.sub}</p>
            </div>
          </div>
          <div className={`h-feed${mobile ? ' h-rail mobile-snap-track' : ''}`}>
            {four[0] && <Episode it={four[0]} lead />}
            <div className="rest">{four.slice(1).map((it) => <Episode key={it.link} it={it} lead={false} />)}</div>
          </div>
          <p className="h-swipe">{home.swipeHint} &rarr;</p>
          <div className="foot">
            <span className="stamp h-meta">{c.snapshotLabel}</span>
            <div className="h-acts">
              <Btn label={c.subscribe.label} href={c.subscribe.href} external tone="mint" />
              <Btn label={c.youtube.label} href={c.youtube.href} external tone="outline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ in public */

export const InPublic = ({ mobile }: Tree) => {
  const [filter, setFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  const [cols, setCols] = useState(0);
  const [wall, setWall] = useState<HTMLUListElement | null>(null);
  const head = useRef<HTMLDivElement>(null);
  // Desktop shows two full rows; the column count comes from the grid itself, so the
  // last visible row is always complete at any width.
  useEffect(() => {
    if (mobile || !wall) return;
    const measure = () => setCols(getComputedStyle(wall).gridTemplateColumns.split(' ').filter(Boolean).length);
    const ro = new ResizeObserver(measure);
    ro.observe(wall);
    measure();
    return () => ro.disconnect();
  }, [mobile, wall]);
  const all = appearances.items.filter((a) => a.thumb || a.media);
  // Filtering never removes a card: matches move to the front and the rest fade back.
  // Same count, same size, so nothing under the wall moves.
  const match = (a: (typeof all)[number]) => filter === 'all' || a.kind === filter;
  const items = [...all.filter(match), ...all.filter((a) => !match(a))];
  const limit = mobile || open ? items.length : cols ? cols * 2 : appearances.previewCount;
  const hidden = items.length - limit;
  const toggle = () => {
    if (open) head.current?.scrollIntoView({ block: 'start' });
    setOpen(!open);
  };
  return (
    <section id={appearances.id} className="h-sec" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="h-sec-head" ref={head} style={{ scrollMarginTop: '5rem' }}>
          <BlockTitle className="h-h2" text={appearances.title} />
          <p className="h-lede h-r" style={d(120)}>{appearances.sub}</p>
        </div>
        <div className="h-choices" role="group" aria-label={appearances.title}>
          {home.wallFilters.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>
        <ul ref={setWall} className={`h-wall${mobile ? ' h-rail narrow mobile-snap-track' : ''}`}>
          {items.slice(0, limit).map((a) => {
            const on = match(a);
            const src = a.thumb ? `/media/thumbs/${a.thumb}.webp` : a.media;
            return (
              <li key={a.appearanceId ?? a.title} className={on ? '' : 'dim'}>
                <a className="h-piece" href={a.href} target="_blank" rel="noopener noreferrer" tabIndex={on ? 0 : -1}>
                  <div className="shot"><img src={src} alt="" loading="lazy" /></div>
                  <h3>{a.title}</h3>
                  <p>{a.outlet}{a.year ? ` · ${a.year}` : ''}</p>
                </a>
              </li>
            );
          })}
        </ul>
        {!mobile && (open || hidden > 0) && (
          <div className="h-more">
            <Btn label={open ? appearances.lessLabel : `${appearances.moreLabel} (${hidden} more)`} tone="outline" onClick={toggle} />
          </div>
        )}
        <p className="h-swipe">{home.swipeHint} &rarr;</p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ sessions */

export const Sessions = ({ mobile }: Tree) => {
  const ask = useAsk();
  const email = contact.links.find((l) => l.href.startsWith('mailto:'));
  return (
    <section id={lessons.id} className="h-sec h-sessions" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="h-sec-head">
          <BlockTitle className="h-h2" text={lessons.title} />
          <p className="h-lede h-r" style={d(120)}>{lessons.sub}</p>
        </div>
        <div className="wrap">
          <div>
            <ol className="h-setlist">
              {lessons.lessons.map((l, i) => (
                <li key={l.link} className="h-r" style={d(i * 70)}>
                  <a href={l.link} target="_blank" rel="noopener noreferrer">
                    <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    <div><h3>{l.title}</h3><p>{l.description}</p></div>
                    <span className="go"><ArrowUpRight aria-hidden /></span>
                  </a>
                </li>
              ))}
            </ol>
            <AttendeeStrip compact={mobile} />
          </div>
          {!mobile && (
            <aside className="h-ask h-r" style={d(200)} aria-label={contact.title}>
              <h3>{contact.title}</h3>
              <p>{contact.sub}</p>
              <div className="h-acts"><Btn label={email?.action ?? contact.title} tone="accent" onClick={ask} /></div>
              <div className="h-acts"><Btn label={contact.links[contact.links.length - 1].action} tone="outline" href={site.links.calendly} external /></div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};
