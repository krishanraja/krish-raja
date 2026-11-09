import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { appearances, contact, hero, home, lessons, operate, site, type ChannelItem } from '@/content';
import { asset } from '@/lib/asset-map';
import { useMobileViewportHeight } from '@/hooks/use-mobile';
import AttendeeStrip from '@/components/AttendeeStrip';
import BrainBloom from './BrainBloom';
import { Btn, useAsk } from './shared';

type Tree = { mobile: boolean };
const d = (ms: number): CSSProperties => ({ ['--d' as string]: `${ms}ms` });
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
  const fill = mobile && screen > 0 ? { minHeight: `min(calc(${screen}px - var(--mobile-dock-h, 63px)), 940px)` } : undefined;
  return (
    <section id="hero" className="h-hero">
      <div className="shell grid" style={fill}>
        <div className="copy" style={mobile ? { flex: 1, justifyContent: 'space-between' } : undefined}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 className="h-h1">{hero.h1}</h1>
            <div className="h-sub h-r" style={d(450)}>
              <b>{operate.title}</b>
              {/* On a short phone (an SE is 568px) the paragraph would push the logos
                  under the dock; the brain screen right below carries the same idea. */}
              {!(mobile && screen > 0 && screen < 700) && <p>{operate.sub}</p>}
            </div>
            <div className="h-acts h-r" style={d(600)}>
              <Btn label={hero.primaryCta} onClick={ask} />
              <Btn label={hero.secondaryCta} tone="outline" href={hero.secondaryHref} />
            </div>
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
  const channel = home.channel;
  return (
    <section id={p.id} className="h-sec">
      <div className="shell">
        <div className="h-sec-head">
          <h2 className="h-h2 h-r">{p.title}</h2>
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
                {o.series ? (
                  <div className="h-series">{channel.series.map((s) => <span key={s.name}>{s.name} &middot; {s.day}</span>)}</div>
                ) : (
                  <p className="line">{o.line}</p>
                )}
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

const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

const Episode = ({ it, lead }: { it: ChannelItem; lead: boolean }) => (
  <a className={`h-ep${lead ? ' lead' : ' row'}`} href={it.link} target="_blank" rel="noopener noreferrer">
    <div className="shot">
      {it.video && (
        <img src={`https://i.ytimg.com/vi/${it.video}/maxresdefault.jpg`} alt="" loading="lazy"
          // YouTube answers a missing maxres with a 120px grey placeholder, not an error.
          onLoad={(e) => { const img = e.currentTarget; if (img.naturalWidth <= 120) img.src = `https://i.ytimg.com/vi/${it.video}/hqdefault.jpg`; }}
          onError={(e) => { const img = e.currentTarget; if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${it.video}/hqdefault.jpg`; }} />
      )}
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
            <div className="h-series">{c.series.map((s) => <span key={s.name}>{s.name} &middot; {s.day}</span>)}</div>
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
  const items = appearances.items.filter((a) => a.thumb || a.media);
  return (
    <section id={appearances.id} className="h-sec" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="h-sec-head">
          <h2 className="h-h2 h-r">{appearances.title}</h2>
          <p className="h-lede h-r" style={d(120)}>{appearances.sub}</p>
        </div>
        <div className="h-choices" role="group" aria-label={appearances.title}>
          {home.wallFilters.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>
        {/* Filtering never removes a card: matches move to the front and the rest fade back.
            Same count, same size, so nothing under the wall moves. */}
        <ul className={`h-wall${mobile ? ' h-rail narrow mobile-snap-track' : ''}`}>
          {items.map((a) => {
            const on = filter === 'all' || a.kind === filter;
            const src = a.thumb ? `/media/thumbs/${a.thumb}.webp` : a.media;
            return (
              <li key={a.appearanceId ?? a.title} className={on ? '' : 'dim'} style={{ order: on ? 0 : 1 }}>
                <a className="h-piece" href={a.href} target="_blank" rel="noopener noreferrer" tabIndex={on ? 0 : -1}>
                  <div className="shot"><img src={src} alt="" loading="lazy" /></div>
                  <h3>{a.title}</h3>
                  <p>{a.outlet}{a.year ? ` · ${a.year}` : ''}</p>
                </a>
              </li>
            );
          })}
        </ul>
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
          <h2 className="h-h2 h-r">{lessons.title}</h2>
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
