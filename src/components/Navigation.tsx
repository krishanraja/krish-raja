import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'How I operate', href: '#how-i-operate' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Writing', href: '#writing' },
    { label: 'Lessons', href: '#lightning-lessons' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}>
        <nav className="container-width" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between py-4">
            <a
              href="#hero"
              className="text-xl font-semibold tracking-tight link-underline"
              aria-label="Krish Raja - Home"
            >
              Krish Raja
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
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
                  <a href="#work-with-me">Work with me</a>
                </Button>
              </div>
            </div>

            {/* Mobile: theme toggle + primary CTA only. Section nav lives in MobileJumpNav. */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button asChild size="sm">
                <a href="#work-with-me">Work with me</a>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
