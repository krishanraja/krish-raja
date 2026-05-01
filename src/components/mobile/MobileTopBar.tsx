import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

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
      <div className="flex items-center justify-between px-5 h-11">
        <a href="#hero" className="text-[15px] font-semibold tracking-tight" aria-label="Krish Raja - Home">
          Krish Raja
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default MobileTopBar;
