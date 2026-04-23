import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, BookOpen, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const paths = [
  {
    icon: Users,
    title: "Join the AI Decision Cohort",
    body: "Three weeks, mostly async, fifteen senior leaders. You bring a nervous AI decision; you leave with a board-ready answer. Quarterly, $3,500 per seat.",
    cta: "See the cohort",
    href: "https://themindmaker.ai/cohort"
  },
  {
    icon: Building2,
    title: "Hire Mindmaker for enterprise work",
    body: "If your company has AI capabilities but no clear commercial strategy, I help commercialize them. The Signal Session ($15k, 1 day) for alignment. The Revenue Architecture ($60k+, 30 days) for the full build.",
    cta: "See enterprise offers",
    href: "https://themindmaker.ai/enterprise"
  },
  {
    icon: BookOpen,
    title: "Read before you hire",
    body: "Techonomic is where I think out loud. Signal & Noise is where I interrogate peers. Both are free. Start there if you're not ready for a call.",
    cta: "Read Techonomic",
    href: "https://www.techonomic.co"
  }
];

const WorkWithMe = () => {
  const isMobile = useIsMobile();

  const renderCard = (path: typeof paths[0], index: number) => {
    const Icon = path.icon;
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

  return (
    <section id="work-with-me" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="headline-lg mb-6">Work with me</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Three ways in. Pick the one that fits.
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
            {paths.map((path, index) => renderCard(path, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {paths.map((path, index) => renderCard(path, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkWithMe;
