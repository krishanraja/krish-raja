import { RefreshCw } from 'lucide-react';
import MobileSection from './MobileSection';
import { operate } from '@/content';
import { icon as resolveIcon } from '@/lib/icon-map';

const MobilePhilosophy = () => (
  <MobileSection
    id={operate.id}
    title={operate.title}
    intro={operate.sub}
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

    {/* Same card as its neighbours.
        This was a blue gradient panel with a blue rule down the left and
        numbered blue discs hanging off it, which made one block on the page
        speak a visual language nothing else spoke, and the rule collided with
        the discs at every step. A flywheel is a cycle, so the steps read as a
        wrapped run of chips with arrows between them rather than a ranked
        list that stops at four. */}
    <div className="mt-5 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <RefreshCw className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
        <h3 className="mobile-h3">{operate.flywheel.title}</h3>
      </div>
      {/* The step number sits inside the chip. Every point is long enough to
          take a line of its own at phone width, so connecting arrows between
          them ended up dangling in empty space at the end of each row. */}
      <ol className="flex flex-col items-start gap-1.5">
        {operate.flywheel.points.map((point, i) => (
          <li
            key={i}
            className="flex items-baseline gap-2 rounded-full bg-muted/70 py-1 pl-2.5 pr-3"
          >
            <span className="text-[11px] font-semibold tabular-nums text-primary">{i + 1}</span>
            <span className="text-[12.5px] leading-snug text-foreground">{point}</span>
          </li>
        ))}
      </ol>
    </div>
  </MobileSection>
);

export default MobilePhilosophy;
