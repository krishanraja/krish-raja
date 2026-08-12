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
    {/* A rail, not a stack. Four cards read side by side in the height of one,
        which is the difference between this section costing a screen and
        costing a swipe. Same pattern as the OS section and the receipts. */}
    <ul className="mobile-snap-track -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
      {operate.pillars.map((p, i) => {
        const Icon = resolveIcon(p.icon);
        return (
          <li
            key={i}
            className="mobile-snap-item w-[78%] max-w-[300px] flex-shrink-0 rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
          >
            <span className="mb-3 inline-flex rounded-lg bg-primary/10 p-2">
              <Icon className="h-4 w-4 text-primary" />
            </span>
            <h3 className="mobile-h3 mb-1 text-foreground">{p.title}</h3>
            <p className="mobile-meta">{p.body}</p>
          </li>
        );
      })}
    </ul>

    <div className="mt-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4">
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
