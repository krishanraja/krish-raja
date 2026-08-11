import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, ExternalLink } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { lessons as lessonsContent } from '@/content';
import { pick, type Lesson } from '@/content/types';
import { asset } from '@/lib/asset-map';

const LightningLessons = () => {
  const isMobile = useIsMobile();

  const renderCard = (lesson: Lesson, index: number) => {
    const title = pick(lesson.title, 'desktop');
    return (
      <a
        key={index}
        href={lesson.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <Card className="border-0 shadow-sm h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <img
              src={asset(lesson.asset)}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              {lessonsContent.badge}
            </Badge>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
          </div>
          <CardContent className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 text-sm">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {pick(lesson.description, 'desktop')}
            </p>
          </CardContent>
        </Card>
      </a>
    );
  };

  return (
    <section id={lessonsContent.id} className="section-padding scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="headline-lg mb-4 md:mb-6">{pick(lessonsContent.title, 'desktop')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(lessonsContent.sub, 'desktop')}
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
            {lessonsContent.lessons.map((lesson, index) => renderCard(lesson, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {lessonsContent.lessons.map((lesson, index) => renderCard(lesson, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LightningLessons;
