import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Target, Lightbulb, Users, TrendingUp, Globe } from 'lucide-react';

const Journey = () => {
  const strategicPillars = [
    {
      icon: Target,
      title: "Market Intelligence",
      description: "Reading landscapes and capturing opportunities",
      methodologies: [
        "Rigorous top-down and bottom-up market sizing connecting emerging trends",
        "15+ years of deep technical and commercial knowledge across evolving ecosystems",
        "Scenario planning for competitive landscapes and timing optimization"
      ]
    },
    {
      icon: TrendingUp,
      title: "Revenue Architecture", 
      description: "Systematic approach to building revenue engines",
      methodologies: [
        "Zero-to-one revenue planning spanning direct, channel, PLG and SLG motions",
        "Agent-led GTM playbooks that significantly shorten sales cycles",
        "AI-driven testing and automation dramatically reducing outreach time"
      ]
    },
    {
      icon: Users,
      title: "Team Dynamics",
      description: "Building and scaling teams across cultures",
      methodologies: [
        "Full team builds from zero to multi-million ARR operations",
        "Cross-continental team scaling with cultural adaptation frameworks",
        "Executive coaching and developer network growth strategies"
      ]
    },
    {
      icon: Lightbulb,
      title: "Product-Market Fit",
      description: "Connecting products to markets with precision",
      methodologies: [
        "Zero-to-one positioning for emerging technology products",
        "Industry-first solution development and market introduction",
        "Enterprise contract frameworks for tech, broadcast, and CPG sectors"
      ]
    },
    {
      icon: Globe,
      title: "Global Execution",
      description: "Cross-continental operations framework",
      methodologies: [
        "Market expansion with scenario planning and initial business development",
        "Multi-year RFP strategies and solutions engineering partnerships",
        "Automated campaign systems with global scalability"
      ]
    }
  ];

  return (
    <section id="journey" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Strategic Approach</h2>
          <div className="flex items-center justify-center gap-2 text-xl text-muted-foreground mb-4">
            <MapPin className="w-5 h-5" />
            <span>LDN → SYD → NYC</span>
          </div>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Proven methodologies developed across 16+ years of building businesses, scaling teams, and driving results across three continents
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {strategicPillars.map((pillar, index) => (
                  <Card key={index} className="border-l-4 border-l-primary border-r-0 border-t-0 border-b-0 rounded-l-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <pillar.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {pillar.methodologies.map((methodology, methodologyIndex) => (
                          <li key={methodologyIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {methodology}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Strategic Instincts</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Map future scenarios and competitive landscapes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Connect micro signals to macro opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Design winning PMF and scalable GTM</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Bridge technical depth with commercial execution</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Build teams that scale across cultures and time zones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;