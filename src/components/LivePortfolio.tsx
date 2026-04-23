import { ExternalLink, Briefcase, Rocket, Mic } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

import mindmakerIcon from '@/assets/mindmaker-icon.png';
import fractionlIcon from '@/assets/fractionl-icon.png';
import ctrlIcon from '@/assets/ctrl-icon.png';
import melioraIcon from '@/assets/meliora-icon.png';
import adfixusIcon from '@/assets/adfixus-icon.png';
import techonomicLogo from '@/assets/techonomic-logo.png';
import signalAndNoiseLogo from '@/assets/signal-and-noise-logo.png';
import builderEconomyIcon from '@/assets/builder-economy-icon.png';

interface Business {
  name: string;
  description: string;
  icon: string;
  url: string;
  role: string;
  isBeta?: boolean;
}

const adviseBusinesses: Business[] = [
  {
    name: "Mindmaker",
    description: "Helping leaders create their new personal working style alongside AI",
    icon: mindmakerIcon,
    url: "https://themindmaker.ai",
    role: "CEO & Founder"
  },
  {
    name: "Meliora",
    description: "GenAI transformation for telco, media and entertainment businesses",
    icon: melioraIcon,
    url: "https://www.meliora.company",
    role: "Associate"
  },
  {
    name: "AdFixus",
    description: "Customer Identity and data infrastructure transformation for media enterprise",
    icon: adfixusIcon,
    url: "https://www.adfixus.com",
    role: "Fractional SVP: Enterprise"
  }
];

const buildBusinesses: Business[] = [
  {
    name: "Fractionl Circle",
    description: "The AI-powered matchmaker between your network, ideas and customers.",
    icon: fractionlIcon,
    url: "https://fractionl.ai",
    role: "Full-Stack Founder",
    isBeta: true
  },
  {
    name: "Fractionl Pulse",
    description: "Live unique market intelligence tracking fractional supply and demand trends.",
    icon: fractionlIcon,
    url: "https://fractionl.ai",
    role: "Full-Stack Founder",
    isBeta: true
  },
  {
    name: "Ctrl",
    description: "Build your portable, private memory web to accelerate your future with AI",
    icon: ctrlIcon,
    url: "https://ctrl.themindmaker.ai",
    role: "Full-Stack Founder",
    isBeta: true
  }
];

const writeBusinesses: Business[] = [
  {
    name: "Techonomic",
    description: "Strategic insights on AI, data commercialization, and revenue growth for executives",
    icon: techonomicLogo,
    url: "https://www.techonomic.co",
    role: "Writer"
  },
  {
    name: "Signal & Noise",
    description: "Conversations with world-class media operators exploring how AI is reshaping the industry",
    icon: signalAndNoiseLogo,
    url: "https://www.mediaradar.com/signal-and-noise",
    role: "AI Host"
  },
  {
    name: "The Builder Economy",
    description: "Conversations with leaders building with AI",
    icon: builderEconomyIcon,
    url: "https://thebuildereconomy.com",
    role: "Host"
  }
];

const BusinessCard = ({ business, isMobile }: { business: Business; isMobile: boolean }) => {
  const isLargerLogo = business.name === "Techonomic" || business.name === "Signal & Noise";

  return (
    <a
      href={business.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full min-h-[160px] relative">
        <ExternalLink className="absolute top-3 right-3 w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        {business.isBeta && (
          <Badge className="absolute top-3 left-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0.5">
            Beta
          </Badge>
        )}
        <div className={isMobile ? "flex items-start gap-3" : "flex flex-col items-center text-center"}>
          <div className={isMobile
            ? "w-12 h-12 flex-shrink-0 flex items-center justify-center"
            : "h-20 flex items-end justify-center mb-3"}>
            <div className="rounded-lg p-1.5 bg-white/0 dark:bg-white/10 backdrop-blur-[2px] transition-colors duration-300">
              <img
                src={business.icon}
                alt={`${business.name} icon`}
                loading="lazy"
                decoding="async"
                className={`${isMobile
                  ? `${isLargerLogo ? 'h-8' : 'h-8'}`
                  : `${isLargerLogo ? 'h-12' : 'h-12'}`} w-auto object-contain ${isLargerLogo ? 'dark:brightness-200 dark:invert' : 'dark:brightness-110 dark:contrast-105'} transition-all duration-300`}
              />
            </div>
          </div>
          <div className={isMobile ? "flex-1 min-w-0" : ""}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 text-sm">
              {business.name}
            </h3>
            <span className="text-xs text-primary/80 font-medium">{business.role}</span>
            <p className={`text-xs text-muted-foreground leading-relaxed ${isMobile ? 'mt-1.5' : 'mt-2'}`}>
              {business.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

const BusinessGrid = ({ businesses, isMobile }: { businesses: Business[]; isMobile: boolean }) => {
  return (
    <MobileCarousel
      className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      showDots={true}
      uniformHeight={false}
    >
      {businesses.map((business, index) => (
        <BusinessCard key={index} business={business} isMobile={isMobile} />
      ))}
    </MobileCarousel>
  );
};

const LivePortfolio = () => {
  const isMobile = useIsMobile();

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-10">
          <h2 className="headline-lg mb-4">The portfolio</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Three lanes: advising, building, writing. Each one feeds the others.
          </p>
        </div>

        <Tabs defaultValue="advise" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8 bg-muted/30 p-1 rounded-full h-auto">
            <TabsTrigger
              value="advise"
              className="rounded-full py-2.5 px-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <Briefcase size={14} />
              <span>Advise</span>
            </TabsTrigger>
            <TabsTrigger
              value="build"
              className="rounded-full py-2.5 px-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <Rocket size={14} />
              <span>Build</span>
            </TabsTrigger>
            <TabsTrigger
              value="write"
              className="rounded-full py-2.5 px-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <Mic size={14} />
              <span>Write</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advise" className="animate-fade-in mt-0">
            <BusinessGrid businesses={adviseBusinesses} isMobile={isMobile} />
          </TabsContent>

          <TabsContent value="build" className="animate-fade-in mt-0">
            <BusinessGrid businesses={buildBusinesses} isMobile={isMobile} />
          </TabsContent>

          <TabsContent value="write" className="animate-fade-in mt-0">
            <BusinessGrid businesses={writeBusinesses} isMobile={isMobile} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LivePortfolio;
