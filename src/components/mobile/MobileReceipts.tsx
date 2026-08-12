import { useState } from 'react';
import { Award, MapPin } from 'lucide-react';
import MobileSection from './MobileSection';
import { Badge } from '@/components/ui/badge';
import { receipts } from '@/content';
import { icon as resolveIcon } from '@/lib/icon-map';

type Tab = 'receipts' | 'journey' | 'credentials';

const MobileReceipts = () => {
  const [tab, setTab] = useState<Tab>('receipts');

  return (
    <MobileSection
      id={receipts.id}
      title={receipts.title}
      intro={receipts.sub}
    >
      <div className="sticky top-11 z-20 -mx-1 mb-4 py-1 mobile-dock-blur rounded-full">
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-muted/40">
          {(['receipts', 'journey', 'credentials'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`h-11 rounded-full text-xs font-medium capitalize mobile-tap-spring transition-colors ${
                tab === t ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {receipts.tabs[t]}
            </button>
          ))}
        </div>
      </div>

      {tab === 'receipts' && (
        <>
          <div className="-mx-5 px-5 mobile-snap-track flex gap-3 overflow-x-auto pb-2">
            {receipts.achievements.map((a, i) => {
              const Icon = resolveIcon(a.icon);
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

          {/* The advisory entry was desktop-only until 12 Aug 2026. It is one
              anonymized card now, short enough to sit under the carousel
              rather than need a tab of its own. */}
          {receipts.engagements.map((e) => (
            <article key={e.name} className="mt-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">{e.name}</h3>
              <p className="text-[11px] font-medium text-primary/80 mb-1.5">{e.role}</p>
              <p className="text-[12.5px] leading-snug text-muted-foreground">{e.description}</p>
            </article>
          ))}
        </>
      )}

      {tab === 'journey' && (
        <ol className="relative pl-6 space-y-4 border-l border-border/60">
          {receipts.journey.map((l, i) => (
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
          {receipts.credentials.map((c, i) => (
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
