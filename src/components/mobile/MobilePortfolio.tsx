import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import MobileSection from './MobileSection';
import { Badge } from '@/components/ui/badge';
import { portfolio } from '@/content';
import { pick, type PortfolioItem } from '@/content/types';
import { asset } from '@/lib/asset-map';
import { icon as resolveIcon } from '@/lib/icon-map';

const BusinessRow = ({ business }: { business: PortfolioItem }) => (
  <a
    href={business.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-card border border-border/60 rounded-2xl p-4 shadow-sm active:bg-muted/50 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-lg bg-muted/40 flex items-center justify-center flex-shrink-0">
        <img
          src={asset(business.asset)}
          alt={`${business.name} icon`}
          loading="lazy"
          decoding="async"
          className={`h-7 w-auto object-contain ${
            business.invertOnDark ? 'dark:brightness-200 dark:invert' : 'dark:brightness-110'
          }`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <h3 className="text-sm font-semibold text-foreground">{business.name}</h3>
          {business.isBeta && (
            <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 text-[9px] px-1.5 py-0 leading-4">
              {portfolio.betaBadge}
            </Badge>
          )}
          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto flex-shrink-0" />
        </div>
        <p className="text-[11px] font-medium text-primary/80 mb-1">{pick(business.role, 'mobile')}</p>
        <p className="text-[12.5px] leading-snug text-muted-foreground">{pick(business.description, 'mobile')}</p>
      </div>
    </div>
  </a>
);

const MobilePortfolio = () => {
  const [active, setActive] = useState<string>(portfolio.tabs[0].id);
  const lane = portfolio.tabs.find((l) => l.id === active) ?? portfolio.tabs[0];

  return (
    <MobileSection
      id={portfolio.id}
      eyebrow={pick(portfolio.eyebrow, 'mobile')}
      title={pick(portfolio.title, 'mobile')}
      intro={pick(portfolio.sub, 'mobile')}
    >
      <div className="sticky top-11 z-20 -mx-1 mb-4 py-1 mobile-dock-blur rounded-full">
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-muted/40">
          {portfolio.tabs.map((l) => {
            const Icon = resolveIcon(l.icon);
            const isActive = l.id === active;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setActive(l.id)}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium mobile-tap-spring transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {pick(l.label, 'mobile')}
              </button>
            );
          })}
        </div>
      </div>

      {lane.note && <p className="mobile-meta mb-3">{lane.note}</p>}

      <ul className="space-y-2.5">
        {lane.items.map((b, i) => (
          <li key={i}>
            <BusinessRow business={b} />
          </li>
        ))}
      </ul>
    </MobileSection>
  );
};

export default MobilePortfolio;
