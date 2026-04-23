import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Rocket, Award, MapPin } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

const ProofPoints = () => {
  const isMobile = useIsMobile();

  const achievements = [
    {
      icon: TrendingUp,
      category: "Revenue Growth",
      metric: "$9M → $61M",
      context: "Broadcaster Digital Transformation",
      description: "Led digital revenue 7x over 3 years. Triple-digit growth in 2 of 3 years. 70+ commercial products launched."
    },
    {
      icon: Rocket,
      category: "Market Creation",
      metric: "$0 → $12M ARR",
      context: "Built Region from Zero",
      description: "Launched APAC programmatic business from scratch: team, product, pipeline. First hire to market leader."
    },
    {
      icon: Users,
      category: "Team → Agent Fleet",
      metric: "18 People → 14 Agents",
      context: "From human team to autonomous OS",
      description: "Led an 18-person org across three continents. Now running a 14-agent fleet across multiple ventures. Built the org chart, then built the agent chart."
    },
    {
      icon: Target,
      category: "P&L Leadership",
      metric: "$55M P&L",
      context: "Data & Automation",
      description: "Ran full P&L for data and automation division. 22% EBITDA. Guided M&A and portfolio transformation."
    }
  ];

  const credentials = [
    "Founder, Mindmaker",
    "Writer, Techonomic Newsletter",
    "Harvard Business School (Finance, Analytics & Economics)",
    "MA Design Strategy (Distinction)",
    "Sydney Opera House Keynote Speaker",
    "Published Author, Speaker & Writer",
    "Ex-Microsoft Automation Specialist",
    "First Global Automated Media Campaigns (2010)"
  ];

  const locations = [
    {
      city: "London",
      period: "2008-2013",
      role: "From coding to customer success",
      story: "Started at Microsoft, learning what it takes to ship at enterprise scale. Coded the first global automated media campaigns years before the industry caught up."
    },
    {
      city: "Sydney",
      period: "2013-2024",
      role: "From Sales to Product & Corp Strategy",
      story: "Hired repeatedly to modernize legacy businesses and launch new revenue streams. Built regions, teams, and commercial systems from scratch."
    },
    {
      city: "New York",
      period: "2024-Present",
      role: "From commercial career to full-stack portfolio",
      story: "Now in Brooklyn, operating an autonomous AI business and advising companies commercializing theirs."
    }
  ];

  return (
    <section id="proof-points" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Sixteen years of receipts</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            The track record that informs the advice.
          </p>
        </div>

        {/* Key Achievements */}
        <div className="mb-12">
          <MobileCarousel
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            itemClassName="h-full"
            showDots={true}
            minHeight="carousel-sm"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm text-center h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1 break-words hyphens-auto">
                      {achievement.metric}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-2 break-words hyphens-auto">
                      {achievement.category}
                    </div>
                    <div className="text-xs text-muted-foreground mb-3 break-words hyphens-auto">
                      {achievement.context}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed break-words hyphens-auto">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </MobileCarousel>
        </div>

        {isMobile ? (
          <div className="space-y-12">
            {/* Global Experience */}
            <div>
              <h3 className="headline-md mb-8">Global Journey</h3>
              <MobileCarousel
                className="space-y-4"
                itemClassName="h-full"
                showDots={true}
                minHeight="carousel-xs"
              >
                {locations.map((location, index) => (
                  <Card key={index} className="border-0 shadow-sm bg-muted/30 h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div className="font-semibold text-sm">{location.city}</div>
                        <Badge variant="secondary" className="text-xs">
                          {location.period}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-foreground mb-1">
                        {location.role}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {location.story}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </MobileCarousel>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Credentials */}
            <div>
              <h3 className="headline-md mb-8">Recognition & Credentials</h3>
              <div className="flex flex-wrap gap-3">
                {credentials.map((credential, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm py-2 px-4 bg-background/50"
                  >
                    <Award className="w-3 h-3 mr-2" />
                    {credential}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Global Experience */}
            <div>
              <h3 className="headline-md mb-8">Global Journey</h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <Card key={index} className="border-0 shadow-sm bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div className="font-semibold text-sm">{location.city}</div>
                        <Badge variant="secondary" className="text-xs">
                          {location.period}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-foreground mb-1">
                        {location.role}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {location.story}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Credentials ticker - mobile only */}
        {isMobile && (
          <div className="mt-16 pt-12 border-t border-border/50">
            <h3 className="headline-sm text-center mb-4 text-muted-foreground">Recognition & Credentials</h3>
            <div className="relative overflow-hidden">
              <div className="flex gap-6 animate-[scroll-reverse_12s_linear_infinite]">
                {[...credentials, ...credentials].map((credential, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center gap-2 bg-background/50 border border-border rounded-full px-4 py-1.5">
                    <Award className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-foreground whitespace-nowrap">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProofPoints;
