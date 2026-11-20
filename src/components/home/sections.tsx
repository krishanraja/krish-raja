import { useEffect, useRef, useState, type CSSProperties } from 'react';
import BlockTitle from './BlockTitle';
import { ArrowUpRight } from 'lucide-react';
import { appearances, hero, home, lessons, operate, type ChannelItem } from '@/content';
import { asset } from '@/lib/asset-map';
import { useMobileViewportHeight } from '@/hooks/use-mobile';
import { sectionIdForPath } from '@/hooks/use-land-on-section';
import AttendeeStrip from '@/components/AttendeeStrip';
import { Btn } from './shared';
import { useAsk } from './EnquiryDialog';
import { isAhead, shortDate } from '@/lib/upcoming';
import { HeroRoutes } from './HeroRoutes';
import { routeCopy } from '@/content/hero-routes';
import { PortraitStage } from './PortraitStage';
import { speakerProfile } from '@/content/discovery';

type Tree = { mobile: boolean };
const d = (ms: number): CSSProperties => ({ ['--d' as string]: `${ms}ms` });
/* ------------------------------------------------------------------ hero */

const TrustStrip = () => (
  <div className="h-exp" data-trust-strip>
    <span className="h-label">{hero.trustLabel}</span>
    <ul>
      {hero.trustLogos.map((l) => (
        <li key={l.alt}><img src={asset(l.asset)} alt={l.alt} /></li>
      ))}
    </ul>
  </div>
);

const HeroLead = () => (
  <p className="mp-sub">
    <span className="mp-context">{operate.titleParts[0]}</span>
    <span className="mp-promise">{operate.titleParts[1]}</span>
  </p>
);

export const HomeHero = ({ mobile }: Tree) => {
  const enquire = useAsk();
  const brainHash = '#' + operate.id;
  const [brainOpen, setBrainOpen] = useState(() =>
    window.location.hash === brainHash || (!window.location.hash && sectionIdForPath(window.location.pathname) === operate.id));
  useEffect(() => {
    const followHash = () => { if (window.location.hash === brainHash) setBrainOpen(true); };
    const followLink = (event: MouseEvent) => {
      if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
          (event.target as Element | null)?.closest?.('a')?.getAttribute('href') === brainHash) setBrainOpen(true);
    };
    window.addEventListener('hashchange', followHash);
    document.addEventListener('click', followLink);
    return () => {
      window.removeEventListener('hashchange', followHash);
      document.removeEventListener('click', followLink);
    };
  }, [brainHash]);
  const screen = useMobileViewportHeight();
  const fill = mobile && screen > 0 ? {
    minHeight: `min(calc(${screen}px - var(--mobile-dock-h, 63px)), 940px)`,
    '--cover-height': Math.round(Math.min(406, Math.max(158, 198 + (screen - 568) * .59))) + 'px',
  } as CSSProperties : undefined;
  return (
    <section id="hero" className="h-hero mp-hero" data-brain-open={brainOpen || undefined} data-short={mobile && screen < 690 || undefined} data-compact={mobile && screen < 780 || undefined}>
      <div className="shell grid mp-layout" style={fill}>
        <div className="copy mp-copy">
          {mobile ? <PortraitStage mobile open={brainOpen} onChange={setBrainOpen}/> : <h1 className="h-h1 mp-h1">{hero.h1}</h1>}
          <div className="mp-decision">
            <HeroLead />
            <span className="mp-bridge" aria-hidden="true" />
            <HeroRoutes onOngoing={() => enquire('ongoing')}/>
          </div>
          <TrustStrip/>
        </div>
        {!mobile && <PortraitStage mobile={false} open={brainOpen} onChange={setBrainOpen}/>}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ three ways in */

export const WaysIn = ({ mobile }: Tree) => {
  const ask = useAsk();
  const p = home.practice;
  return (
    <section id={p.id} className="h-sec">
      <div className="shell">
        <div className="h-sec-head">
          <BlockTitle className="h-h2 h-h2--two" text={p.title} />
          <div className="engagement-fit h-r" style={d(120)}>
            <div className="engagement-qualities">
              <span id="engagement-fit-label">{p.fit.lead}</span>
              <ul aria-labelledby="engagement-fit-label">
                {p.fit.traits.map(trait => <li key={trait}>{trait}</li>)}
              </ul>
            </div>
            <p>{p.fit.close}</p>
          </div>
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
                {o.line && <p className="line">{o.id === 'speaking'
                  ? <a className="inline-flex min-h-11 items-center underline underline-offset-4" href={speakerProfile.path}>AI keynote talks and speaking footage</a>
                  : o.line}</p>}
                <div className="h-acts">
                  {o.href
                    ? <Btn label={o.cta} href={o.href} external tone={o.id === 'channel' ? 'mint' : 'dark'} />
                    : <Btn label={o.cta} onClick={() => ask('speaking')} />}
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
  const enquire = useAsk();
  // The next session, once Krish has announced it in src/content/lessons.ts.
  // Read on mount, so it never shows after it has started.
  const [next] = useState(() => (isAhead(lessons.upcoming, Date.now()) ? lessons.upcoming : null));
  return (
    <section id={lessons.id} className="h-sec h-sessions mr-sessions">
      <div className="shell">
        <div className="h-sec-head">
          <h2 className="h-h2" tabIndex={-1}>{lessons.title}</h2>
          <p className="h-lede h-r" style={d(120)}>{lessons.sub}</p>
        </div>
        <div className="wrap">
          <div>
            {mobile && <div className="mr-session-cta"><Btn label={routeCopy.contact} onClick={() => enquire('immersion')} /></div>}
            <ol className={`h-setlist${next ? ' has-next' : ''}`}>
              {next && (
                <li className="h-r next">
                  <a href={next.link} target="_blank" rel="noopener noreferrer">
                    <time className="n" dateTime={next.startDate}>{shortDate(next)}</time>
                    <div><h3>{next.title}</h3>{next.description && <p>{next.description}</p>}</div>
                    <span className="go"><ArrowUpRight aria-hidden /></span>
                  </a>
                </li>
              )}
              {lessons.lessons.map((l, i) => (
                <li key={l.link} className="h-r" style={d((i + (next ? 1 : 0)) * 70)}>
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
            <aside className="mr-session-card" aria-label={routeCopy.immersion}>
              <img src="/media/home/stage.jpg" loading="lazy" alt="" />
              <div><h3>{routeCopy.sessionInvite}</h3><p>{routeCopy.sessionLine}</p>
                <Btn label={routeCopy.contact} tone="white" onClick={() => enquire('immersion')} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};
