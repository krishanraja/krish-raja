import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { operate } from '@/content';
import { pick, type Pillar } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

const Philosophy = () => {
  const isMobile = useIsMobile();

  const { pillars, flywheel } = operate;

  const renderPillarCard = (pillar: Pillar, index: number) => {
    const Icon = resolveIcon(pillar.icon);
    return (
      <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3 min-h-[40px]">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg leading-tight">{pick(pillar.title, 'desktop')}</CardTitle>
          </div>
          {pillar.badge && (
            <div className="mb-2">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
                {pick(pillar.badge, 'desktop')}
              </span>
            </div>
          )}
          <p className="text-sm text-muted-foreground">{pick(pillar.body, 'desktop')}</p>
        </CardHeader>
      </Card>
    );
  };

  return (
    <section id={operate.id} className="section-padding bg-muted/30 scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="headline-lg mb-4 md:mb-6">{pick(operate.title, 'desktop')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(operate.sub, 'desktop')}
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-sm">
            {pillars.map((pillar, index) => renderPillarCard(pillar, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => renderPillarCard(pillar, index))}
          </div>
        )}

        {/* Flywheel */}
        <div className="mt-16">
          <Card className="border border-primary/20 shadow-sm bg-gradient-to-br from-primary/5 via-card/50 to-primary/10 backdrop-blur-sm ring-1 ring-primary/10">
            <CardHeader className="text-center md:px-10 md:py-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg leading-tight">{flywheel.title}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                {flywheel.body}
              </p>

              {isMobile ? (
                <div className="flex flex-wrap justify-center items-center gap-1.5">
                  {flywheel.points.map((point, index) => (
                    <div
                      key={index}
                      className="bg-background/60 border border-border rounded-full px-3 py-1 text-[11px] text-foreground"
                    >
                      {point}
                    </div>
                  ))}
                  <RefreshCw className="w-3.5 h-3.5 text-primary/60 ml-1 flex-shrink-0" />
                </div>
              ) : (
                <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-3">
                  {flywheel.points.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="bg-background/60 border border-border rounded-full px-4 py-1.5 text-xs text-foreground whitespace-nowrap">
                        {point}
                      </div>
                      {index < flywheel.points.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-primary/60 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                  <RefreshCw className="w-4 h-4 text-primary/60 ml-2 flex-shrink-0" />
                </div>
              )}
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
