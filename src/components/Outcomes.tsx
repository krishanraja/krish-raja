import { Card, CardContent } from '@/components/ui/card';

const Outcomes = () => {
  const outcomes = [
    {
      metric: "40%",
      context: "shorter sales cycles with agent-led GTM playbooks"
    },
    {
      metric: "$800K+",
      context: "ARR across 4 enterprise deals in under 6 months for a US market entry"
    },
    {
      metric: "$5.5M",
      context: "ARR scaled APAC org to 18 headcount"
    },
    {
      metric: "60%",
      context: "cut in outreach time by inserting AI into GTM"
    },
    {
      metric: "$9M → $61M",
      context: "grew data and programmatic revenue"
    },
    {
      metric: "70+",
      context: "new commercial data, analytics, and automation products launched"
    },
    {
      metric: "$400K/month",
      context: "sales run rate built in 18 months"
    },
    {
      metric: "Weeks saved",
      context: "coded automations at Microsoft that removed manual work"
    }
  ];

  return (
    <section id="outcomes" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Selected Outcomes</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Measurable results from strategic AI and revenue initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => (
            <Card key={index} className="card-hover border-0 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-3">
                  {outcome.metric}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {outcome.context}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;