import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Journey = () => {
  const timelineItems = [
    {
      period: "2025–Present",
      location: "New York",
      role: "Founder, CEO – Fractionl AI",
      highlights: [
        "Architected AI agent-led GTM playbooks, shortening sales cycles by 40%",
        "Created thought leadership engine reaching 50+ paying clients",
        "Executive coaching & agent building with growing developer network"
      ]
    },
    {
      period: "2024–Present", 
      location: "New York",
      role: "AI & Data Strategy Consultant",
      highlights: [
        "Spearheaded U.S. market expansion closing $800K+ ARR in <6 months",
        "Built zero-to-one positioning for agentic AI products",
        "Supported roadmap and growth ops for scale-ups across multiple verticals"
      ]
    },
    {
      period: "2021–2024",
      location: "Sydney",
      role: "Managing Director, APAC – Captify",
      highlights: [
        "Launched business from $0 to $5.5M ARR with 18-person team",
        "Signed enterprise API contracts with tech, broadcaster, and CPG executives",
        "Designed AI-driven testing and GTM automation cutting outreach time by 60%"
      ]
    },
    {
      period: "2017–2020",
      location: "Sydney", 
      role: "Head of Platform Sales, APAC – Nexxen",
      highlights: [
        "Grew platform revenue from $4M to $38M annually",
        "Directed national sales across $55M+ pipeline",
        "Partnered with Solutions Engineering for multi-year RFP wins"
      ]
    },
    {
      period: "2014–2017",
      location: "Sydney",
      role: "Head of Data & Programmatic Sales – Nine Entertainment",
      highlights: [
        "Led GTM growing revenue from $9M to $61M total",
        "Pioneered industry-first authenticated CTV solutions", 
        "Launched 70+ commercial data and automation products"
      ]
    },
    {
      period: "2008–2013",
      location: "London",
      role: "Technical Account Manager – Microsoft",
      highlights: [
        "Coded automations saving EMEA teams weeks of manual labor",
        "Managed largest UK market patch delivering highest YoY uplift",
        "Built first global automated media campaigns in 2010"
      ]
    }
  ];

  return (
    <section id="journey" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Journey</h2>
          <div className="flex items-center justify-center gap-2 text-xl text-muted-foreground mb-8">
            <MapPin className="w-5 h-5" />
            <span>LDN → SYD → NYC</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              {timelineItems.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-primary border-r-0 border-t-0 border-b-0 rounded-l-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="font-semibold text-lg text-foreground">
                        {item.role}
                      </h3>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{item.period}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">My instincts</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Map future scenarios</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Connect micro to macro</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Design winning PMF and GTM</span>
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