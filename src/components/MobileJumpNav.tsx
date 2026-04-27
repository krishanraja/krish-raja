import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'how-i-operate', label: 'Operate' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'proof-points', label: 'Receipts' },
  { id: 'writing', label: 'Writing' },
  { id: 'lightning-lessons', label: 'Lessons' },
  { id: 'work-with-me', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const MobileJumpNav = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const navRef = useRef<HTMLDivElement>(null);

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
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeEl = nav.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-background/95 backdrop-blur border-t border-border"
      role="navigation"
      aria-label="Section quick nav"
    >
      <div
        ref={navRef}
        className="flex overflow-x-auto gap-1.5 px-3 py-2 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileJumpNav;
