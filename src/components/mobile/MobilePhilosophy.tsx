import { RefreshCw } from 'lucide-react';
import MobileSection from './MobileSection';
import { operate } from '@/content';
import { pick } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

const MobilePhilosophy = () => (
  <MobileSection
    id={operate.id}
    eyebrow={operate.eyebrow}
    title={pick(operate.title, 'mobile')}
    intro={pick(operate.sub, 'mobile')}
    tone="muted"
  >
    <ul className="space-y-2.5">
      {operate.pillars.map((p, i) => {
        const Icon = resolveIcon(p.icon);
        return (
          <li
            key={i}
            className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="mobile-h3 text-foreground mb-1">{p.title}</h3>
                <p className="mobile-meta">{p.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>

    <div className="mt-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 rounded-lg bg-primary/15">
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
        </span>
        <h3 className="mobile-h3">{operate.flywheel.title}</h3>
      </div>
      <ol className="relative pl-5 space-y-2.5 border-l border-primary/30">
        {operate.flywheel.points.map((point, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[22px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-semibold">
              {i + 1}
            </span>
            <p className="text-[13px] leading-snug text-foreground">{point}</p>
          </li>
        ))}
      </ol>
    </div>
  </MobileSection>
);

export default MobilePhilosophy;
