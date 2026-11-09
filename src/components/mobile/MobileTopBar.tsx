import { useEffect, useRef, useState } from 'react';
import { home, nav } from '@/content';

const MobileTopBar = () => {
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'mobile-dock-blur border-b border-border/60' : ''}`}
      role="banner"
    >
      <div className="flex h-11 w-full items-center justify-between px-5">
        <a
          href="#hero"
          className="inline-flex h-11 items-center gap-2 text-[15px] font-semibold tracking-tight"
          aria-label={nav.brandAria}
        >
          <img src={home.bitmoji} alt="" width={32} height={32} className="h-8 w-8 rounded-full bg-white object-cover ring-1 ring-border" />
          {nav.brand}
        </a>
      </div>
    </header>
  );
};

export default MobileTopBar;
