import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Target, Settings, Shield, Users, BarChart } from 'lucide-react';

const AIMindMaker = () => {
  const modules = [
    {
      icon: BookOpen,
      title: "Literacy sprint",
      description: "Foundation knowledge to separate signal from noise"
    },
    {
      icon: Target,
      title: "Use case portfolio and prioritization",
      description: "Strategic framework for identifying highest-value opportunities"
    },
    {
      icon: Settings,
      title: "Systems and agent patterns",
      description: "Technical architectures that scale with your business"
    },
    {
      icon: Shield,
      title: "Evaluation and guardrails",
      description: "Risk management and quality assurance frameworks"
    },
    {
      icon: Users,
      title: "GTM enablement and training",
      description: "Sales and marketing assets that drive adoption"
    },
    {
      icon: BarChart,
      title: "Prove and scale",
      description: "Metrics and processes for sustainable growth"
    }
  ];

  return (
    <section id="ai-mindmaker" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">AI MindMaker</h2>
          <p className="text-xl text-primary font-medium mb-4">
            From AI literacy to shipped strategy
          </p>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            A structured program that educates teams, designs the right agent patterns, 
            and lands them in product and GTM.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card key={index} className="card-hover border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">{module.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h3 className="headline-md mb-6">Ready to bridge the gap?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <a href="https://learning.fractionl.ai" className="flex items-center gap-2">
                Explore AI MindMaker
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://learning.fractionl.ai/diagnostic">
                Take the 7 minute leadership diagnostic
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://learning.fractionl.ai/hub" className="link-underline">
                Read the Learning Hub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMindMaker;