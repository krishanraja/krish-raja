import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { offer } from '@/content';
import { pick, type OfferCard } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

const WorkWithMe = () => {
  const isMobile = useIsMobile();

  const renderCard = (path: OfferCard, index: number) => {
    const Icon = resolveIcon(path.icon);
    return (
      <Card
        key={index}
        className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full flex flex-col"
      >
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg leading-tight">{path.title}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">{path.body}</p>
        </CardHeader>
        <CardContent className="pt-0 mt-auto">
          <Button asChild variant="outline" size="sm" className="w-full">
            <a
              href={path.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              {path.cta}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  };

  const single = offer.cards.length === 1;

  return (
    <section id={offer.id} className="section-padding scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="headline-lg mb-4 md:mb-6">{pick(offer.title, 'desktop')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(offer.sub, 'desktop')}
          </p>
        </div>

        {single ? (
          <div className="max-w-xl mx-auto">
            {offer.cards.map((path, index) => renderCard(path, index))}
          </div>
        ) : isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
            {offer.cards.map((path, index) => renderCard(path, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {offer.cards.map((path, index) => renderCard(path, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkWithMe;
