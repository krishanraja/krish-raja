import { ArrowRight } from 'lucide-react';
import MobileSection from './MobileSection';
import { Button } from '@/components/ui/button';
import { offer } from '@/content';
import { pick } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

const MobileWorkWithMe = () => (
  <MobileSection
    id={offer.id}
    eyebrow={offer.eyebrow}
    title={pick(offer.title, 'mobile')}
    intro={pick(offer.sub, 'mobile')}
    tone="muted"
  >
    <ul className="space-y-3" role={offer.cards.length === 1 ? 'presentation' : undefined}>
      {offer.cards.map((path, i) => {
        const Icon = resolveIcon(path.icon);
        return (
          <li
            key={i}
            className={`relative rounded-2xl border p-4 shadow-sm ${
              path.primary
                ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/10'
                : 'bg-card border-border/60'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <h3 className="mobile-h3 text-foreground">{path.title}</h3>
            </div>
            {path.eyebrow && (
              <p className="text-[11px] uppercase tracking-wide text-primary/80 font-medium mb-1.5">
                {path.eyebrow}
              </p>
            )}
            <p className="mobile-meta mb-3">{path.body}</p>
            <Button
              asChild
              variant={path.primary ? 'default' : 'outline'}
              size="sm"
              className="w-full"
            >
              <a
                href={path.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                {path.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  </MobileSection>
);

export default MobileWorkWithMe;
