import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Rocket, Award, MapPin } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import nineLogo from '@/assets/nine_logo.png';
import mccannLogo from '@/assets/mccann_logo.png';
import captifyLogo from '@/assets/captify_logo.png';
import singtelLogo from '@/assets/singtel_logo.png';
import bbcLogo from '@/assets/bbc_logo.png';
import microsoftLogo from '@/assets/microsoft_logo.png';

// Preload all company logos for instant display
const allLogos = [nineLogo, mccannLogo, captifyLogo, singtelLogo, bbcLogo, microsoftLogo];

const preloadLogos = () => {
  allLogos.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const ProofPoints = () => {
  const isMobile = useIsMobile();

  // Preload logos on mount
  useEffect(() => {
    preloadLogos();
  }, []);

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
    "Former 30 Under 30",
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
      role: "Where it started",
      story: "Started at Microsoft, learning what it takes to ship at enterprise scale. Coded the first global automated media campaigns years before the industry caught up."
    },
    { 
      city: "Sydney", 
      period: "2013-2024", 
      role: "Modernizing legacy, launching new",
      story: "Hired repeatedly to modernize legacy businesses and launch new revenue streams. Built regions, teams, and commercial systems from scratch."
    },
    { 
      city: "New York", 
      period: "2024-Present", 
      role: "Building what's next",
      story: "Now in Brooklyn, combining everything into teaching, advising, and building with AI."
    }
  ];

  const logos = [
    { src: nineLogo, alt: "Nine" },
    { src: mccannLogo, alt: "McCann" },
    { src: captifyLogo, alt: "Captify" },
    { src: singtelLogo, alt: "Singtel" },
    { src: bbcLogo, alt: "BBC" },
    { src: microsoftLogo, alt: "Microsoft" }
  ];

  return (
    <section id="proof-points" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Growth & Transformation Wins</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Building from 0 &gt; 1 to grow or transform businesses.
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

        {/* Company Logos */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <h3 className="headline-sm text-center mb-8 text-muted-foreground">Global Experience in media, tech, data & telco</h3>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-[scroll_4s_linear_infinite] md:animate-[scroll_6.5s_linear_infinite] hover:[animation-play-state:paused]">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofPoints;
