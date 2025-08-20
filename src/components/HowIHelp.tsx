import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Rocket, TrendingUp, Cpu } from 'lucide-react';

const HowIHelp = () => {
  const audiences = [
    {
      icon: Users,
      title: "Executive Leadership",
      oneLiner: "Translate AI noise into board-ready strategy, operating model, and measurable outcomes.",
      outcomes: [
        "Portfolio of AI bets aligned to P&L and risk",
        "Governance, resourcing, and metrics that survive scrutiny",
        "Narrative that wins the room and unlocks budgets"
      ]
    },
    {
      icon: Rocket,
      title: "Product and GTM Leaders",
      oneLiner: "Turn literacy into roadmap, PMF signals, pricing and launch motions across SLG, PLG, and channel.",
      outcomes: [
        "Crisper positioning and talk tracks that convert",
        "Roadmap shaped by jobs-to-be-done and evidence",
        "Faster launch cycles with clean Sales handoffs"
      ]
    },
    {
      icon: TrendingUp,
      title: "Sales, RevOps and Enablement",
      oneLiner: "Seller workflows, education-led enablement, buyer-ready stories, and pipeline acceleration.",
      outcomes: [
        "Higher win rates and shorter cycles",
        "Consistent message across SDR, AE, SE, CS",
        "Repeatable playbooks and asset kits tied to stages"
      ]
    },
    {
      icon: Cpu,
      title: "Data, AI and Engineering",
      oneLiner: "Practical agent patterns, evaluation harnesses, and integration with data and identity.",
      outcomes: [
        "Fewer proofs-of-concept, more shipped capability",
        "Architecture and MLOps aligned to business value",
        "Eval gates that keep models honest"
      ]
    }
  ];

  return (
    <section id="how-i-help" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">How I Help</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic guidance tailored to your role and business context
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <Card key={index} className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm">
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
                  <Button variant="outline" size="sm" asChild>
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