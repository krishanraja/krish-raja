import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Import all business icons
import mindmakerIcon from '@/assets/mindmaker-logo.png';
import builderEconomyIcon from '@/assets/builder-economy-icon.png';
import wellwellIcon from '@/assets/wellwell-icon.png';
import conclusivIcon from '@/assets/conclusiv-icon.png';
import rinoaIcon from '@/assets/rinoa-icon.png';
import ritualIcon from '@/assets/ritual-icon.png';
import swaamiIcon from '@/assets/swaami-icon.png';
import lockstepIcon from '@/assets/lockstep-icon.png';

interface Business {
  name: string;
  description: string;
  icon: string;
  url: string;
  role: string;
}

const LivePortfolio = () => {
  const isMobile = useIsMobile();

  const businesses: Business[] = [
    {
      name: "Mindmaker",
      description: "AI Literacy programs for commercial leaders",
      icon: mindmakerIcon,
      url: "https://themindmaker.ai",
      role: "Founder"
    },
    {
      name: "The Builder Economy",
      description: "Podcast for AI-enabled entrepreneurs",
      icon: builderEconomyIcon,
      url: "https://thebuildereconomy.com",
      role: "Host"
    },
    {
      name: "WellWell",
      description: "Wellness tracking reimagined",
      icon: wellwellIcon,
      url: "https://wellwell.app",
      role: "Founder"
    },
    {
      name: "Conclusiv",
      description: "Decision intelligence platform",
      icon: conclusivIcon,
      url: "https://conclusiv.ai",
      role: "Founder"
    },
    {
      name: "Rinoa",
      description: "Music AI technology",
      icon: rinoaIcon,
      url: "https://rinoa.ai",
      role: "Co-founder"
    },
    {
      name: "Ritual",
      description: "Habit formation made effortless",
      icon: ritualIcon,
      url: "https://ritual.app",
      role: "Founder"
    },
    {
      name: "Swaami",
      description: "Spiritual wellness companion",
      icon: swaamiIcon,
      url: "https://swaami.app",
      role: "Founder"
    },
    {
      name: "Lockstep",
      description: "Team alignment automation",
      icon: lockstepIcon,
      url: "https://lockstep.app",
      role: "Founder"
    }
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Live Portfolio</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            8 products I'm actively building — shipping fast, learning publicly, compounding value
          </p>
        </div>

        {isMobile ? (
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {businesses.map((business, index) => (
              <a
                key={index}
                href={business.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[280px] snap-start group"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      <img 
                        src={business.icon} 
                        alt={`${business.name} icon`}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {business.name}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                      <span className="text-xs text-primary/80 font-medium">{business.role}</span>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {business.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businesses.map((business, index) => (
              <a
                key={index}
                href={business.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-4">
                      <img 
                        src={business.icon} 
                        alt={`${business.name} icon`}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {business.name}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-primary/80 font-medium mb-2">{business.role}</span>
                    <p className="text-sm text-muted-foreground">
                      {business.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LivePortfolio;
