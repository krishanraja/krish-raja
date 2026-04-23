import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Bot, FileText, Wrench, RefreshCw, ArrowRight } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Philosophy = () => {
  const isMobile = useIsMobile();

  const pillars = [
    {
      icon: Target,
      title: "The Revenue Engine",
      description: "AI-powered cold email, LinkedIn DMs, and named-account sequences across multiple ventures. Enterprise GTM engines built on agents, not people."
    },
    {
      icon: Bot,
      title: "The Operating System",
      count: "14 agents, 45 workflows",
      description: "A 14-agent fleet replacing a 15-person team. Ops, email triage, content synthesis, lead scoring, dependency mapping, credential health — all running 24/7 with named roles (Marcus, Kai, Zara, Maya, and more)."
    },
    {
      icon: FileText,
      title: "The Content Engine",
      description: "Automated newsletter production, podcast synthesis, slide generation, editorial calendars. Techonomic and Signal & Noise ship without me being the bottleneck."
    },
    {
      icon: Wrench,
      title: "The Build Loop",
      description: "I don't just use AI — I build with it. Voice clones, video agents, memory webs, autonomous researchers, API-connected assistants. Voyage agents in production across Anthropic, Gemini, and OpenAI."
    }
  ];

  const flywheelPoints = [
    "Every venture feeds the whole",
    "Learnings carry across projects",
    "One failure prevents the next",
    "Momentum through iteration"
  ];

  const renderPillarCard = (pillar: typeof pillars[0], index: number) => {
    const Icon = pillar.icon;
    return (
      <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3 min-h-[40px]">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg leading-tight">{pillar.title}</CardTitle>
          </div>
          {pillar.count && (
            <div className="mb-2">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
                {pillar.count}
              </span>
            </div>
          )}
          <p className="text-sm text-muted-foreground">{pillar.description}</p>
        </CardHeader>
      </Card>
    );
  };

  return (
    <section id="how-i-operate" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-10">
          <h2 className="headline-lg mb-6">How I operate</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            I don't theorize about AI. I run an autonomous business on it.
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
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
                <CardTitle className="text-lg leading-tight">One flywheel</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
                Building, advising, and writing are parts of one engine. Each venture sharpens commercial instinct, produces case material, and compounds into the next.
              </p>

              {isMobile ? (
                <div className="flex flex-col items-stretch gap-2">
                  {flywheelPoints.map((point, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="w-full bg-background/60 border border-border rounded-full px-4 py-2 text-xs text-foreground text-center">
                        {point}
                      </div>
                      {index < flywheelPoints.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-primary/60 rotate-90" />
                      )}
                    </div>
                  ))}
                  <div className="flex justify-center mt-2">
                    <RefreshCw className="w-4 h-4 text-primary/60" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-3">
                  {flywheelPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="bg-background/60 border border-border rounded-full px-4 py-1.5 text-xs text-foreground whitespace-nowrap">
                        {point}
                      </div>
                      {index < flywheelPoints.length - 1 && (
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
