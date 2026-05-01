import { Mail, Linkedin, Calendar, Copy, Check, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

interface MobileContactSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EMAIL = 'hello@krishraja.com';

const MobileContactSheet = ({ open, onOpenChange }: MobileContactSheetProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success('Email copied');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="px-5 pt-4 pb-2">
          <DrawerTitle className="text-xl">Get in touch</DrawerTitle>
          <DrawerDescription className="mt-1">
            For speaking, writing, or a direct line.
          </DrawerDescription>
        </div>
        <ul
          className="px-4 pb-6 space-y-2"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="mobile-tap-row mobile-tap-spring group"
              onClick={() => onOpenChange(false)}
            >
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Email</span>
                <span className="block text-[13.5px] font-medium text-foreground truncate">{EMAIL}</span>
              </span>
              <button
                type="button"
                onClick={onCopy}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 mobile-tap-spring flex-shrink-0"
                aria-label="Copy email"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              </button>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/krish-raja"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
              className="mobile-tap-row mobile-tap-spring"
            >
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Linkedin className="w-4 h-4 text-primary" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">LinkedIn</span>
                <span className="block text-[13.5px] font-medium text-foreground truncate">linkedin.com/in/krish-raja</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </a>
          </li>
          <li>
            <a
              href="https://themindmaker.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
              className="mobile-tap-row mobile-tap-spring"
            >
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">For work inquiries</span>
                <span className="block text-[13.5px] font-medium text-foreground truncate">Book through Mindmaker</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </a>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileContactSheet;
