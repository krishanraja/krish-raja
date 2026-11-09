import { useState, useEffect } from 'react';
import { home, nav } from '@/content';
import { useAsk } from '@/components/home/shared';

const Navigation = () => {
  const ask = useAsk();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        {nav.skipLink}
      </a>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}>
        <nav className="container-width" role="navigation" aria-label={nav.navAria}>
          <div className="flex items-center justify-between py-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight"
              aria-label={nav.brandAria}
            >
              <img src={home.bitmoji} alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-white object-cover ring-1 ring-border" />
              {nav.brand}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  {item.label}
                </a>
              ))}
              <button type="button" onClick={ask} className="ml-4 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]">
                {nav.ctaLabel}
              </button>
            </div>

            {/* Below lg: the primary CTA only. Section nav lives in the action dock. */}
            <div className="lg:hidden flex items-center">
              <button type="button" onClick={ask} className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground">
                {nav.ctaLabel}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
