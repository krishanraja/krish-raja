import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronRight, Pause, Play } from 'lucide-react';
import { heroRoutes, routeCopy, type HeroRoute } from '@/content/hero-routes';

const interval = 6500;
const last = heroRoutes.length;
const wrap = (index: number) => (index + last) % last;

function RouteArt({ id }: { id: HeroRoute['id'] }) {
  if (id === 'audit') return (
    <span className="mr-art mr-audit" aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none">
        <g className="mr-rings">
          <path d="M50 8 86 29v42L50 92 14 71V29Z M50 22 74 36v28L50 78 26 64V36Z M50 36l12 7v14l-12 7-12-7V43Z"/>
          <path d="M50 8v84M14 29l72 42M14 71l72-42" opacity=".65"/>
        </g>
        <path className="mr-signal" d="m50 14 26 19 8 36-34 5-29-9 7-27Z"/>
        <g fill="currentColor"><circle cx="50" cy="14" r="2.6"/><circle cx="84" cy="69" r="2.6"/><circle cx="21" cy="65" r="2.6"/></g>
      </svg>
    </span>
  );
  if (id === 'modules') return (
    <span className="mr-art mr-modules" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none">
      <rect className="mr-rings" x="15" y="54" width="52" height="25" rx="5"/>
      <rect className="mr-rings" x="24" y="38" width="52" height="25" rx="5"/>
      <rect className="mr-signal" x="33" y="22" width="52" height="25" rx="5"/>
      <path d="M42 30h22m-22 7h12" stroke="currentColor" strokeWidth="2"/>
    </svg></span>
  );
  if (id === 'ongoing') return (
    <span className="mr-art mr-ongoing" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none">
      <circle className="mr-rings" strokeWidth="3" cx="39" cy="50" r="23"/><circle className="mr-signal" cx="61" cy="50" r="23"/>
      <path d="M28 50h17m11 0h17" stroke="currentColor" strokeWidth="2"/>
    </svg></span>
  );
  const pictures = {
    media: '/media/home/mymu-robot.webp', immersion: '/media/home/stage.jpg',
    sprint: '/media/home/mindmake-engine.webp'
  };
  return <span className={'mr-art mr-photo mr-' + id} aria-hidden="true"><img src={pictures[id]} alt="" /></span>;
}

function RouteTarget({ route, children, className, onOngoing, onPreview, featured = false }: {
  route: HeroRoute; children: ReactNode; className: string; onOngoing: () => void; onPreview?: () => void; featured?: boolean;
}) {
  const props = {
    className, 'aria-label': route.title + ', ' + route.detail, 'data-route': route.id,
    onFocus: onPreview,
    onPointerEnter: (event: React.PointerEvent) => { if (event.pointerType === 'mouse') onPreview?.(); },
  };
  if (!route.href) return <button {...props} type="button" aria-haspopup="dialog" onClick={onOngoing}>{children}</button>;
  const external = route.href.startsWith('https:');
  return <a {...props} href={route.href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    onClick={!external ? () => requestAnimationFrame(() => document.querySelector<HTMLElement>('#lightning-lessons h2')?.focus({ preventScroll: true })) : undefined}
    data-featured={featured || undefined}>{children}</a>;
}

export function HeroRoutes({ onOngoing }: { onOngoing: () => void }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [foreground, setForeground] = useState(!document.hidden);
  const [reduce, setReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [announcement, setAnnouncement] = useState('');
  const root = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const ignoreClickUntil = useRef(0);
  const route = heroRoutes[current];

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduce(mq.matches);
    const visibility = () => setForeground(!document.hidden);
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .45 });
    if (root.current) io.observe(root.current);
    mq.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    return () => { mq.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (paused || hovered || reduce || !visible || !foreground) return;
    const timer = window.setTimeout(() => setCurrent(i => wrap(i + 1)), interval);
    return () => clearTimeout(timer);
  }, [current, paused, hovered, reduce, visible, foreground]);

  function step(delta: number) {
    const index = wrap(current + delta);
    setCurrent(index);
    setPaused(true);
    setAnnouncement(heroRoutes[index].title + ', ' + heroRoutes[index].detail);
  }
  function focus(event: FocusEvent<HTMLElement>) {
    // The transport button handles its own click, including keyboard activation.
    if ((event.target as HTMLElement).matches(':focus-visible') && !(event.target as HTMLElement).closest('[data-transport="play"]')) setPaused(true);
  }
  function openOngoing() {
    setPaused(true);
    onOngoing();
  }
  const Arrow = route.id === 'immersion' ? ArrowDown : route.id === 'ongoing' ? ArrowRight : ArrowUpRight;
  const stop = reduce || paused;
  return (
    <section ref={root} className="mr-route" aria-label={routeCopy.region} data-current={route.id}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') setHovered(false); }}
      onFocusCapture={focus}
      onKeyDown={e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const delta = e.key === 'ArrowRight' ? 1 : -1;
        const indexLink = (e.target as HTMLElement).closest('.mr-index');
        const mainLink = (e.target as HTMLElement).closest('.mr-mainlink');
        step(delta);
        if (indexLink) {
          root.current?.querySelector<HTMLElement>('.mr-index[data-route="' + heroRoutes[wrap(current + delta)].id + '"]')?.focus();
        } else if (mainLink) {
          requestAnimationFrame(() => root.current?.querySelector<HTMLElement>('.mr-mainlink')?.focus());
        }
      }}>
      <div className="mr-feature"
        onTouchStart={e => { const t=e.changedTouches[0]; touch.current={x:t.clientX,y:t.clientY}; }}
        onTouchEnd={e => {
          if (!touch.current) return;
          const t=e.changedTouches[0], dx=t.clientX-touch.current.x, dy=t.clientY-touch.current.y; touch.current=null;
          if (Math.abs(dx)>38 && Math.abs(dx)>Math.abs(dy)*1.45) { ignoreClickUntil.current=performance.now()+500; step(dx<0?1:-1); }
        }}
        onTouchCancel={() => { touch.current=null; }}
        onClickCapture={e => { if(performance.now()<ignoreClickUntil.current) { e.preventDefault(); e.stopPropagation(); } }}>
        <RouteTarget route={route} className="mr-mainlink" onOngoing={openOngoing} featured>
          <span className="mr-window"><span key={route.id} className="mr-slide"><RouteArt id={route.id} />
            <span className="mr-copy"><span className="mr-detail">{route.detail}</span><span className="mr-title">{route.title}</span></span>
          </span></span>
          <span className="mr-go"><Arrow aria-hidden="true" /></span>
        </RouteTarget>
      </div>
      <div className="mr-lower">
        <nav className="mr-links" aria-label={routeCopy.links}>
          {heroRoutes.map((item, index) =>
            <RouteTarget key={item.id} route={item} className={'mr-index' + (index === current?' mr-current':'')}
              onOngoing={openOngoing} onPreview={() => setCurrent(index)}>
              <span>{item.short}</span>
            </RouteTarget>)}
        </nav>
        <div className="mr-controls">
          {!reduce && <button type="button" data-transport="play" title={stop?routeCopy.play:routeCopy.pause} aria-label={stop?routeCopy.play:routeCopy.pause}
            onClick={() => setPaused(p => !p)}>{stop ? <Play aria-hidden="true"/> : <Pause aria-hidden="true"/>}</button>}
          <button type="button" title={routeCopy.next} aria-label={routeCopy.next} onClick={() => step(1)}><ChevronRight aria-hidden="true"/></button>
        </div>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
    </section>
  );
}
