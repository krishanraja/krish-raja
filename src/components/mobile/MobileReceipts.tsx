import { useState } from 'react';
import { TrendingUp, Users, Target, Rocket, Award, MapPin } from 'lucide-react';
import MobileSection from './MobileSection';
import { Badge } from '@/components/ui/badge';

const achievements = [
  { icon: TrendingUp, category: 'Revenue Growth', metric: '$9M → $61M', context: 'Broadcaster Digital Transformation', description: 'Led digital revenue 7x over 3 years. Triple-digit growth in 2 of 3 years. 70+ commercial products launched.' },
  { icon: Rocket, category: 'Market Creation', metric: '$0 → $12M ARR', context: 'Built Region from Zero', description: 'Launched APAC programmatic from scratch: team, product, pipeline. First hire to market leader.' },
  { icon: Users, category: 'Team → Agent Fleet', metric: '18 People → 14 Agents', context: 'From human team to autonomous OS', description: 'Led an 18-person org across three continents. Now running a 14-agent fleet across multiple ventures.' },
  { icon: Target, category: 'P&L Leadership', metric: '$55M P&L', context: 'Data & Automation', description: 'Ran full P&L for data and automation division. 22% EBITDA. Guided M&A and portfolio transformation.' },
];

const credentials = [
  'Founder, Mindmaker',
  'Writer, Techonomic Newsletter',
  'Harvard Business School',
  'MA Design Strategy (Distinction)',
  'Sydney Opera House Keynote',
  'Published Author & Speaker',
  'Ex-Microsoft Automation Specialist',
  'First Global Automated Media Campaigns (2010)',
];

const locations = [
  { city: 'London', period: '2008-2013', role: 'From coding to customer success', story: 'Started at Microsoft, learning what it takes to ship at enterprise scale. Coded the first global automated media campaigns years before the industry caught up.' },
  { city: 'Sydney', period: '2013-2024', role: 'From Sales to Product & Corp Strategy', story: 'Hired repeatedly to modernize legacy businesses and launch new revenue streams. Built regions, teams, and commercial systems from scratch.' },
  { city: 'New York', period: '2024-Present', role: 'From career to full-stack portfolio', story: 'Now in Brooklyn, operating an autonomous AI business and advising companies commercializing theirs.' },
];

type Tab = 'receipts' | 'journey' | 'credentials';

const MobileReceipts = () => {
  const [tab, setTab] = useState<Tab>('receipts');

  return (
    <MobileSection
      id="proof-points"
      eyebrow="Receipts"
      title="Sixteen years of proof"
      intro="The track record that informs the advice."
    >
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-muted/40 mb-4">
        {(['receipts', 'journey', 'credentials'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`py-2 rounded-full text-xs font-medium capitalize transition-colors ${
              tab === t ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'receipts' && (
        <div className="-mx-5 px-5 mobile-snap-track flex gap-3 overflow-x-auto pb-2">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <article
                key={i}
                className="mobile-snap-item flex-shrink-0 w-[78%] bg-card border border-border/60 rounded-2xl p-5 shadow-sm"
              >
                <span className="inline-flex p-2.5 rounded-full bg-primary/10 mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </span>
                <div className="text-2xl font-bold text-primary leading-tight mb-1">{a.metric}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{a.category}</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">{a.context}</div>
                <p className="text-[12.5px] leading-snug text-muted-foreground">{a.description}</p>
              </article>
            );
          })}
        </div>
      )}

      {tab === 'journey' && (
        <ol className="relative pl-6 space-y-4 border-l border-border/60">
          {locations.map((l, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[27px] top-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                <MapPin className="w-3 h-3" />
              </span>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-sm font-semibold">{l.city}</h3>
                <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{l.period}</Badge>
              </div>
              <p className="text-[12.5px] font-medium text-foreground mb-1">{l.role}</p>
              <p className="text-[12.5px] leading-snug text-muted-foreground">{l.story}</p>
            </li>
          ))}
        </ol>
      )}

      {tab === 'credentials' && (
        <ul className="grid grid-cols-1 gap-2">
          {credentials.map((c, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-card border border-border/60"
            >
              <Award className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-[13px] text-foreground">{c}</span>
            </li>
          ))}
        </ul>
      )}
    </MobileSection>
  );
};

export default MobileReceipts;
