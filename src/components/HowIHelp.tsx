import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Users, Rocket, TrendingUp, Target, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const HowIHelp = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
      detailedOutcomes: [
        "Transform complex AI capabilities into clear competitive advantages and board-ready strategic initiatives",
        "Design revenue architecture that scales across multiple markets and business units",
        "Build high-performing, cross-cultural teams spanning technical, commercial, and strategic functions",
        "Provide executive guidance on AI investment priorities, market timing, and strategic positioning"
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
      detailedOutcomes: [
        "Develop product roadmaps that leverage AI as a core differentiator, not just a feature add-on",
        "Create systematic go-to-market frameworks that reduce time-to-market and increase conversion rates",
        "Design market expansion strategies based on data-driven market analysis and competitive intelligence",
        "Build self-reinforcing growth loops that compound user engagement and revenue generation"
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
      detailedOutcomes: [
        "Implement intelligent sales workflows that eliminate manual prospecting while maintaining personalization",
        "Design revenue operations systems that provide predictable forecasting and clear growth levers",
        "Optimize pipeline management through data-driven lead scoring and opportunity prioritization",
        "Systematically improve conversion rates at every stage of the sales funnel through behavioral analysis"
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
      detailedOutcomes: [
        "Provide comprehensive market analysis combining technical feasibility with commercial viability assessment",
        "Deliver competitive intelligence that identifies white space opportunities and strategic positioning gaps",
        "Develop compelling investment narratives that connect technical capabilities to measurable business outcomes",
        "Optimize investment timing through macro trend analysis and competitive landscape monitoring"
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

        <MobileCarousel 
          className="grid md:grid-cols-2 gap-8 items-stretch"
          itemClassName="h-full"
          showDots={true}
          minHeight="carousel-2xl"
        >
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const isExpanded = expandedCard === index;
            
            return (
              <Card key={index} className="card-hover border-0 shadow-sm bg-card/50 backdrop-blur-sm group h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{audience.title}</CardTitle>
                  </div>
                    <p className="text-muted-foreground leading-relaxed break-words hyphens-auto">
                      {audience.oneLiner}
                    </p>
                  
                  {/* Achievement Highlight */}
                  <div className="bg-muted/30 rounded-lg p-3 mt-4">
                    <div className="text-lg font-semibold text-primary">{audience.metric}</div>
                    <div className="text-xs text-muted-foreground">{audience.context}</div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    {audience.outcomes.map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground leading-relaxed break-words hyphens-auto">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <Collapsible open={isExpanded} onOpenChange={() => setExpandedCard(isExpanded ? null : index)}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <span className="text-sm">
                          {isExpanded ? 'Show Less' : 'Learn More'}
                        </span>
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-sm text-primary mb-3">How I Deliver These Outcomes:</h4>
                        {audience.detailedOutcomes.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 flex-shrink-0"></div>
                            <p className="text-sm text-muted-foreground leading-relaxed break-words hyphens-auto">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                   </Collapsible>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
};

export default HowIHelp;