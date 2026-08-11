import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Play, ArrowRight } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { work } from '@/content';
import { pick, type WorkItem } from '@/content/types';
import { asset } from '@/lib/asset-map';

const Work = () => {
  const isMobile = useIsMobile();

  const renderCard = (item: WorkItem, index: number) => {
    const isMediaType = item.type === "Case Study" || item.type === "Podcast";
    const image = asset(item.asset);
    const hasLink = Boolean(item.link) && item.link !== '#';

    return (
      <Dialog key={index}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer border-0 shadow-sm h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img
                src={image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {isMediaType && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
              )}

              <Badge
                variant="secondary"
                className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs"
              >
                {item.type}
              </Badge>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{item.type}</Badge>
            </div>
            <DialogTitle className="text-left">{item.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {image && (
              <div className="w-full rounded-lg overflow-hidden bg-muted/30">
                <img
                  src={image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-contain max-h-[400px]"
                />
              </div>
            )}
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
            {hasLink && (
              <Button asChild className="w-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                  {item.actionLabel}
                  <ExternalLink size={16} />
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <section id={work.id} className="section-padding bg-muted/30 scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="headline-lg mb-4 md:mb-6">{pick(work.title, 'desktop')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(work.sub, 'desktop')}
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel
            showDots={true}
            minHeight="carousel-sm"
          >
            {work.items.map((item, index) => renderCard(item, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {work.items.map((item, index) => renderCard(item, index))}
          </div>
        )}

        {/* Where I publish regularly. Desktop only; the portfolio Write tab covers this on mobile. */}
        <div className="hidden md:block mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center sm:text-left">
            {work.publishRow.map((row, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {row.prefix}{' '}
                <a
                  href={row.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium link-underline inline-flex items-center gap-1"
                >
                  {row.link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
