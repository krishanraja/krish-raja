import { Zap, ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';
import lessonVibeCoding from '@/assets/lesson-vibe-coding.png';
import lessonCoFounder from '@/assets/lesson-co-founder.png';
import lessonAutonomousBusiness from '@/assets/lesson-autonomous-business.png';
import lessonAiMemory from '@/assets/lesson-ai-memory.png';

const lessons = [
  { title: 'Vibe Coding for Leaders', description: 'Turn a clear brief into a working prototype using AI-native tools.', image: lessonVibeCoding, link: 'https://maven.com/p/ca6d71/vibe-coding-for-leaders-build-what-you-brief' },
  { title: 'Make AI Your Co-Founder', description: 'Use AI as a true building partner to ship products and scale faster.', image: lessonCoFounder, link: 'https://maven.com/p/0cc82a/make-ai-your-co-founder' },
  { title: 'Build an Autonomous Business', description: 'Design and run an autonomous business where AI handles the heavy lifting.', image: lessonAutonomousBusiness, link: 'https://maven.com/p/38d196/build-an-autonomous-business-with-ai' },
  { title: 'Give Your AI Memory', description: 'Give your AI persistent memory so it learns and compounds over time.', image: lessonAiMemory, link: 'https://maven.com/p/8fba42/improve-the-memory-of-your-ai-tools' },
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
