import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { contact, site } from '@/content';
import { icon as resolveIcon } from '@/lib/icon-map';

interface MobileContactSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileContactSheet = ({ open, onOpenChange }: MobileContactSheetProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast.success(contact.copySuccess);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(contact.copyError);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="px-5 pt-4 pb-2">
          <DrawerTitle className="text-xl">{contact.title}</DrawerTitle>
          <DrawerDescription className="mt-1">
            {contact.sub}
          </DrawerDescription>
        </div>
        <ul
          className="px-4 pb-6 space-y-2"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {contact.links.map((link) => {
            const Icon = resolveIcon(link.sheetIcon ?? link.icon);
            return (
              <li key={link.action}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={() => onOpenChange(false)}
                  className="mobile-tap-row mobile-tap-spring group"
                >
                  <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] font-medium text-foreground">
                      {link.action}
                    </span>
                    <span className="block text-[11px] text-muted-foreground truncate">{link.detail}</span>
                  </span>
                  {link.copyable ? (
                    <button
                      type="button"
                      onClick={onCopy}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 mobile-tap-spring flex-shrink-0"
                      aria-label={contact.copyLabel}
                    >
                      {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </button>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileContactSheet;
