import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  const navItems = [
    { label: 'How I Help', href: '#how-i-help' },
    { label: 'AI MindMaker', href: '#ai-mindmaker' },
    { label: 'Creds', href: '#creds' },
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'Work', href: '#work' },
    { label: 'Journey', href: '#journey' },
    { label: 'Strategic Advisor', href: '#strategic-advisor' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container-width py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <a href="#hero" className="text-xl font-semibold tracking-tight mb-4 block">
              Krish Raja
            </a>
            <p className="text-sm text-muted-foreground max-w-md">
              Turn AI literacy into AI strategy and revenue. Strategic advisor across AI, 
              data, identity, and SaaS GTM.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.linkedin.com/in/krish-raja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={16} />
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href="https://calendly.com/krish-raja">
                  Book a call
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Krish Raja. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Brooklyn, New York
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;