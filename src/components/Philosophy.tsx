import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Bot, Layers, Database } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Philosophy = () => {
  const isMobile = useIsMobile();
  
  const principles = [
    {
      icon: Rocket,
      title: "Build in Public",
      description: "Ship fast, learn openly, compound credibility. Every product I launch teaches the next one.",
      points: ["Speed over perfection", "Transparency builds trust", "Failures are public lessons", "Momentum compounds"]
    },
    {
      icon: Bot,
      title: "AI as Co-Founder",
      description: "AI isn't a tool I use — it's a thinking partner I build with. Every product is human + machine.",
      points: ["Augment, don't replace", "Prompt engineering is a core skill", "AI multiplies human judgment", "Build what AI can't"]
    },
    {
      icon: Layers,
      title: "Fractional Everything",
      description: "Multiple income streams, multiple experiments, maximum optionality. Never bet it all on one thing.",
      points: ["Diversified portfolio of bets", "Small experiments, fast pivots", "Parallel paths reduce risk", "Build assets that compound"]
    },
    {
      icon: Database,
      title: "Data-First Decisions",
      description: "Every decision backed by signal, not intuition. If you can't measure it, you can't improve it.",
      points: ["Metrics before movement", "Validate with users, not opinions", "Analytics reveal truth", "Iterate on evidence"]
    }
  ];

  return (
    <section id="philosophy" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">How I Think About Building</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Principles forged across 16 years and 3 continents — London → Sydney → New York
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel 
            showDots={true}
            uniformHeight={true}
            minHeight="carousel-md"
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="pb-4 flex-shrink-0">
                    {/* Fixed height title area */}
                    <div className="flex items-center gap-3 mb-2 min-h-[40px]">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{principle.title}</CardTitle>
                    </div>
                    {/* Fixed height description area */}
                    <div className="min-h-[72px]">
                      <p className="text-sm text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1">
                    <div className="space-y-2">
                      {principle.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardHeader className="pb-4 flex-shrink-0">
                    {/* Fixed height title area to ensure alignment */}
                    <div className="flex items-center gap-3 mb-2 min-h-[40px]">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{principle.title}</CardTitle>
                    </div>
                    {/* Fixed height description area */}
                    <div className="min-h-[72px]">
                      <p className="text-sm text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1">
                    <div className="space-y-2">
                      {principle.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Philosophy;
