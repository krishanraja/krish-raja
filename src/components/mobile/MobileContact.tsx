import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';

const links = [
  { label: 'Email', value: 'hello@krishraja.com', href: 'mailto:hello@krishraja.com', icon: Mail, external: false },
  { label: 'LinkedIn', value: 'linkedin.com/in/krish-raja', href: 'https://www.linkedin.com/in/krish-raja', icon: Linkedin, external: true },
  { label: 'For work inquiries', value: 'Book a call through Mindmaker', href: 'https://themindmaker.ai', icon: ArrowUpRight, external: true },
];

const MobileContact = () => (
  <MobileSection
    id="contact"
    eyebrow="Contact"
    title="Get in touch"
    intro="For speaking, writing, or a direct line."
  >
    <ul className="space-y-2">
      {links.map((l) => {
        const Icon = l.icon;
        return (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="mobile-tap-row group"
            >
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{l.label}</span>
                <span className="block text-[13.5px] font-medium text-foreground truncate group-active:text-primary transition-colors">
                  {l.value}
                </span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </a>
          </li>
        );
      })}
    </ul>
  </MobileSection>
);

export default MobileContact;
