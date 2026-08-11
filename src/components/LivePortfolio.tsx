import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { portfolio } from '@/content';
import { pick, type PortfolioItem } from '@/content/types';
import { asset } from '@/lib/asset-map';
import { icon as resolveIcon } from '@/lib/icon-map';

const BusinessCard = ({ business, isMobile }: { business: PortfolioItem; isMobile: boolean }) => {
  const isLargerLogo = business.invertOnDark === true;

  return (
    <a
      href={business.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full min-h-[160px] relative">
        <ExternalLink className="absolute top-3 right-3 w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        {business.isBeta && (
          <Badge className="absolute top-3 left-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0.5">
            {portfolio.betaBadge}
          </Badge>
        )}
        <div className={isMobile ? "flex items-start gap-3" : "flex flex-col items-center text-center"}>
          <div className={isMobile
            ? "w-12 h-12 flex-shrink-0 flex items-center justify-center"
            : "h-20 flex items-end justify-center mb-3"}>
            <div className="rounded-lg p-1.5 bg-white/0 dark:bg-white/10 backdrop-blur-[2px] transition-colors duration-300">
              <img
                src={asset(business.asset)}
                alt={`${business.name} icon`}
                loading="lazy"
                decoding="async"
                className={`${isMobile
                  ? `${isLargerLogo ? 'h-8' : 'h-8'}`
                  : `${isLargerLogo ? 'h-12' : 'h-12'}`} w-auto object-contain ${isLargerLogo ? 'dark:brightness-200 dark:invert' : 'dark:brightness-110 dark:contrast-105'} transition-all duration-300`}
              />
            </div>
          </div>
          <div className={isMobile ? "flex-1 min-w-0" : ""}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 text-sm">
              {business.name}
            </h3>
            <span className="text-xs text-primary/80 font-medium">{pick(business.role, 'desktop')}</span>
            <p className={`text-xs text-muted-foreground leading-relaxed ${isMobile ? 'mt-1.5' : 'mt-2'}`}>
              {pick(business.description, 'desktop')}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

const BusinessGrid = ({ businesses, isMobile }: { businesses: readonly PortfolioItem[]; isMobile: boolean }) => {
  return (
    <MobileCarousel
      className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      showDots={true}
      uniformHeight={false}
    >
      {businesses.map((business, index) => (
        <BusinessCard key={index} business={business} isMobile={isMobile} />
      ))}
    </MobileCarousel>
  );
};

const LivePortfolio = () => {
  const isMobile = useIsMobile();

  return (
    <section id={portfolio.id} className="section-padding scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="headline-lg mb-3 md:mb-4">{pick(portfolio.title, 'desktop')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(portfolio.sub, 'desktop')}
          </p>
        </div>

        <Tabs defaultValue={portfolio.tabs[0].id} className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8 bg-muted/30 p-1 rounded-full h-auto">
            {portfolio.tabs.map((tab) => {
              const Icon = resolveIcon(tab.icon);
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-full py-2.5 px-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Icon size={14} />
                  <span>{pick(tab.label, 'desktop')}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {portfolio.tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="animate-fade-in mt-0">
              {tab.note && (
                <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-6">
                  {tab.note}
                </p>
              )}
              <BusinessGrid businesses={tab.items} isMobile={isMobile} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default LivePortfolio;
