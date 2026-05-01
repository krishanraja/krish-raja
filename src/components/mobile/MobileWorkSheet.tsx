import { Users, Building2, BookOpen, ArrowUpRight } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

const paths = [
  {
    icon: Users,
    title: 'AI Decision Cohort',
    eyebrow: 'Quarterly · $3,500 / seat',
    body: 'Three weeks, mostly async, fifteen senior leaders. Bring a nervous AI decision; leave with a board-ready answer.',
    cta: 'See the cohort',
    href: 'https://themindmaker.ai/cohort',
    primary: true,
  },
  {
    icon: Building2,
    title: 'Mindmaker enterprise',
    eyebrow: 'Signal Session $15k · Revenue Architecture $60k+',
    body: "If your company has AI capability but no clear commercial strategy, I help commercialize it.",
    cta: 'See enterprise offers',
    href: 'https://themindmaker.ai/enterprise',
    primary: false,
  },
  {
    icon: BookOpen,
    title: 'Read first',
    eyebrow: 'Free',
    body: "Techonomic is where I think out loud. Signal & Noise is where I interrogate peers. Start there if you're not ready for a call.",
    cta: 'Read Techonomic',
    href: 'https://www.techonomic.co',
    primary: false,
  },
];

interface MobileWorkSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileWorkSheet = ({ open, onOpenChange }: MobileWorkSheetProps) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="max-h-[85vh]">
      <div className="px-5 pt-4 pb-2">
        <DrawerTitle className="text-xl">Work with me</DrawerTitle>
        <DrawerDescription className="mt-1">Three ways in. Pick the one that fits.</DrawerDescription>
      </div>
      <ul
        className="px-4 pb-6 space-y-3 overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {paths.map((path) => {
          const Icon = path.icon;
          return (
            <li key={path.title}>
              <a
                href={path.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenChange(false)}
                className={`block rounded-2xl border p-4 mobile-tap-spring ${
                  path.primary
                    ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/10'
                    : 'bg-card border-border/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  <h3 className="mobile-h3 text-foreground">{path.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>
                <p className="text-[11px] uppercase tracking-wide text-primary/80 font-medium mb-1.5">
                  {path.eyebrow}
                </p>
                <p className="mobile-meta">{path.body}</p>
                <p className={`mt-3 text-sm font-semibold ${path.primary ? 'text-primary' : 'text-foreground'}`}>
                  {path.cta} →
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </DrawerContent>
  </Drawer>
);

export default MobileWorkSheet;
