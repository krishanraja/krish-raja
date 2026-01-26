import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import WorkWithMeMenu from '@/components/WorkWithMeMenu';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Learn', href: '#learn' },
    { label: 'Writing', href: '#writing' },
    { label: 'Background', href: '#creds' },
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
                <WorkWithMeMenu />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                className="p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <ThemeToggle />
              <WorkWithMeMenu />
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div id="mobile-menu" className="lg:hidden py-4 border-t border-border bg-background">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navigation;
