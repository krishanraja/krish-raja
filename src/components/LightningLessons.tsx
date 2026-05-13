import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, ExternalLink } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

import lessonPermanentIdentity from '@/assets/lesson-permanent-identity.png';
import lessonAutonomousBusiness from '@/assets/lesson-autonomous-business-new.png';
import lessonVibeCodingUnfair from '@/assets/lesson-vibe-coding-unfair.png';
import lessonAgenticOrgChart from '@/assets/lesson-agentic-org-chart.png';
import lessonAiChiefOfStaff from '@/assets/lesson-ai-chief-of-staff.png';

const lessons = [
  {
    title: "Build Your AI's Permanent Identity",
    description: "Give your AI a durable identity so it stays consistent across tools, sessions, and teams.",
    image: lessonPermanentIdentity,
    link: "https://maven.com/p/8fba42/build-your-ai-s-permanent-identity"
  },
  {
    title: "Build an Autonomous Business with AI",
    description: "Design and run an autonomous business where AI handles the heavy lifting.",
    image: lessonAutonomousBusiness,
    link: "https://maven.com/p/99a529/build-an-autonomous-business-with-ai"
  },
  {
    title: "Vibe Coding: How Your Competitors Are Pulling Ahead",
    description: "See how AI-native teams are shipping faster, and the unfair advantage you can build with vibe coding.",
    image: lessonVibeCodingUnfair,
    link: "https://maven.com/p/b118d0/vibe-coding-how-your-competitors-are-pulling-ahead"
  },
  {
    title: "Create Your Business Agentic Org Chart",
    description: "Map out the agents, roles, and handoffs that run your business alongside your team.",
    image: lessonAgenticOrgChart,
    link: "https://maven.com/p/48674a/create-your-business-agentic-org-chart"
  },
  {
    title: "Build Your AI Chief of Staff",
    description: "Stand up an AI chief of staff that drives execution, follow-ups, and decisions for you.",
    image: lessonAiChiefOfStaff,
    link: "https://maven.com/p/dd0ebd/build-your-ai-chief-of-staff"
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
    <section id="lightning-lessons" className="section-padding scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="headline-lg mb-4 md:mb-6">Lightning Lessons</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Free, 60-minute sessions on Maven. Deep learnings from 20 years of business building, with 100+ enterprise students.
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel showDots={true} uniformHeight={true} minHeight="carousel-md">
            {lessons.map((lesson, index) => renderCard(lesson, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {lessons.map((lesson, index) => renderCard(lesson, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LightningLessons;
