import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Rocket, Award, MapPin } from 'lucide-react';

const ProofPoints = () => {
  const achievements = [
    {
      icon: TrendingUp,
      category: "Revenue Growth",
      metric: "7x Growth",
      context: "Major Media Broadcaster",
      description: "Led CTV and programmatic revenue transformation over 3 years"
    },
    {
      icon: Rocket,
      category: "Market Creation", 
      metric: "Zero-to-Millions",
      context: "AdTech APAC Launch",
      description: "Built programmatic advertising business from ground up"
    },
    {
      icon: Users,
      category: "Team Building",
      metric: "18-Person Team",
      context: "Cross-functional organization",
      description: "Scaled technical and commercial teams across three continents"
    },
    {
      icon: Target,
      category: "Strategic Advisory",
      metric: "M&A Guidance",
      context: "Portfolio transformations",
      description: "Advised companies through strategic acquisitions and exits"
    }
  ];

  const credentials = [
    "Former 30-Under-30",
    "Harvard Business School (Executive Programs)", 
    "Sydney Opera House Keynote Speaker",
    "Published Author, Speaker & Writer",
    "Ex-Microsoft Technical Account Manager",
    "First Global Automated Media Campaigns (2010)"
  ];

  const locations = [
    { city: "London", period: "2008-2013", role: "Microsoft Technical Foundation" },
    { city: "Sydney", period: "2013-2024", role: "AdTech Scale & Leadership" }, 
    { city: "New York", period: "2024-Present", role: "AI Strategy & Advisory" }
  ];

  return (
    <section id="proof-points" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Proof Points</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Measurable outcomes and recognized expertise across three continents
          </p>
        </div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {achievement.metric}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    {achievement.category}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {achievement.context}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Credentials */}
          <div className="lg:col-span-2">
            <h3 className="headline-md mb-6">Recognition & Credentials</h3>
            <p className="body-md text-muted-foreground mb-8">
              16+ years building revenue lines, scaling teams, and creating value through strategic AI implementation.
            </p>
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
            <h3 className="headline-md mb-6">Global Journey</h3>
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
                    <p className="text-xs text-muted-foreground">
                      {location.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofPoints;