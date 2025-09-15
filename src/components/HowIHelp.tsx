import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Rocket, TrendingUp, Cpu } from 'lucide-react';

const HowIHelp = () => {
  const audiences = [
    {
      icon: Users,
      title: "Executive Leadership",
      oneLiner: "Translate AI noise into board-ready strategy. Built $5.5M ARR from $0, scaled teams to 18 across three continents.",
      outcomes: [
        "AI-first competitive positioning",
        "Revenue strategy transformation", 
        "Cross-functional team building",
        "Board-level strategic guidance"
      ],
      metric: "$5.5M ARR",
      context: "scaled from zero at Captify APAC"
    },
    {
      icon: Rocket,
      title: "Product/GTM Leaders", 
      oneLiner: "Turn literacy into roadmap, PMF signals into scale. Launched 70+ products, grew revenue from $9M to $61M.",
      outcomes: [
        "AI-driven product strategy",
        "GTM acceleration frameworks",
        "Market expansion planning",
        "Product-led growth design"
      ],
      metric: "70+",
      context: "new products launched across portfolio"
    },
    {
      icon: TrendingUp,
      title: "Sales/RevOps",
      oneLiner: "Seller workflows, education-led enablement. Cut outreach time 60%, closed $400K+ ARR in under 6 months.",
      outcomes: [
        "AI-powered sales automation",
        "Revenue operations design",
        "Pipeline optimization",
        "Conversion rate improvement"
      ],
      metric: "60%",
      context: "reduction in outreach time through AI"
    },
    {
      icon: Cpu,
      title: "Data/AI/Engineering",
      oneLiner: "Practical agent patterns, evaluation harnesses. Built automations that saved teams weeks of manual work.",
      outcomes: [
        "Agent architecture design",
        "Data pipeline optimization", 
        "Technical strategy translation",
        "AI governance frameworks"
      ],
      metric: "Weeks saved",
      context: "through coded automations at Microsoft"
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