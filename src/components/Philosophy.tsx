import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Bot, RefreshCw, Target, FileText, Wrench, Smartphone } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Philosophy = () => {
  const isMobile = useIsMobile();

  const builds = [
    {
      icon: Smartphone,
      title: "Products & Platforms",
      count: "4 shipped",
      description: "Full-stack apps from mobile-first exec tools to market intelligence dashboards"
    },
    {
      icon: Bot,
      title: "Autonomous Systems",
      count: "7 running",
      description: "Cron-driven agents handling ops, email triage, content synthesis, and job sourcing. 24/7"
    },
    {
      icon: Target,
      title: "Outbound Engines",
      count: "80+ campaigns",
      description: "AI-powered cold email, LinkedIn DMs, and named-account sequences across multiple ventures"
    },
    {
      icon: FileText,
      title: "Content Systems",
      count: "5 pipelines",
      description: "Automated newsletter production, slide generation, media pitches, and editorial calendars"
    },
    {
      icon: Wrench,
      title: "Operational Tools",
      count: "5 systems",
      description: "Domain intelligence, lead enrichment, decision-maker mapping, and automated job applications"
    }
  ];

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
      description: "I don't just use AI. I build with it. Voice clones, video agents, memory webs, autonomous researchers, and API-connected assistants.",
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
      description: "Enterprise GTM engines powered by AI: automated pipelines, intelligent outreach, and scalable commercial systems that drive high-growth revenue.",
      points: ["AI-native GTM engines at scale", "Automated research & outreach pipelines", "Revenue systems, not just strategy", "Enterprise-grade commercial infrastructure"]
    }
  ];

  const renderBuildCard = (build: typeof builds[0], index: number) => {
    const Icon = build.icon;
    return (
      <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2 min-h-[40px]">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg leading-tight">{build.title}</CardTitle>
          </div>
          <div className="mb-2">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">
              {build.count}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{build.description}</p>
        </CardHeader>
      </Card>
    );
  };

  const renderPrincipleCard = (principle: typeof principles[0], index: number) => {
    const Icon = principle.icon;
    return (
      <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2 min-h-[40px]">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg leading-tight">{principle.title}</CardTitle>
          </div>
          <div className="min-h-[72px]">
            <p className="text-sm text-muted-foreground">{principle.description}</p>
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex-1">
          <div className="space-y-2">
            {principle.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="philosophy" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-10">
          <h2 className="headline-lg mb-6">Using AI for myself as well as for business outcomes</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            I'm building tangible personal and professional unlocks, publicly. Explore them below.
          </p>
        </div>

        <Tabs defaultValue="what" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList>
              <TabsTrigger value="what">What I Build</TabsTrigger>
              <TabsTrigger value="how">How I Build</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="what">
            {isMobile ? (
              <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-sm">
                {builds.map((build, index) => renderBuildCard(build, index))}
              </MobileCarousel>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {builds.map((build, index) => renderBuildCard(build, index))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="how">
            {isMobile ? (
              <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
                {principles.map((principle, index) => renderPrincipleCard(principle, index))}
              </MobileCarousel>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {principles.map((principle, index) => renderPrincipleCard(principle, index))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Philosophy;
