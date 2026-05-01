import { useEffect, useRef, useState } from 'react';
import { Home, Compass, Layers, Award, BookOpen, Mic, Mail, Phone, ArrowRight } from 'lucide-react';

type Section = {
  id: string;
  label: string;
  icon: typeof Home;
};

const sections: Section[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'how-i-operate', label: 'Operate', icon: Compass },
  { id: 'portfolio', label: 'Portfolio', icon: Layers },
  { id: 'proof-points', label: 'Receipts', icon: Award },
  { id: 'writing', label: 'Writing', icon: BookOpen },
  { id: 'lightning-lessons', label: 'Lessons', icon: Mic },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface MobileActionDockProps {
  onOpenWork: () => void;
  onOpenContact: () => void;
}

const MobileActionDock = ({ onOpenWork, onOpenContact }: MobileActionDockProps) => {
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
      aria-label="Section navigation and primary actions"
    >
      {/* Top row: chip rail with all 7 sections */}
      <div
        ref={railRef}
        className="mobile-scroll-x flex gap-1.5 px-3 pt-2 pb-1.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {sections.map((section) => {
          const Icon = section.icon;
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

      {/* Bottom row: contact icon + persistent Work CTA */}
      <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
        <button
          type="button"
          onClick={onOpenContact}
          className="w-11 h-11 rounded-full bg-card border border-border/60 text-foreground flex items-center justify-center mobile-tap-spring flex-shrink-0"
          aria-label="Contact options"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onOpenWork}
          className="flex-1 h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm mobile-tap-spring"
        >
          Work with me
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileActionDock;
