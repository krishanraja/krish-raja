import { useState } from 'react';
import { Briefcase, Rocket, Mic, ExternalLink } from 'lucide-react';
import MobileSection from './MobileSection';
import { Badge } from '@/components/ui/badge';

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
  invertOnDark?: boolean;
}

const adviseBusinesses: Business[] = [
  { name: 'Mindmaker', description: 'Helping leaders create their new personal working style alongside AI', icon: mindmakerIcon, url: 'https://themindmaker.ai', role: 'CEO & Founder' },
  { name: 'Meliora', description: 'GenAI transformation for telco, media and entertainment businesses', icon: melioraIcon, url: 'https://www.meliora.company', role: 'Associate' },
  { name: 'AdFixus', description: 'Customer Identity and data infrastructure transformation for media enterprise', icon: adfixusIcon, url: 'https://www.adfixus.com', role: 'Fractional SVP: Enterprise' },
];

const buildBusinesses: Business[] = [
  { name: 'Fractionl Circle', description: 'The AI-powered matchmaker between your network, ideas and customers.', icon: fractionlIcon, url: 'https://fractionl.ai', role: 'Full-Stack Founder', isBeta: true },
  { name: 'Fractionl Pulse', description: 'Live unique market intelligence tracking fractional supply and demand trends.', icon: fractionlIcon, url: 'https://fractionl.ai', role: 'Full-Stack Founder', isBeta: true },
  { name: 'Ctrl', description: 'Build your portable, private memory web to accelerate your future with AI', icon: ctrlIcon, url: 'https://ctrl.themindmaker.ai', role: 'Full-Stack Founder', isBeta: true },
];

const writeBusinesses: Business[] = [
  { name: 'Techonomic', description: 'Strategic insights on AI, data commercialization, and revenue growth for executives', icon: techonomicLogo, url: 'https://www.techonomic.co', role: 'Writer', invertOnDark: true },
  { name: 'Signal & Noise', description: 'Conversations with world-class media operators exploring how AI is reshaping the industry', icon: signalAndNoiseLogo, url: 'https://www.mediaradar.com/signal-and-noise', role: 'AI Host', invertOnDark: true },
  { name: 'The Builder Economy', description: 'Conversations with leaders building with AI', icon: builderEconomyIcon, url: 'https://thebuildereconomy.com', role: 'Host' },
];

type LaneId = 'advise' | 'build' | 'write';

const lanes: { id: LaneId; label: string; icon: typeof Briefcase; data: Business[] }[] = [
  { id: 'advise', label: 'Advise', icon: Briefcase, data: adviseBusinesses },
  { id: 'build', label: 'Build', icon: Rocket, data: buildBusinesses },
  { id: 'write', label: 'Write', icon: Mic, data: writeBusinesses },
];

const BusinessRow = ({ business }: { business: Business }) => (
  <a
    href={business.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-card border border-border/60 rounded-2xl p-4 shadow-sm active:bg-muted/50 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-lg bg-muted/40 flex items-center justify-center flex-shrink-0">
        <img
          src={business.icon}
          alt={`${business.name} icon`}
          loading="lazy"
          decoding="async"
          className={`h-7 w-auto object-contain ${
            business.invertOnDark ? 'dark:brightness-200 dark:invert' : 'dark:brightness-110'
          }`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <h3 className="text-sm font-semibold text-foreground">{business.name}</h3>
          {business.isBeta && (
            <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 text-[9px] px-1.5 py-0 leading-4">
              Beta
            </Badge>
          )}
          <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto flex-shrink-0" />
        </div>
        <p className="text-[11px] font-medium text-primary/80 mb-1">{business.role}</p>
        <p className="text-[12.5px] leading-snug text-muted-foreground">{business.description}</p>
      </div>
    </div>
  </a>
);

const MobilePortfolio = () => {
  const [active, setActive] = useState<LaneId>('advise');
  const lane = lanes.find((l) => l.id === active)!;

  return (
    <MobileSection
      id="portfolio"
      eyebrow="Portfolio"
      title="Three lanes, one flywheel"
      intro="Advising, building, writing. Each one feeds the others."
    >
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-muted/40 mb-4">
        {lanes.map((l) => {
          const Icon = l.icon;
          const isActive = l.id === active;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setActive(l.id)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium transition-colors ${
                isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {l.label}
            </button>
          );
        })}
      </div>

      <ul className="space-y-2.5">
        {lane.data.map((b, i) => (
          <li key={i}>
            <BusinessRow business={b} />
          </li>
        ))}
      </ul>
    </MobileSection>
  );
};

export default MobilePortfolio;
