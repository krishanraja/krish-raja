import { useEffect, useState } from 'react';
import { nav } from '@/content';
import { icon as resolveIcon } from '@/lib/icon-map';

const sections = nav.dockItems;

interface MobileActionDockProps {
  onOpenContact: () => void;
}

/**
 * One row, five slots, nothing scrolls.
 *
 * It used to be a rail of nine chips that scrolled sideways under a full-width
 * "Get in touch" button, so the dock stood two rows tall, five of its nine
 * destinations sat off-screen, and it spent 110px of permanent height
 * restating headings the page shows anyway. Contact is the fifth slot and the
 * accent one, because the site has exactly one ask.
 */
const MobileActionDock = ({ onOpenContact }: MobileActionDockProps) => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

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

  const Mail = resolveIcon('mail');

  return (
    <div
      className="mobile-dock-blur fixed bottom-0 inset-x-0 z-40 border-t border-border/60"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      role="navigation"
      aria-label={nav.dockAria}
    >
      {/* Clamped to match the shell. Inert at phone widths. */}
      <div className="mx-auto grid w-full max-w-[34rem] grid-cols-5 px-1 py-1.5">
        {sections.map((section) => {
          const Icon = resolveIcon(section.icon);
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`mobile-tap-spring flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
              {section.label}
            </a>
          );
        })}

        <button
          type="button"
          onClick={onOpenContact}
          aria-label={nav.contactAria}
          className="mobile-tap-spring flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-semibold text-primary"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mail className="h-3 w-3" strokeWidth={2.4} />
          </span>
          {nav.ctaLabel}
        </button>
      </div>
    </div>
  );
};

export default MobileActionDock;
