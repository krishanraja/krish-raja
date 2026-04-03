import { GraduationCap, Mail, Mic, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

import mindmakerIcon from '@/assets/mindmaker-cta-icon.png';

type CTAOption = {
  id: string;
  label: string;
  description: string;
  icon: 'cohort' | 'mindmaker' | 'builder-economy' | 'email';
  href: string;
  external: boolean;
};

const ctaOptions: CTAOption[] = [
  {
    id: 'cohort',
    label: 'Join Cohort',
    description: 'Learn AI strategy in a 4-week program',
    icon: 'cohort',
    href: 'https://maven.com/aimindmaker/ai-literacy-to-strategy-for-leaders',
    external: true,
  },
  {
    id: 'mindmaker',
    label: 'Mindmaker',
    description: 'Get me as your fractional AI advisor',
    icon: 'mindmaker',
    href: 'https://www.themindmaker.ai',
    external: true,
  },
  {
    id: 'builder-economy',
    label: 'Builder Economy',
    description: 'Create content about building with AI',
    icon: 'builder-economy',
    href: 'https://www.thebuildereconomy.com',
    external: true,
  },
  {
    id: 'email',
    label: 'Email Me',
    description: 'Collaborate on something else',
    icon: 'email',
    href: 'mailto:hello@krishraja.com?subject=Reaching%20out%20after%20looking%20at%20your%20site',
    external: false,
  },
];

const IconRenderer = ({ type }: { type: CTAOption['icon'] }) => {
  switch (type) {
    case 'cohort':
      return (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
      );
    case 'mindmaker':
      return (
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={mindmakerIcon} 
            alt="" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      );
    case 'builder-economy':
      return (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-slate-700 flex items-center justify-center flex-shrink-0">
          <Mic className="w-5 h-5 text-white" />
        </div>
      );
    case 'email':
      return (
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-white" />
        </div>
      );
    default:
      return null;
  }
};

interface CTAOptionProps {
  option: CTAOption;
  onClick?: () => void;
}

const CTAOptionItem = ({ option, onClick }: CTAOptionProps) => {
  return (
    <a
      href={option.href}
      target={option.external ? '_blank' : undefined}
      rel={option.external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
    >
      <IconRenderer type={option.icon} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground group-hover:text-foreground">{option.label}</span>
          {option.external && (
            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-muted-foreground" />
          )}
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground mt-0.5">{option.description}</p>
      </div>
    </a>
  );
};

const WorkWithMeMenu = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Work With Me</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Work With Me</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-1">
            {ctaOptions.map((option) => (
              <CTAOptionItem key={option.id} option={option} />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Work With Me</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="end">
        <div className="space-y-1">
          {ctaOptions.map((option) => (
            <CTAOptionItem key={option.id} option={option} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkWithMeMenu;
