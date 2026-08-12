import { ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';
import { contact } from '@/content';
import { pick } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

const MobileContact = () => (
  <MobileSection
    id={contact.id}
    eyebrow={contact.eyebrow}
    title={pick(contact.title, 'mobile')}
    intro={pick(contact.sub, 'mobile')}
  >
    <ul className="space-y-2">
      {contact.links.map((l) => {
        const Icon = resolveIcon(l.icon);
        return (
          <li key={l.action}>
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
                <span className="block text-[13.5px] font-medium text-foreground group-active:text-primary transition-colors">
                  {l.action}
                </span>
                <span className="block text-[11px] text-muted-foreground truncate">{l.detail}</span>
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
