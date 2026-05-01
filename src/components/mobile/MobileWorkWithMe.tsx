import { Users, Building2, BookOpen, ArrowRight } from 'lucide-react';
import MobileSection from './MobileSection';
import { Button } from '@/components/ui/button';

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
    title: 'Read before you hire',
    eyebrow: 'Free',
    body: "Techonomic is where I think out loud. Signal & Noise is where I interrogate peers. Start there if you're not ready for a call.",
    cta: 'Read Techonomic',
    href: 'https://www.techonomic.co',
    primary: false,
  },
];

const MobileWorkWithMe = () => (
  <MobileSection
    id="work-with-me"
    eyebrow="Work with me"
    title="Three ways in"
    intro="Pick the one that fits."
    tone="muted"
  >
    <ul className="space-y-3">
      {paths.map((path, i) => {
        const Icon = path.icon;
        return (
          <li
            key={i}
            className={`relative rounded-2xl border p-4 shadow-sm ${
              path.primary
                ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/10'
                : 'bg-card border-border/60'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <h3 className="mobile-h3 text-foreground">{path.title}</h3>
            </div>
            <p className="text-[11px] uppercase tracking-wide text-primary/80 font-medium mb-1.5">
              {path.eyebrow}
            </p>
            <p className="mobile-meta mb-3">{path.body}</p>
            <Button
              asChild
              variant={path.primary ? 'default' : 'outline'}
              size="sm"
              className="w-full"
            >
              <a
                href={path.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                {path.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  </MobileSection>
);

export default MobileWorkWithMe;
