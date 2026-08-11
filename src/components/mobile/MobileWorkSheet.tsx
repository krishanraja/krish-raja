import { ArrowUpRight } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { offer } from '@/content';
import { pick } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

interface MobileWorkSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileWorkSheet = ({ open, onOpenChange }: MobileWorkSheetProps) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="max-h-[85vh]">
      <div className="px-5 pt-4 pb-2">
        <DrawerTitle className="text-xl">{pick(offer.title, 'sheet')}</DrawerTitle>
        <DrawerDescription className="mt-1">{pick(offer.sub, 'sheet')}</DrawerDescription>
      </div>
      <ul
        className="px-4 pb-6 space-y-3 overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {offer.cards.map((path) => {
          const Icon = resolveIcon(path.icon);
          const title = pick(path.title, 'sheet');
          return (
            <li key={title}>
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
                  <h3 className="mobile-h3 text-foreground">{title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>
                {path.eyebrow && (
                  <p className="text-[11px] uppercase tracking-wide text-primary/80 font-medium mb-1.5">
                    {path.eyebrow}
                  </p>
                )}
                <p className="mobile-meta">{pick(path.body, 'sheet')}</p>
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
