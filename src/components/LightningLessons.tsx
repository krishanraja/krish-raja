import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, ExternalLink } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

import lessonVibeCoding from '@/assets/lesson-vibe-coding.png';
import lessonCoFounder from '@/assets/lesson-co-founder.png';
import lessonAutonomousBusiness from '@/assets/lesson-autonomous-business.png';
import lessonAiMemory from '@/assets/lesson-ai-memory.png';

const lessons = [
  {
    title: "Vibe Coding for Leaders: Build What You Brief",
    description: "Learn how to turn a clear brief into a working prototype using AI-native tools.",
    image: lessonVibeCoding,
    link: "https://maven.com/p/ca6d71/vibe-coding-for-leaders-build-what-you-brief"
  },
  {
    title: "Make AI Your Co-Founder",
    description: "Use AI as a true building partner to ship products and scale faster.",
    image: lessonCoFounder,
    link: "https://maven.com/p/0cc82a/make-ai-your-co-founder"
  },
  {
    title: "Build an Autonomous Business with AI",
    description: "Design and run an autonomous business where AI handles the heavy lifting.",
    image: lessonAutonomousBusiness,
    link: "https://maven.com/p/38d196/build-an-autonomous-business-with-ai"
  },
  {
    title: "Give Your AI Memory",
    description: "Give your AI persistent memory so it learns and compounds knowledge over time.",
    image: lessonAiMemory,
    link: "https://maven.com/p/8fba42/improve-the-memory-of-your-ai-tools"
  }
];

const LightningLessons = () => {
  const isMobile = useIsMobile();

  const renderCard = (lesson: typeof lessons[0], index: number) => (
    <a
      key={index}
      href={lesson.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="border-0 shadow-sm h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={lesson.image}
            alt={lesson.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            Free
          </Badge>
          <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 text-sm">
            {lesson.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {lesson.description}
          </p>
        </CardContent>
      </Card>
    </a>
  );

  return (
    <section id="lightning-lessons" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="headline-lg mb-6">Lightning Lessons</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Free, 60-minute sessions on Maven. Deep learnings from 20 years of business building, with 100+ enterprise students.
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
            {lessons.map((lesson, index) => renderCard(lesson, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => renderCard(lesson, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LightningLessons;
