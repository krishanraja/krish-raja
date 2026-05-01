import { Target, Bot, FileText, Wrench, RefreshCw } from 'lucide-react';
import MobileSection from './MobileSection';

const pillars = [
  {
    icon: Target,
    title: 'Revenue engine',
    body: 'AI-powered cold email, LinkedIn DMs, named-account sequences across multiple ventures. Enterprise GTM built on agents, not people.',
  },
  {
    icon: Bot,
    title: 'Operating system',
    badge: '14 agents · 45 workflows',
    body: 'A 14-agent fleet replacing a 15-person team. Ops, triage, synthesis, lead scoring, dependency mapping — all running 24/7 with named roles.',
  },
  {
    icon: FileText,
    title: 'Content engine',
    body: 'Automated newsletter, podcast synthesis, slide generation, editorial calendars. Techonomic and Signal & Noise ship without me being the bottleneck.',
  },
  {
    icon: Wrench,
    title: 'Build loop',
    body: "I don't just use AI, I build with it. Voice clones, video agents, memory webs, autonomous researchers, API-connected assistants in production.",
  },
];

const flywheelPoints = [
  'Every venture feeds the whole',
  'Learnings carry across projects',
  'One failure prevents the next',
  'Momentum through iteration',
];

const MobilePhilosophy = () => (
  <MobileSection
    id="how-i-operate"
    eyebrow="How I operate"
    title="Four pillars, one flywheel"
    intro="I don't theorize about AI. I run an autonomous business on it."
    tone="muted"
  >
    <ul className="space-y-2.5">
      {pillars.map((p, i) => {
        const Icon = p.icon;
        return (
          <li
            key={i}
            className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="mobile-h3 text-foreground">{p.title}</h3>
                  {p.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="mobile-meta">{p.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>

    <div className="mt-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 rounded-lg bg-primary/15">
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
        </span>
        <h3 className="mobile-h3">One flywheel</h3>
      </div>
      <p className="mobile-meta mb-4">
        Building, advising, writing — parts of one engine. Each venture sharpens commercial instinct, produces case material, compounds into the next.
      </p>
      <ol className="relative pl-5 space-y-2.5 border-l border-primary/30">
        {flywheelPoints.map((point, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[22px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-semibold">
              {i + 1}
            </span>
            <p className="text-[13px] leading-snug text-foreground">{point}</p>
          </li>
        ))}
      </ol>
    </div>
  </MobileSection>
);

export default MobilePhilosophy;
