import { Card, CardContent } from '@/components/ui/card';

const Outcomes = () => {
  const outcomes = [
    {
      metric: "$5.5M",
      context: "ARR scaled from zero at Captify APAC with 18-person team",
      category: "Revenue Growth"
    },
    {
      metric: "$9M → $61M",
      context: "grew data and programmatic revenue at Nine Entertainment",
      category: "Revenue Growth"
    },
    {
      metric: "$800K+",
      context: "ARR across 4 enterprise deals in under 6 months for US market entry",
      category: "Sales Excellence"
    },
    {
      metric: "70+",
      context: "new commercial data, analytics, and automation products launched",
      category: "Product Innovation"
    },
    {
      metric: "60%",
      context: "reduction in outreach time by inserting AI into GTM processes",
      category: "Process Optimization"
    },
    {
      metric: "40%",
      context: "shorter sales cycles with agent-led GTM playbooks",
      category: "Sales Excellence"
    },
    {
      metric: "18",
      context: "team members built and scaled across APAC at Captify",
      category: "Team Building"
    },
    {
      metric: "3",
      context: "continents with proven track record (UK, AU, USA)",
      category: "Global Expansion"
    }
  ];

  return (
    <section id="outcomes" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Proven Outcomes</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from 16+ years of building businesses, scaling teams, and driving revenue across three continents
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => (
            <Card key={index} className="card-hover border-0 shadow-sm text-center group">
              <CardContent className="p-6">
                <div className="text-xs font-medium text-primary/70 mb-2 uppercase tracking-wide">
                  {outcome.category}
                </div>
                <div className="text-3xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
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