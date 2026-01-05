import { ExternalLink, Briefcase, Rocket } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import all business icons
import mindmakerIcon from '@/assets/mindmaker-icon.png';
import builderEconomyIcon from '@/assets/builder-economy-icon.png';
import wellwellIcon from '@/assets/wellwell-icon.png';
import conclusivIcon from '@/assets/conclusiv-icon.png';
import rinoaIcon from '@/assets/rinoa-icon.png';
import ritualIcon from '@/assets/ritual-icon.png';
import swaamiIcon from '@/assets/swaami-icon.png';
import lockstepIcon from '@/assets/lockstep-icon.png';
import melioraIcon from '@/assets/meliora-icon.png';
import adfixusIcon from '@/assets/adfixus-icon.png';

interface Business {
  name: string;
  description: string;
  icon: string;
  url: string;
  role: string;
}

const consultingBusinesses: Business[] = [
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
    name: "Meliora",
    description: "GenAI transformation for telco, media and entertainment businesses",
    icon: melioraIcon,
    url: "https://www.meliora.company",
    role: "Lead Associate"
  },
  {
    name: "AdFixus",
    description: "Customer Identity and data infrastructure transformation for media enterprise",
    icon: adfixusIcon,
    url: "https://www.adfixus.com",
    role: "Enterprise Consultant"
  }
];

const buildingBusinesses: Business[] = [
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

const BusinessCard = ({ business, isMobile }: { business: Business; isMobile: boolean }) => (
  <a
    href={business.url}
    target="_blank"
    rel="noopener noreferrer"
    className={isMobile ? "flex-shrink-0 w-[260px] snap-start group" : "group"}
  >
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full relative">
      <ExternalLink className="absolute top-3 right-3 w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={isMobile ? "flex items-start gap-3" : "flex flex-col items-center text-center"}>
        <div className={isMobile ? "w-10 h-10 flex-shrink-0 flex items-center justify-center" : "w-14 h-14 flex items-center justify-center mb-3"}>
          <img 
            src={business.icon} 
            alt={`${business.name} icon`}
            className={isMobile ? "h-10 w-auto object-contain" : "h-14 w-auto object-contain"}
          />
        </div>
        <div className={isMobile ? "flex-1 min-w-0" : ""}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 text-sm">
            {business.name}
          </h3>
          <span className="text-xs text-primary/80 font-medium">{business.role}</span>
          <p className={`text-xs text-muted-foreground leading-relaxed ${isMobile ? 'mt-1.5 line-clamp-2' : 'mt-2'}`}>
            {business.description}
          </p>
        </div>
      </div>
    </div>
  </a>
);

const BusinessGrid = ({ businesses, isMobile }: { businesses: Business[]; isMobile: boolean }) => {
  if (isMobile) {
    return (
      <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {businesses.map((business, index) => (
          <BusinessCard key={index} business={business} isMobile={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {businesses.map((business, index) => (
        <BusinessCard key={index} business={business} isMobile={false} />
      ))}
    </div>
  );
};

const LivePortfolio = () => {
  const isMobile = useIsMobile();

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-10">
          <h2 className="headline-lg mb-4">Live Portfolio</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            10 ventures across consulting and building — explore what resonates
          </p>
        </div>

        <Tabs defaultValue="consulting" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted/30 p-1 rounded-full h-auto">
            <TabsTrigger 
              value="consulting" 
              className="rounded-full py-2.5 px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Briefcase size={15} />
              <span className={isMobile ? "hidden sm:inline" : ""}>Data & AI</span>
              <span className="sm:hidden">Consulting</span>
              <span className="hidden sm:inline">Consulting</span>
            </TabsTrigger>
            <TabsTrigger 
              value="building" 
              className="rounded-full py-2.5 px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Rocket size={15} />
              <span className={isMobile ? "hidden sm:inline" : ""}>Business</span>
              <span className="sm:hidden">Building</span>
              <span className="hidden sm:inline">Building</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consulting" className="animate-fade-in mt-0">
            <BusinessGrid businesses={consultingBusinesses} isMobile={isMobile} />
          </TabsContent>
          
          <TabsContent value="building" className="animate-fade-in mt-0">
            <BusinessGrid businesses={buildingBusinesses} isMobile={isMobile} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LivePortfolio;
