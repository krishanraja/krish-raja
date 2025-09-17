import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Target, Lightbulb, Cog, Search, Hammer, UserCheck, BookOpen } from 'lucide-react';

const AIMindMaker = () => {
  const coreModules = [
    {
      icon: Users,
      title: "ALIGN LEADERS",
      description: "Exec Team primer on AI literacy, market shifts, and how media leaders are preparing teams for 2030",
      credits: 15
    },
    {
      icon: Lightbulb,
      title: "INSPIRE STAFF",
      description: "All Hands keynote on the future of work in 2030 & principles required to thrive",
      credits: 10
    },
    {
      icon: Target,
      title: "PRODUCT STRATEGY",
      description: "Map AI capabilities to your Product Strategy to future-proof the business or develop a new revenue line",
      credits: 25
    },
    {
      icon: Cog,
      title: "FORMALIZE OPS",
      description: "Production and training of an internal AI usage playbook",
      credits: 20
    }
  ];

  const additionalModules = [
    {
      icon: Search,
      title: "AGENT OPP SPOTTER",
      description: "Learn to spot Agent opportunities, workflow redesign jam session with one team",
      credits: 5
    },
    {
      icon: Hammer,
      title: "GET BUILDING",
      description: "Deep dive inspiration session on AI usage patterns, build a lightweight internal tool with one team and track it to a chosen KPI",
      credits: 20
    },
    {
      icon: UserCheck,
      title: "COACH THE COACHES",
      description: "Coach the coach: 1-1 AI literacy coaching for power users",
      credits: 20
    },
    {
      icon: BookOpen,
      title: "GAMIFY LEARNING",
      description: "\"No time - no problem\" internal newsletter: produce tailored digital mini-lessons and score cards to distribute via email",
      credits: 15
    }
  ];

  return (
    <section id="ai-mindmaker" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">AI MindMaker</h2>
          <p className="text-xl text-primary font-medium mb-4">
            Agentic AI Sprints for Commercial Product Strategy & Team Literacy
          </p>
          <p className="body-lg text-muted-foreground max-w-4xl mx-auto mb-6">
            With decades of experience delivering commercial product strategy across data & automation 
            within media organizations, we provide you with personalized AI literacy {'>'}  product strategy 
            sprints to ensure your organization aligns and thrives with what's next.
          </p>
        </div>

        {/* Core Four Pillars */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Core Program Pillars</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="card-hover border-0 shadow-sm relative">
                  <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    {module.credits} credits
                  </div>
                  <CardHeader className="pb-4 pt-6">
                    <div className="flex flex-col items-center text-center mb-2">
                      <div className="p-3 rounded-lg bg-primary/10 mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-bold uppercase tracking-wide text-primary">
                        {module.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Modules */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Additional Specialized Modules</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="card-hover border-0 shadow-sm relative">
                  <div className="absolute top-4 right-4 bg-accent/10 text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                    {module.credits} credits
                  </div>
                  <CardHeader className="pb-4 pt-6">
                    <div className="flex flex-col items-center text-center mb-2">
                      <div className="p-3 rounded-lg bg-accent/10 mb-3">
                        <Icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-sm font-bold uppercase tracking-wide text-accent-foreground">
                        {module.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h3 className="headline-md mb-4">Ready to Transform Your Organization?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            These are just some of our available modules - and they're tailored upon further discovery. 
            Preparing teams for 2030 requires a personalized approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <a href="mailto:krish@fractionl.ai" className="flex items-center gap-2">
                Discuss Your Needs
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:krish@fractionl.ai?subject=AI%20MindMaker%20Case%20Studies">
                Request Case Studies
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMindMaker;