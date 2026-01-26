import { GraduationCap, Brain, Mic, Mail, ExternalLink } from 'lucide-react';
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

const ctaOptions = [
  {
    id: 'cohort',
    label: 'Join Cohort',
    description: 'Learn AI strategy in a 4-week program',
    icon: GraduationCap,
    href: 'https://maven.com/aimindmaker/ai-literacy-to-strategy-for-leaders',
    external: true,
  },
  {
    id: 'mindmaker',
    label: 'Mindmaker',
    description: 'Get me as your fractional AI advisor',
    icon: Brain,
    href: 'https://www.themindmaker.ai',
    external: true,
  },
  {
    id: 'builder-economy',
    label: 'Builder Economy',
    description: 'Create content about building with AI',
    icon: Mic,
    href: 'https://www.thebuildereconomy.com',
    external: true,
  },
  {
    id: 'email',
    label: 'Email Me',
    description: 'Collaborate on something else',
    icon: Mail,
    href: 'mailto:hello@krishraja.com?subject=Reaching%20out%20after%20looking%20at%20your%20site',
    external: false,
  },
];

interface CTAOptionProps {
  option: typeof ctaOptions[0];
  onClick?: () => void;
}

const CTAOption = ({ option, onClick }: CTAOptionProps) => {
  const Icon = option.icon;
  
  return (
    <a
      href={option.href}
      target={option.external ? '_blank' : undefined}
      rel={option.external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">{option.label}</span>
          {option.external && (
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
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
              <CTAOption key={option.id} option={option} />
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
            <CTAOption key={option.id} option={option} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkWithMeMenu;
