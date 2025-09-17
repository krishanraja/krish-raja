import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Rocket, TrendingUp, Target } from 'lucide-react';

const HowIHelp = () => {
  const audiences = [
    {
      icon: Users,
      title: "Executive Leadership",
      oneLiner: "Translate AI noise into board-ready strategy. Scaled multi-million ARR businesses from zero, built teams across three continents.",
      outcomes: [
        "AI-first competitive positioning",
        "Revenue strategy transformation", 
        "Cross-functional team building",
        "Board-level strategic guidance"
      ],
      metric: "Multi-million ARR",
      context: "scaled from zero - reach out for case studies"
    },
    {
      icon: Rocket,
      title: "Product/GTM Leaders", 
      oneLiner: "Turn literacy into roadmap, PMF signals into scale. Launched dozens of products, scaled revenue by 7x growth.",
      outcomes: [
        "AI-driven product strategy",
        "GTM acceleration frameworks",
        "Market expansion planning",
        "Product-led growth design"
      ],
      metric: "Extensive portfolio",
      context: "dozens of products launched - contact for details"
    },
    {
      icon: TrendingUp,
      title: "Sales/RevOps",
      oneLiner: "Seller workflows, education-led enablement. Dramatically reduced outreach time, closed substantial ARR in under 6 months.",
      outcomes: [
        "AI-powered sales automation",
        "Revenue operations design",
        "Pipeline optimization",
        "Conversion rate improvement"
      ],
      metric: "Dramatic reduction",
      context: "in outreach time - book call for methodology"
    },
    {
      icon: Target,
      title: "Investors & VCs",
      oneLiner: "Navigate AI/data-driven media opportunities with rigorous market analysis. 15+ years of technical and commercial expertise across the evolving adtech ecosystem.",
      outcomes: [
        "Rigorous market sizing & trend analysis",
        "Competitive landscape evaluation",
        "Pitch deck development & review",
        "Investment timing & positioning strategy"
      ],
      metric: "Unique expertise combo",
      context: "sales, ops, product, marketing & macro strategy - contact for portfolio"
    }
  ];

  return (
    <section id="how-i-help" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">How I Help</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            16+ years building revenue lines, scaling teams, and creating value through data-fed AI strategies across UK, AU, and USA
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <Card key={index} className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{audience.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {audience.oneLiner}
                  </p>
                  
                  {/* Achievement Highlight */}
                  <div className="bg-muted/30 rounded-lg p-3 mt-4">
                    <div className="text-lg font-semibold text-primary">{audience.metric}</div>
                    <div className="text-xs text-muted-foreground">{audience.context}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {audience.outcomes.map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <a href="#ai-mindmaker" className="text-sm">
                      Learn more
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowIHelp;