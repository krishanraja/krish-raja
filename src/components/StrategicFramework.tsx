import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Wrench, Network, Rocket, Globe, DollarSign } from 'lucide-react';

const StrategicFramework = () => {
  const approaches = [
    {
      icon: MessageSquare,
      title: "The Universal Translator",
      description: "I speak everyone's language—from developers to CEOs, across cultures and time zones. The bridge between what teams need and what executives want.",
      methods: ["Turn tech complexity into business clarity", "Navigate cultural nuances (UK, AU, US markets)", "Connect the dots across departments", "Spot patterns others miss across industries"]
    },
    {
      icon: Wrench,
      title: "Builder + Business Mind", 
      description: "I don't just strategize—I roll up my sleeves and build. Then I make sure it actually makes money.",
      methods: ["Hands-on with product, sales, marketing & tech", "Create revenue engines from zero to millions", "AI that works in the real world, not just demos", "Run businesses, not just advise on them"]
    },
    {
      icon: Network,
      title: "The Connection Maker",
      description: "I see how everything fits together—people, processes, and possibilities. Then I help everyone else see it too.",
      methods: ["Get different teams actually working together", "Connect big picture vision to daily execution", "Turn organizational chaos into smooth operations", "Guide complex changes without the drama"]
    },
    {
      icon: Rocket,
      title: "Market Opening Expert",
      description: "I've done this before—taking new ideas and turning them into thriving businesses, fast. Three countries, multiple industries, proven results.",
      methods: ["Launch new categories that actually stick", "Find product-market fit without burning cash", "Scale across international markets smoothly", "Navigate acquisitions and rapid growth phases"]
    }
  ];

  const principles = [
    "Revenue Comes First",
    "Speak Everyone's Language", 
    "Build for the Long Game",
    "Smart Risks, Not Reckless Ones"
  ];

  return (
    <section id="strategic-framework" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">My Unique Approach</h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            I help bridge the gap between what's possible and what's profitable—with the hands-on experience to make both happen<br />
            <span className="text-primary font-medium">16+ years of connecting the dots across London → Sydney → New York</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Approach Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {approaches.map((approach, index) => {
              const Icon = approach.icon;
              return (
                <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{approach.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {approach.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {approach.methods.map((method, methodIndex) => (
                        <div key={methodIndex} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <p className="text-xs text-muted-foreground">
                            {method}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Core Operating Principles */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm bg-primary/5 backdrop-blur-sm h-fit sticky top-8">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Core Operating Principles</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The philosophy behind every engagement
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {principles.map((principle, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="w-full justify-start text-xs py-2 px-3 bg-background/50"
                    >
                      {principle}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">What Makes This Different:</span><br />
                    Microsoft coder → AdTech innovator → AI strategy guide → Global business builder<br />
                    <span className="text-primary">I'm probably the only consultant who's both automated workflows AND built $60M+ revenue businesses</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicFramework;