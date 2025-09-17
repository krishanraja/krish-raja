import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Users, TrendingUp, Globe } from 'lucide-react';

const StrategicFramework = () => {
  const frameworks = [
    {
      icon: Brain,
      title: "Market Intelligence",
      description: "Data-driven landscape analysis and opportunity identification",
      methods: ["Competitive intelligence gathering", "Market sizing & validation", "Trend pattern recognition"]
    },
    {
      icon: Target,
      title: "Revenue Architecture", 
      description: "Systematic approach to building scalable revenue engines",
      methods: ["Revenue model design", "Sales process optimization", "Monetization strategy"]
    },
    {
      icon: Users,
      title: "Team Dynamics",
      description: "Cross-cultural team building and organizational design",
      methods: ["Talent acquisition strategy", "Performance system design", "Cultural integration"]
    },
    {
      icon: TrendingUp,
      title: "Product-Market Fit",
      description: "Methodical approach to connecting products with markets",
      methods: ["User research & validation", "Product positioning", "Go-to-market execution"]
    }
  ];

  const instincts = [
    "Think systems, not features",
    "Revenue first, technology second", 
    "Global mindset, local execution",
    "Data-informed, instinct-validated",
    "Build for scale, optimize for speed"
  ];

  return (
    <section id="strategic-framework" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Strategic Framework</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Proven methodologies refined across 16+ years building businesses from London → Sydney → New York
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Framework Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {frameworks.map((framework, index) => {
              const Icon = framework.icon;
              return (
                <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{framework.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {framework.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {framework.methods.map((method, methodIndex) => (
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

          {/* Strategic Instincts */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm bg-primary/5 backdrop-blur-sm h-fit sticky top-8">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Strategic Instincts</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Core principles that guide every engagement
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {instincts.map((instinct, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="w-full justify-start text-xs py-2 px-3 bg-background/50"
                    >
                      {instinct}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Global Experience:</span><br />
                    London → Sydney → New York<br />
                    16+ years across 3 continents
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