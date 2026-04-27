import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Footer = () => {
  const navItems = [
    { label: 'How I operate', href: '#how-i-operate' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Receipts', href: '#proof-points' },
    { label: 'Writing', href: '#writing' },
    { label: 'Work with me', href: '#work-with-me' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container-width py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          <div>
            <a href="#hero" className="text-xl font-semibold tracking-tight mb-2 md:mb-4 block">
              Krish Raja
            </a>
            <p className="text-sm text-muted-foreground max-w-md">
              Operator-advisor running an autonomous AI business. Helping companies commercialize theirs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch md:items-center w-full md:w-auto">
            {/* Desktop nav */}
            <nav className="hidden md:flex flex-wrap gap-x-6 gap-y-2">
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

            {/* Mobile sitemap accordion */}
            <Accordion type="single" collapsible className="md:hidden w-full">
              <AccordionItem value="sitemap" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:no-underline">
                  Sitemap
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Krish Raja. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Brooklyn, New York
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
