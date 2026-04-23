import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Mic, Video, BookOpen, Play, ArrowRight } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import mastersThesis from '@/assets/masters-thesis-optimized.webp';
import podcastTile from '@/assets/podcast-tile-optimized.webp';
import giveItANudge from '@/assets/give-it-a-nudge-optimized.webp';

const Work = () => {
  const isMobile = useIsMobile();

  const workItems = [
    {
      title: "Predicting the Future of Haptic Design (2011)",
      type: "Research",
      summary: "Master's thesis predicting the evolution of haptic and tactile interfaces.",
      description: "A Master's thesis predicting the evolution of haptic and tactile interfaces through interviews with UX leaders at IDEO, Microsoft, and Google. Most of what was predicted has now played out.",
      link: "#",
      image: mastersThesis,
      icon: BookOpen,
      actionLabel: "Read"
    },
    {
      title: "Zero to Multi-Million ARR: Scaling APAC",
      type: "Case Study",
      summary: "Playbook for launching Captify's APAC business from zero.",
      description: "Detailed walkthrough of building Captify's APAC business from zero. Team, GTM, product-market fit, and the decisions that enabled rapid scaling.",
      link: "https://www.youtube.com/watch?v=6_bf9L1OX3s&t=271s",
      image: giveItANudge,
      icon: Video,
      actionLabel: "Watch"
    },
    {
      title: "My Take on AI in Media",
      type: "Podcast",
      summary: "November 2025 podcast discussing how AI is restructuring media businesses.",
      description: "November 2025 podcast discussing how AI is restructuring media businesses, from content creation to monetization.",
      link: "https://open.spotify.com/episode/2c5xrFDlPC1Oqw9kcFKDay?si=ocqEDPLPSummNkaPT6T2Tg",
      image: podcastTile,
      icon: Mic,
      actionLabel: "Listen"
    }
  ];

  const renderCard = (item: typeof workItems[0], index: number) => {
    const isMediaType = item.type === "Case Study" || item.type === "Podcast";

    return (
      <Dialog key={index}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer border-0 shadow-sm h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img
                src={item.image}
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
            {item.image && (
              <div className="w-full rounded-lg overflow-hidden bg-muted/30">
                <img
                  src={item.image}
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
            {item.link !== "#" && (
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
    <section id="writing" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Writing & speaking</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            The longest-running arguments I've made, plus recent conversations.
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel
            showDots={true}
            minHeight="carousel-sm"
          >
            {workItems.map((item, index) => renderCard(item, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {workItems.map((item, index) => renderCard(item, index))}
          </div>
        )}

        {/* Where I publish regularly */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              Writing regularly at{' '}
              <a
                href="https://www.techonomic.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium link-underline inline-flex items-center gap-1"
              >
                Techonomic
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Hosting{' '}
              <a
                href="https://www.mediaradar.com/signal-and-noise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium link-underline inline-flex items-center gap-1"
              >
                Signal &amp; Noise
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
