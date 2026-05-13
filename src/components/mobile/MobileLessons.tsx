import { Zap, ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';
import lessonPermanentIdentity from '@/assets/lesson-permanent-identity.png';
import lessonAutonomousBusiness from '@/assets/lesson-autonomous-business-new.png';
import lessonVibeCodingUnfair from '@/assets/lesson-vibe-coding-unfair.png';
import lessonAgenticOrgChart from '@/assets/lesson-agentic-org-chart.png';
import lessonAiChiefOfStaff from '@/assets/lesson-ai-chief-of-staff.png';

const lessons = [
  { title: "Build Your AI's Permanent Identity", description: 'Give your AI a durable identity so it stays consistent across tools and sessions.', image: lessonPermanentIdentity, link: 'https://maven.com/p/8fba42/build-your-ai-s-permanent-identity' },
  { title: 'Build an Autonomous Business with AI', description: 'Design and run an autonomous business where AI handles the heavy lifting.', image: lessonAutonomousBusiness, link: 'https://maven.com/p/99a529/build-an-autonomous-business-with-ai' },
  { title: 'Vibe Coding: The Unfair Advantage', description: 'How AI-native teams are shipping faster, and the edge you can build with vibe coding.', image: lessonVibeCodingUnfair, link: 'https://maven.com/p/b118d0/vibe-coding-how-your-competitors-are-pulling-ahead' },
  { title: 'Create Your Agentic Org Chart', description: 'Map the agents, roles, and handoffs that run your business alongside your team.', image: lessonAgenticOrgChart, link: 'https://maven.com/p/48674a/create-your-business-agentic-org-chart' },
  { title: 'Build Your AI Chief of Staff', description: 'Stand up an AI chief of staff that drives execution, follow-ups, and decisions.', image: lessonAiChiefOfStaff, link: 'https://maven.com/p/dd0ebd/build-your-ai-chief-of-staff' },
];

const MobileLessons = () => (
  <MobileSection
    id="lightning-lessons"
    eyebrow="Lightning lessons"
    title="Free, 60-minute Maven sessions"
    intro="Deep learnings from 20 years of business building, with 100+ enterprise students."
  >
    <ul className="space-y-3">
      {lessons.map((lesson, i) => (
        <li key={i}>
          <a
            href={lesson.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm active:bg-muted/40 transition-colors"
          >
            <div className="w-24 h-24 flex-shrink-0 bg-muted relative">
              <img src={lesson.image} alt={lesson.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1 py-3 pr-3">
              <div className="flex items-center gap-1 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  <Zap className="w-3 h-3 fill-current" />
                  Free
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
              </div>
              <h3 className="text-[13.5px] font-semibold text-foreground leading-snug line-clamp-2 mb-1">
                {lesson.title}
              </h3>
              <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">
                {lesson.description}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </MobileSection>
);

export default MobileLessons;
