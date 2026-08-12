import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { portfolio } from '@/content';
import { type PortfolioItem } from '@/content/types';
import { asset } from '@/lib/asset-map';

const BusinessCard = ({ business }: { business: PortfolioItem }) => {
  const isLargerLogo = business.invertOnDark === true;

  return (
    <a href={business.url} target="_blank" rel="noopener noreferrer" className="group h-full">
      <div className="relative flex h-full flex-col items-center rounded-xl border border-border/50 bg-card/50 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
        <ExternalLink className="absolute top-3 right-3 w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        {business.isBeta && (
          <Badge className="absolute top-3 left-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0.5">
            {portfolio.betaBadge}
          </Badge>
        )}

        <div className="h-20 flex items-end justify-center mb-3">
          <div
            className={`rounded-lg p-1.5 backdrop-blur-[2px] transition-colors duration-300 ${
              business.plateOnDark
                ? 'bg-white/0 dark:bg-white dark:px-2'
                : business.plateOnLight
                  ? 'bg-foreground px-2.5 dark:bg-white/10 dark:px-1.5'
                  : 'bg-white/0 dark:bg-white/10'
            }`}
          >
            <img
              src={asset(business.asset)}
              alt={`${business.name} icon`}
              loading="lazy"
              decoding="async"
              className={`h-12 w-auto max-w-[9rem] object-contain ${isLargerLogo ? 'dark:brightness-200 dark:invert' : 'dark:brightness-110 dark:contrast-105'} transition-all duration-300`}
            />
          </div>
        </div>

        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 text-sm">
          {business.name}
        </h3>
        <span className="text-xs text-primary/80 font-medium">{business.role}</span>
        <p className="text-xs text-muted-foreground leading-relaxed mt-2">{business.description}</p>
      </div>
    </a>
  );
};

/**
 * One grid, five cards. The Advise / Build work / Write tabs came off on
 * 12 Aug 2026: three tabs of three cards hid two thirds of the section behind
 * a click and saved no vertical space, and the tab strip was the only control
 * of its kind on the page.
 *
 * Five across at lg so the whole portfolio is one row on a normal desktop.
 * This component renders above 768px only, since Index.tsx swaps in the mobile
 * tree below that, which is why there is no mobile branch left in here.
 */
const LivePortfolio = () => (
  <section id={portfolio.id} className="section-padding scroll-mt-16">
    <div className="container-width">
      <div className="text-center mb-6 md:mb-10">
        <h2 className="headline-lg mb-3 md:mb-4">{portfolio.title}</h2>
        <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
          {portfolio.sub}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {portfolio.items.map((business) => (
          <BusinessCard key={business.name} business={business} />
        ))}
      </div>
    </div>
  </section>
);

export default LivePortfolio;
