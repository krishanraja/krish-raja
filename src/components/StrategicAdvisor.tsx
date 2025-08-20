import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

const StrategicAdvisor = () => {
  const deliverables = [
    {
      title: "Operating model and cadence",
      description: "Structured frameworks for decision-making and execution rhythm"
    },
    {
      title: "Decision simulations and scenario plans", 
      description: "Risk assessment tools and strategic option evaluation"
    },
    {
      title: "GTM rewires and enablement assets",
      description: "Sales playbooks, positioning, and revenue acceleration tools"
    },
    {
      title: "Board-ready narrative and metrics",
      description: "Executive communication and performance measurement systems"
    }
  ];

  return (
    <section id="strategic-advisor" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="headline-lg mb-6">Strategic Advisor</h2>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Ongoing operating system for founders and teams. Connects literacy, 
              orchestration, and execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {deliverables.map((deliverable, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <CardTitle className="text-lg leading-snug">
                      {deliverable.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {deliverable.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 text-center border shadow-sm">
            <h3 className="headline-md mb-4">Ready to accelerate?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Transform your AI strategy from concept to revenue with systematic, 
              proven methodologies.
            </p>
            <Button size="lg" asChild>
              <a href="https://calendly.com/krish-raja" className="flex items-center gap-2">
                Book a call
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicAdvisor;