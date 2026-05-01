import { useEffect, useState } from 'react';
import { Home, Compass, Layers, Award, MoreHorizontal, BookOpen, Mic, Briefcase, Mail, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

type Section = {
  id: string;
  label: string;
  icon: typeof Home;
};

const primary: Section[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'how-i-operate', label: 'Operate', icon: Compass },
  { id: 'portfolio', label: 'Portfolio', icon: Layers },
  { id: 'proof-points', label: 'Receipts', icon: Award },
];

const overflow: Section[] = [
  { id: 'writing', label: 'Writing & speaking', icon: BookOpen },
  { id: 'lightning-lessons', label: 'Lightning lessons', icon: Mic },
  { id: 'work-with-me', label: 'Work with me', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const allIds = [...primary, ...overflow].map((s) => s.id);

const MobileBottomNav = () => {
  const [activeId, setActiveId] = useState<string>(primary[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const targets = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const moreActive = overflow.some((s) => s.id === activeId);

  const renderTab = (section: Section, isActive: boolean) => {
    const Icon = section.icon;
    return (
      <a
        key={section.id}
        href={`#${section.id}`}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors ${
          isActive ? 'text-primary' : 'text-muted-foreground'
        }`}
        aria-current={isActive ? 'true' : undefined}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.4 : 1.8} />
        <span className="text-[10px] font-medium tracking-tight leading-none">{section.label}</span>
      </a>
    );
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Section navigation"
    >
      <div className="flex items-stretch h-14 max-w-md mx-auto">
        {primary.map((section) => renderTab(section, activeId === section.id))}

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors ${
                moreActive || drawerOpen ? 'text-primary' : 'text-muted-foreground'
              }`}
              aria-label="More sections"
            >
              <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={moreActive || drawerOpen ? 2.4 : 1.8} />
              <span className="text-[10px] font-medium tracking-tight leading-none">More</span>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex items-center justify-between px-5 pt-3 pb-1">
              <DrawerTitle className="text-base">Jump to</DrawerTitle>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="px-3 pb-6">
              {overflow.map((section) => {
                const Icon = section.icon;
                const isActive = activeId === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <span className="p-2 rounded-lg bg-muted/60">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-medium">{section.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
