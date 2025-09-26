import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Target, Lightbulb, Cog } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

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


  return (
    <section id="ai-mindmaker" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <img 
            src="/mindmaker-logo.png" 
            alt="MINDMAKER" 
            className="h-16 mx-auto mb-6"
          />
          <p className="text-xl text-primary font-medium mb-4">
            Agentic AI Sprints for Commercial Product Strategy & Team Literacy
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-6 italic">
            New offering launched July 2025
          </p>
        </div>

        {/* Core Four Pillars */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Core Program Pillars</h3>
          <MobileCarousel 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            itemClassName="h-full"
            showDots={true}
            minHeight="300px"
          >
            {coreModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="card-hover border-0 shadow-sm relative h-full">
                  <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    {module.credits} credits
                  </div>
                  <CardHeader className="pb-4 pt-6">
                    <div className="flex flex-col items-center text-center mb-2">
                      <div className="p-3 rounded-lg bg-primary/10 mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-bold uppercase tracking-wide text-primary break-words hyphens-auto">
                        {module.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed break-words hyphens-auto">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </MobileCarousel>
        </div>


        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <a href="https://www.themindmaker.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              AI Mindmaker site
              <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIMindMaker;