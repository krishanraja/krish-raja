import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { nav } from '@/content';
import { icon as resolveIcon } from '@/lib/icon-map';

const sections = nav.dockItems;

interface MobileActionDockProps {
  onOpenContact: () => void;
}

const MobileActionDock = ({ onOpenContact }: MobileActionDockProps) => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const chip = rail.querySelector<HTMLAnchorElement>(`a[data-section="${activeId}"]`);
    if (chip) {
      chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 mobile-dock-blur border-t border-border/60"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      role="navigation"
      aria-label={nav.dockAria}
    >
      {/* Clamped to match the shell. Inert at phone widths. */}
      <div className="mx-auto w-full max-w-[34rem]">
      {/* Top row: chip rail with every section */}
      <div
        ref={railRef}
        className="mobile-scroll-x flex gap-1.5 px-3 pt-2 pb-1.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {sections.map((section) => {
          const Icon = resolveIcon(section.icon);
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-section={section.id}
              aria-current={isActive ? 'true' : undefined}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12px] font-medium mobile-tap-spring transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={isActive ? 2.4 : 1.8} />
              {section.label}
            </a>
          );
        })}
      </div>

      {/* Bottom row: one CTA. It was a phone icon opening the contact sheet
          next to a Work CTA opening a work sheet; both destinations merged on
          12 Aug 2026, so two controls doing the same thing became one. */}
      <div className="flex items-center px-3 pb-2.5 pt-1">
        <button
          type="button"
          onClick={onOpenContact}
          aria-label={nav.contactAria}
          className="flex-1 h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm mobile-tap-spring"
        >
          {nav.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default MobileActionDock;
