import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MessageSquare } from 'lucide-react';

const StrategicAdvisor = () => {
  const engagementModels = [
    {
      title: "Strategic Sprint",
      duration: "2-4 weeks",
      description: "Focused engagement for specific challenges or opportunities",
      deliverables: ["Strategic assessment", "Action plan", "Implementation roadmap"]
    },
    {
      title: "Ongoing Advisory",
      duration: "3-12 months", 
      description: "Regular strategic guidance through growth phases",
      deliverables: ["Monthly strategy sessions", "Performance reviews", "Market intelligence"]
    },
    {
      title: "Transformation Partnership",
      duration: "6-18 months",
      description: "Comprehensive support for major strategic initiatives",
      deliverables: ["Full strategic framework", "Team development", "Execution oversight"]
    }
  ];

  return (
    <section id="strategic-advisor" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Strategic Advisory</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible engagement models designed around your strategic needs and business timeline
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {engagementModels.map((model, index) => (
            <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{model.duration}</span>
                </div>
                <CardTitle className="text-xl">{model.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {model.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {model.deliverables.map((deliverable, deliverableIndex) => (
                    <div key={deliverableIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        {deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-sm bg-primary/5 backdrop-blur-sm text-center">
            <CardContent className="p-8">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="headline-md mb-4">Let's Discuss Your Strategic Needs</h3>
              <p className="body-md text-muted-foreground mb-8">
                Every engagement starts with understanding your specific challenges and opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://calendly.com/krish-raja/strategic-consultation" target="_blank" rel="noopener noreferrer">
                    Book Strategy Call
                  </a>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:hello@krishraja.com">
                    Email for Details
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                All inquiries receive a response within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StrategicAdvisor;