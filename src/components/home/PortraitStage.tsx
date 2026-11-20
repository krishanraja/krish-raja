import { useId, useLayoutEffect, useRef, useState } from 'react';
import BrainBloom from './BrainBloom';
import portrait from '@/assets/krish-portrait.webp';
import brainDetail from '@/assets/brain-peek.webp';
import { routeCopy } from '@/content/hero-routes';
import { hero } from '@/content';

type Props = { mobile: boolean; open: boolean; onChange: (open: boolean) => void };

export function PortraitStage({ mobile, open, onChange }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const underneath = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [visited, setVisited] = useState(open);
  const wasOpen = useRef(open);
  const gradient = 'paper-' + useId().replace(/[^a-z0-9]/ig, '');
  const curl = gradient + '-curl';

  useLayoutEffect(() => {
    const shell = stage.current!, sheet = face.current!;
    const measure = () => {
      // Layout pixels stay correct on a phone using Android's desktop-site zoom.
      const width = sheet.offsetWidth, height = sheet.offsetHeight;
      const fold = mobile ? Math.min(width * .34, height * .54) : Math.min(232, Math.min(width, height) * .37);
      shell.style.setProperty('--fold', fold.toFixed(2) + 'px');
      shell.style.setProperty('--rest', (fold / Math.SQRT2).toFixed(2) + 'px');
      shell.style.setProperty('--lift', (fold * 1.17 / Math.SQRT2).toFixed(2) + 'px');
      shell.style.setProperty('--travel', ((width + height) / Math.SQRT2).toFixed(2) + 'px');
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(sheet);
    return () => resize.disconnect();
  }, [mobile]);

  useLayoutEffect(() => {
    if (underneath.current) underneath.current.inert = !open;
    if (open && !visited) setVisited(true);
    if (open !== wasOpen.current) trigger.current?.focus({preventScroll:true});
    wasOpen.current = open;
  }, [open, visited]);

  return <div ref={stage} id="how-i-operate" className={'pv-stage ' + (mobile ? 'pv-mobile' : 'pv-desktop mp-stage')}
    data-open={open || undefined} data-used={visited || undefined}
    onKeyDown={e => { if (open && e.key === 'Escape') {e.preventDefault();onChange(false);} }}>
    <button type="button" className="pv-trigger" ref={trigger} aria-controls="brain-inside" aria-expanded={open}
      aria-label={open ? routeCopy.backPortrait : routeCopy.openBrain} onClick={() => onChange(!open)}>
      <span className="pv-cue pv-cue-open" aria-hidden="true">{routeCopy.openBrain}<i /></span>
      <span className="pv-cue pv-cue-return" aria-hidden="true"><i />{routeCopy.backPortrait}</span>
    </button>
    <div className="pv-under" id="brain-inside" ref={underneath} aria-hidden={!open}>
      {(visited || open) && <BrainBloom narrow={mobile} enabled={open}/>}
    </div>
    <div className="pv-sheet-area" ref={face}>
      <div className="pv-peek" aria-hidden="true"><img src={brainDetail} alt=""/></div>
      <div className="pv-photo-mask">
        {mobile ? <div className="mp-cover pv-mobile-photo">
          <img src={portrait} alt={routeCopy.portraitAlt} fetchPriority="high"/>
          <h1>{hero.h1}</h1>
        </div> : <img className="mp-portrait" src={portrait} alt={routeCopy.portraitAlt} fetchPriority="high"/>}
        <div className="pv-portrait-peek" aria-hidden="true"><img src={portrait} alt=""/></div>
      </div>
      <div className="pv-edge-light" aria-hidden="true"/>
      <svg className="pv-curl pv-curl-open" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <defs><linearGradient id={gradient} x1="45" y1="45" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#594f48"/><stop offset=".26" stopColor="#c9b9a8"/>
          <stop offset=".38" stopColor="#f6ebd9"/><stop offset=".6" stopColor="#ddd1bd"/>
          <stop offset="1" stopColor="#8e7c67"/>
        </linearGradient>
          <g id={curl}>
            <path d="M0 100 100 0C85 33 65 61 42 79 25 92 11 98 0 100Z" fill={'url(#'+gradient+')'}/>
            <path d="M1 99 99 1" fill="none" stroke="#fff1df" strokeWidth=".42"/>
          </g>
        </defs>
        <use href={'#'+curl}/>
      </svg>
      <svg className="pv-curl pv-curl-return" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <use href={'#'+curl}/>
      </svg>
    </div>
  </div>;
}
