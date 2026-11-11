import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * A section title that arrives line by line behind a sweeping bar: the bar
 * wipes across a line left to right, the text appears under it, and the bar
 * leaves to the right.
 *
 * Native rather than GSAP on purpose. Android's desktop-site mode puts `zoom`
 * on the root element (see useForcedDesktopZoom), and ScrollTrigger reads
 * getBoundingClientRect, which returns zoomed pixels there. This rides the
 * homepage's own reveal observer instead (useReveals adds `.in`), so it starts
 * when every other reveal does, after the loader, and costs no dependency.
 *
 * Lines are measured from the browser's own wrap, so balanced wrapping and the
 * two-line engagement title are kept. Once played it goes back to plain text,
 * so a later resize reflows normally.
 */
type Props = {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  style?: CSSProperties;
  id?: string;
};

type Phase = 'wait' | 'measure' | 'play' | 'done';

export const BlockTitle = ({ text, as: Tag = 'h2', className = '', style, id }: Props) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<Phase>('wait');
  const [lines, setLines] = useState<string[]>([]);
  const words = text.split(/\s+/).filter(Boolean);

  // Start when the shared reveal observer marks the title `.in`.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mo = new MutationObserver(() => go());
    const go = () => {
      if (!el.classList.contains('in')) return;
      mo.disconnect();
      setPhase(reduce ? 'done' : 'measure');
    };
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    go();
    return () => mo.disconnect();
  }, []);

  // Read where the browser broke the lines, before anything paints.
  useLayoutEffect(() => {
    if (phase !== 'measure' || !ref.current) return;
    const spans = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-w]'));
    const out: string[][] = [];
    let top = Number.NEGATIVE_INFINITY;
    spans.forEach((s, i) => {
      if (Math.abs(s.offsetTop - top) > 2) { out.push([]); top = s.offsetTop; }
      out[out.length - 1].push(words[i]);
    });
    setLines(out.map((l) => l.join(' ')));
    setPhase('play');
  }, [phase, words]);

  let body: React.ReactNode = text;
  if (phase === 'measure') {
    body = words.map((w, i) => (
      <Fragment key={i}><span data-w>{w}</span>{i < words.length - 1 ? ' ' : ''}</Fragment>
    ));
  } else if (phase === 'play') {
    body = lines.map((l, i) => (
      <span key={i} className="blk-line">
        <span className="blk-in" style={{ ['--i' as string]: i }}>
          <span className="blk-t">{l}</span>
          <span
            className="blk-bar"
            aria-hidden
            onAnimationEnd={i === lines.length - 1 ? () => setPhase('done') : undefined}
          />
        </span>
      </span>
    ));
  }

  return (
    <Tag ref={ref} id={id} className={`${className} h-blk`.trim()} style={style} aria-label={phase === 'play' ? text : undefined}>
      {body}
    </Tag>
  );
};

export default BlockTitle;
