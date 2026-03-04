import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Bot, RefreshCw, Target } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Philosophy = () => {
  const isMobile = useIsMobile();
  
  const principles = [
    {
      icon: Rocket,
      title: "Build in Public",
      description: "Ship fast, learn openly, compound knowledge. Every system failure gets encoded so it never repeats across the next project.",
      points: ["Learnings carry across projects", "AI memory webs compound over time", "One failure prevents the next", "Momentum through iteration"]
    },
    {
      icon: Bot,
      title: "AI as Co-Founder",
      description: "I don't just use AI — I build with it. Voice clones, video agents, memory webs, autonomous researchers, and API-connected assistants.",
      points: ["Voice & video clones in production", "Memory structures across agents", "AI ghostwriters & researchers", "Human judgment, machine scale"]
    },
    {
      icon: RefreshCw,
      title: "One Flywheel",
      description: "Building, advising, and creating are parts of one engine. Each venture sharpens commercial instinct and compounds into the next.",
      points: ["Every venture feeds the whole", "Advising sharpens go-to-market", "Creating attracts enterprise opportunities", "Modular ecosystem, singular focus"]
    },
    {
      icon: Target,
      title: "AI-Native Revenue",
      description: "Enterprise GTM engines powered by AI — automated pipelines, intelligent outreach, and scalable commercial systems that drive high-growth revenue.",
      points: ["AI-native GTM engines at scale", "Automated research & outreach pipelines", "Revenue systems, not just strategy", "Enterprise-grade commercial infrastructure"]
    }
  ];

  return (
    <section id="philosophy" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">How I Think About Building</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            16 years of scaling revenue across 3 continents — distilled into how I build today
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
