import { useEffect, useRef, useState } from 'react';
import { home, operate, site } from '@/content';
import { asset } from '@/lib/asset-map';

/**
 * The brain: a viscous particle mass held in the shape of a brain, which sends
 * tendrils out, reconnects, and lights one part at a time. Each part is one of
 * the four pillars in operate.ts. Canvas plus an SVG goo filter, no libraries.
 *
 * Krish asked for it in place of the cursor photo reveal, after the Semantic
 * Bloom component on 21st.dev, in a brain shape. The description sits in a
 * box whose height is always the longest description, so choosing a part
 * never moves anything else on the page.
 */

// Lateral view in a 1000 x 820 box: frontal, parietal, occipital, temporal, cerebellum, stem.
const LOBES: [number, number, number][] = [[330, 380, 205], [535, 285, 195], [715, 375, 150], [485, 525, 150], [700, 585, 95]];
const STEM = [585, 668, 34, 88];
const FOLDS = [
  [250, 500, 380, 470, 520, 470, 660, 420], [560, 120, 520, 220, 540, 300, 470, 410],
  [200, 330, 260, 270, 330, 300, 380, 250], [210, 420, 280, 380, 320, 430, 400, 380],
  [640, 210, 700, 260, 660, 320, 740, 330], [800, 330, 780, 400, 840, 430, 820, 480],
  [420, 580, 470, 560, 520, 600, 580, 570], [640, 560, 690, 545, 730, 560, 770, 545],
  [640, 600, 690, 585, 730, 600, 770, 590], [650, 635, 690, 625, 720, 640, 750, 630],
];
/** Where each pillar sits on the brain, in pillar order: revenue, OS, taste, build. */
const ANCHORS: [number, number][] = [[470, 545], [545, 240], [290, 345], [745, 395]];

const inBrain = (x: number, y: number) =>
  LOBES.some(([cx, cy, r]) => (x - cx) ** 2 + (y - cy) ** 2 < r * r) ||
  ((x - STEM[0]) / STEM[2]) ** 2 + ((y - STEM[1]) / STEM[3]) ** 2 < 1;

interface P { x: number; y: number; vx: number; vy: number; hx: number; hy: number; ex: number; ey: number; r: number; ph: number; until: number }

const BrainBloom = ({ narrow, id }: { narrow: boolean; id?: string }) => {
  const box = useRef<HTMLDivElement>(null);
  const gooRef = useRef<HTMLCanvasElement>(null);
  const netRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const pinned = useRef(false);
  const activeRef = useRef(0);
  activeRef.current = active;
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const pickRef = useRef<(i: number) => void>(() => {});
  const pillars = operate.pillars;

  useEffect(() => {
    const root = box.current!, goo = gooRef.current!, net = netRef.current!;
    const g = goo.getContext('2d')!, n = net.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, s = 1, ox = 0, oy = 0;

    const N = 210, ps: P[] = [], floats: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const targets: [number, number][] = [];
    for (let tries = 0; targets.length < N; tries++) {
      const x = 120 + Math.random() * 780, y = 170 + Math.random() * 600;
      if (!inBrain(x, y)) continue;
      const gap = tries < 40000 ? 576 : 0;
      if (targets.every((t) => (t[0] - x) ** 2 + (t[1] - y) ** 2 > gap)) targets.push([x, y]);
    }
    targets.forEach(([x, y]) => ps.push({ x: x + (Math.random() - .5) * 600, y: y + (Math.random() - .5) * 600, vx: 0, vy: 0, hx: x, hy: y, ex: 0, ey: 0, r: 16 + Math.random() * 12, ph: Math.random() * 6.28, until: 0 }));
    for (let i = 0; i < 6; i++) floats.push({ x: Math.random() * 1000, y: Math.random() * 800, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .25, r: 10 + Math.random() * 16 });

    const size = () => {
      W = root.clientWidth; H = root.clientHeight;
      for (const c of [goo, net]) { c.width = W * dpr; c.height = H * dpr; c.style.width = `${W}px`; c.style.height = `${H}px`; }
      const reserve = narrow ? 215 : 0, top = narrow ? 56 : 0;
      s = Math.min(W / (narrow ? 900 : 1000), (H - reserve - top) / 820) * (narrow ? 1 : 0.86);
      ox = (W - 1000 * s) / 2; oy = top + (H - reserve - top - 820 * s) / 2 - (narrow ? 30 : 50) * s;
      labels.current.forEach((l, i) => { if (!l) return; l.style.left = `${ox + ANCHORS[i][0] * s}px`; l.style.top = `${oy + ANCHORS[i][1] * s}px`; });
    };
    const ro = new ResizeObserver(size); ro.observe(root); size();

    // Pointer to brain space. The rect is in painted pixels and the canvas in layout pixels;
    // on the mobile tree the root zoom makes those differ, so scale by W / r.width.
    const toBrain = (e: PointerEvent): [number, number] => {
      const r = root.getBoundingClientRect();
      return [((e.clientX - r.left) * (W / r.width) - ox) / s, ((e.clientY - r.top) * (H / r.height) - oy) / s];
    };
    let mouse: [number, number] | null = null;
    // A finger cannot hover, and the page keeps vertical drags (touch-action: pan-y) so a
    // swipe over the brain still scrolls. A touch is a splash instead: the mass bursts away
    // from the finger, then closes back around it, and the network lights up where it landed.
    const TOUCH_MS = 1300;
    let touch: { x: number; y: number; t0: number } | null = null;
    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || (e.target as HTMLElement).closest('button, .bottom, .who')) return;
      const [x, y] = toBrain(e), t = performance.now();
      touch = { x, y, t0: t };
      for (const p of ps) {
        const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy);
        if (d < 190 && d > 0) { const k = (190 - d) * .22; p.vx += dx / d * k; p.vy += dy / d * k; }
      }
      const near = ANCHORS.map(([ax, ay], i) => ({ i, d: Math.hypot(ax - x, ay - y) })).sort((a, b) => a.d - b.d)[0];
      if (near.d < 130) pickRef.current(near.i);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') mouse = toBrain(e);
      else if (touch) { [touch.x, touch.y] = toBrain(e); }
    };
    const leave = (e: PointerEvent) => { if (e.pointerType === 'mouse') mouse = null; };
    root.addEventListener('pointerdown', down); root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave);

    let lastSwitch = 0, lastSearch = 0;
    const search = (t: number) => {
      const ang = Math.random() * 6.28, k = 6 + ((Math.random() * 10) | 0), reach = 70 + Math.random() * 120;
      ps.map((p) => ({ p, d: Math.cos(Math.atan2(p.hy - 430, p.hx - 500) - ang) * Math.hypot(p.hx - 500, p.hy - 430) }))
        .sort((a, b) => b.d - a.d).slice(0, k)
        .forEach(({ p }, j) => { p.ex = Math.cos(ang) * reach * (1 - j / k * .5); p.ey = Math.sin(ang) * reach * (1 - j / k * .5); p.until = t + 1800 + Math.random() * 900; });
    };
    const step = (t: number) => {
      if (!pinned.current && t - lastSwitch > 3200) { lastSwitch = t; setActive((a) => (a + 1) % pillars.length); }
      if (t - lastSearch > 2600) { lastSearch = t; search(t); }
      // The pull starts after the burst (180ms) and fades out over the rest of the splash.
      const age = touch ? t - touch.t0 : Infinity;
      if (touch && age > TOUCH_MS) touch = null;
      const pull = age < 180 ? 0 : age < TOUCH_MS ? 1 - (age - 180) / (TOUCH_MS - 180) : 0;
      for (const p of ps) {
        if (p.until && t > p.until) { p.ex = p.ey = 0; p.until = 0; }
        const tx = p.hx + p.ex + Math.sin(t / 900 + p.ph) * 4, ty = p.hy + p.ey + Math.cos(t / 1100 + p.ph) * 4;
        p.vx += (tx - p.x) * .012; p.vy += (ty - p.y) * .012;
        if (mouse) { const dx = mouse[0] - p.x, dy = mouse[1] - p.y, d = Math.hypot(dx, dy); if (d < 160 && d > 0) { p.vx += dx / d * (160 - d) * .012; p.vy += dy / d * (160 - d) * .012; } }
        if (pull > 0) { const dx = touch!.x - p.x, dy = touch!.y - p.y, d = Math.hypot(dx, dy); if (d < 200 && d > 0) { p.vx += dx / d * (200 - d) * .014 * pull; p.vy += dy / d * (200 - d) * .014 * pull; } }
        p.vx *= .86; p.vy *= .86; p.x += p.vx; p.y += p.vy;
      }
      for (const f of floats) { f.x += f.vx; f.y += f.vy; if (f.x < -40) f.x = 1040; if (f.x > 1040) f.x = -40; if (f.y < -40) f.y = 840; if (f.y > 840) f.y = -40; }
    };
    const draw = (t: number) => {
      g.setTransform(dpr * s, 0, 0, dpr * s, dpr * ox, dpr * oy); g.clearRect(-ox / s, -oy / s, W / s, H / s);
      g.fillStyle = '#ebe7e1';
      for (const p of ps) { g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill(); }
      for (const f of floats) { g.beginPath(); g.arc(f.x, f.y, f.r, 0, 6.283); g.fill(); }
      n.setTransform(dpr * s, 0, 0, dpr * s, dpr * ox, dpr * oy); n.clearRect(-ox / s, -oy / s, W / s, H / s);
      const [ax, ay] = ANCHORS[activeRef.current], pulse = .55 + Math.sin(t / 420) * .2;
      const grd = n.createRadialGradient(ax, ay, 0, ax, ay, 170);
      grd.addColorStop(0, `rgba(207,128,71,${.55 * pulse})`); grd.addColorStop(1, 'rgba(207,128,71,0)');
      n.fillStyle = grd; n.beginPath(); n.arc(ax, ay, 170, 0, 6.283); n.fill();
      const glow = touch ? Math.max(0, 1 - (t - touch.t0) / TOUCH_MS) : 0;
      if (glow > 0) {
        const tg = n.createRadialGradient(touch!.x, touch!.y, 0, touch!.x, touch!.y, 150);
        tg.addColorStop(0, `rgba(207,128,71,${.5 * glow})`); tg.addColorStop(1, 'rgba(207,128,71,0)');
        n.fillStyle = tg; n.beginPath(); n.arc(touch!.x, touch!.y, 150, 0, 6.283); n.fill();
      }
      n.lineWidth = 1 / s;
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i], b = ps[j], dx = a.x - b.x, dy = a.y - b.y;
        if (dx * dx + dy * dy > 2600) continue;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const hot = Math.hypot(mx - ax, my - ay) < 150 || (glow > .15 && Math.hypot(mx - touch!.x, my - touch!.y) < 150);
        n.strokeStyle = hot ? 'rgba(151,80,31,.75)' : 'rgba(10,10,10,.22)';
        n.beginPath(); n.moveTo(a.x, a.y); n.lineTo(b.x, b.y); n.stroke();
      }
      n.strokeStyle = 'rgba(10,10,10,.38)'; n.lineWidth = 2.6; n.lineCap = 'round';
      for (const f of FOLDS) { n.beginPath(); n.moveTo(f[0], f[1]); n.bezierCurveTo(f[2], f[3], f[4], f[5], f[6], f[7]); n.stroke(); }
      n.fillStyle = 'rgba(10,10,10,.35)';
      for (const p of ps) { n.beginPath(); n.arc(p.x, p.y, 1.6, 0, 6.283); n.fill(); }
    };

    let raf = 0, running = true;
    const loop = (t: number) => { if (!running) return; step(t); draw(t); raf = requestAnimationFrame(loop); };
    if (reduce) { ps.forEach((p) => { p.x = p.hx; p.y = p.hy; }); draw(0); }
    const io = new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting && !reduce; if (running && !was) raf = requestAnimationFrame(loop); });
    io.observe(root);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); running = false; io.disconnect(); ro.disconnect(); root.removeEventListener('pointerdown', down); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); };
  }, [narrow, pillars.length]);

  const pick = (i: number) => { pinned.current = true; setActive(i); };
  pickRef.current = pick;

  return (
    <div className="h-brain" ref={box} id={id} aria-label={home.brainAria}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <filter id="h-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" /><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" /></filter>
      </svg>
      <canvas className="goo" ref={gooRef} aria-hidden />
      <canvas className="net" ref={netRef} aria-hidden />
      <div className="who"><img src={asset('krish-headshot')} alt="" /><b>{site.name}</b><span>{home.brainCaption}</span></div>
      {pillars.map((p, i) => (
        <button key={p.title} type="button" className={`h-lobe${active === i ? ' on' : ''}`} ref={(el) => { labels.current[i] = el; }} onClick={() => pick(i)}>
          <i />{p.title}
        </button>
      ))}
      <div className="bottom">
        <div className="h-parts" role="group" aria-label={home.brainPartsAria}>
          {pillars.map((p, i) => (
            <button key={p.short} type="button" aria-pressed={active === i} onClick={() => pick(i)}>{p.short}</button>
          ))}
        </div>
        <div className="h-readout" aria-live="polite">
          {pillars.map((p, i) => (
            <div key={p.title} className={`item${active === i ? ' on' : ''}`} aria-hidden={active !== i}>
              <b>{p.title}</b>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrainBloom;
