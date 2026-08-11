import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { nav } from '@/content';

const Navigation = () => {
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
              className="text-xl font-semibold tracking-tight link-underline"
              aria-label={nav.brandAria}
            >
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
              <ThemeToggle />
              <div className="ml-4">
                <Button asChild>
                  <a href={nav.ctaHref}>{nav.ctaLabel}</a>
                </Button>
              </div>
            </div>

            {/* Mobile: theme toggle + primary CTA only. Section nav lives in the action dock. */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button asChild size="sm">
                <a href={nav.ctaHref}>{nav.ctaLabel}</a>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
