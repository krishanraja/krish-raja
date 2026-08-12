import { ExternalLink } from 'lucide-react';
import MobileSection from './MobileSection';
import { Badge } from '@/components/ui/badge';
import { portfolio } from '@/content';
import { pick, type PortfolioItem } from '@/content/types';
import { asset } from '@/lib/asset-map';

const BusinessRow = ({ business }: { business: PortfolioItem }) => (
  <a
    href={business.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-card border border-border/60 rounded-2xl p-4 shadow-sm active:bg-muted/50 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${business.plateOnDark ? "bg-muted/40 dark:bg-white p-1" : "bg-muted/40"}`}>
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
        <p className="text-[11px] font-medium text-primary/80 mb-1">{business.role}</p>
        <p className="text-[12.5px] leading-snug text-muted-foreground">{business.description}</p>
      </div>
    </div>
  </a>
);

/**
 * One list, no tab strip. Matches the desktop grid: the three lanes collapsed
 * on 12 Aug 2026, and five rows is a shorter scroll than a sticky control that
 * hid two thirds of them.
 */
const MobilePortfolio = () => (
  <MobileSection
    id={portfolio.id}
    eyebrow={portfolio.eyebrow}
    title={pick(portfolio.title, 'mobile')}
    intro={pick(portfolio.sub, 'mobile')}
  >
    <ul className="space-y-2.5">
      {portfolio.items.map((b) => (
        <li key={b.name}>
          <BusinessRow business={b} />
        </li>
      ))}
    </ul>
  </MobileSection>
);

export default MobilePortfolio;
