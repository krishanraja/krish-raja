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
      description: "Helping leaders create their new personal working style alongside AI",
      icon: mindmakerIcon,
      url: "https://themindmaker.ai",
      role: "Founder"
    },
    {
      name: "The Builder Economy",
      description: "Conversations with leaders building with AI",
      icon: builderEconomyIcon,
      url: "https://thebuildereconomy.com",
      role: "Host"
    },
    {
      name: "WellWell",
      description: "Ancient Stoic philosophy for the modern workplace",
      icon: wellwellIcon,
      url: "https://wellwell.ai",
      role: "Founder"
    },
    {
      name: "Conclusiv",
      description: "From research to stunning business case in 60 seconds",
      icon: conclusivIcon,
      url: "https://conclusiv.ai",
      role: "Founder"
    },
    {
      name: "Rinoa",
      description: "Creating AI singers that jam with you to increase creativity",
      icon: rinoaIcon,
      url: "https://rinoa.ai",
      role: "Co-founder"
    },
    {
      name: "Ritual",
      description: "Helping partners to re-love one another with thoughtful weekly moments",
      icon: ritualIcon,
      url: "https://tryritual.co",
      role: "Founder"
    },
    {
      name: "Swaami",
      description: "Find neighbourhood locals willing to help you out for free",
      icon: swaamiIcon,
      url: "https://swaami.ai",
      role: "Founder"
    },
    {
      name: "Lockstep",
      description: "Arrange group events without any anxiety or chasing",
      icon: lockstepIcon,
      url: "https://inlockstep.ai",
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
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full relative">
                  <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      <img 
                        src={business.icon} 
                        alt={`${business.name} icon`}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {business.name}
                      </h3>
                      <span className="text-xs text-primary/80 font-medium">{business.role}</span>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
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
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full relative">
                  <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-4">
                      <img 
                        src={business.icon} 
                        alt={`${business.name} icon`}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {business.name}
                    </h3>
                    <span className="text-xs text-primary/80 font-medium mb-2">{business.role}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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
