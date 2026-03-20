import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GraduationCap, Zap, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

// Import images
import literacyToStrategyImage from '@/assets/literacy-to-strategy.jpg';
import learnProgramAiImage from '@/assets/learn-program-ai.png';
import buildInPublicImage from '@/assets/build-in-public.png';
import mavenMemoryImage from '@/assets/maven-memory.png';
import mavenVibecodingImage from '@/assets/maven-vibecoding-leaders.png';
import mavenOpenclawImage from '@/assets/maven-openclaw.png';

// Preload all course images for instant display
const allCourseImages = [
  literacyToStrategyImage,
  learnProgramAiImage,
  buildInPublicImage,
  mavenMemoryImage,
  mavenVibecodingImage,
  mavenOpenclawImage
];

const preloadCourseImages = () => {
  allCourseImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const LearnWithMe = () => {
  const isMobile = useIsMobile();

  // Preload images on mount
  useEffect(() => {
    preloadCourseImages();
  }, []);

  const cohortCourse = {
    title: "AI Literacy-to-Strategy for Leaders",
    duration: "4 weeks",
    description: "Transform AI curiosity into competitive advantage. A cohort-based program for commercial leaders who want to move from understanding AI to deploying it strategically.",
    outcomes: [
      "Build your personal AI toolkit",
      "Develop org-wide AI strategy",
      "Lead AI transformation initiatives",
      "Create measurable business impact"
    ],
    link: "https://maven.com/aimindmaker/ai-literacy-to-strategy-for-leaders",
    image: literacyToStrategyImage
  };

  const lightningLessons = [
    {
      title: "Make AI Your Co-Founder",
      description: "Learn how to use AI as a true building partner to ship products and scale faster",
      duration: "Free",
      link: "https://maven.com/p/1054a6/build-in-public-with-gen-ai-as-your-co-founder?utm_medium=ll_share_link&utm_source=instructor",
      image: buildInPublicImage
    },
    {
      title: "Skills 101: Learn How To Program Your AI Tools",
      description: "Master prompt engineering and tool configuration to 10x your productivity",
      duration: "Free",
      link: "https://maven.com/p/6c1d16/learn-how-to-program-your-ai-tools",
      image: learnProgramAiImage
    },
    {
      title: "Run Your Life With OpenClaw",
      description: "The good, the bad and the ugly of running your life with AI-powered tools",
      duration: "Free",
      link: "https://maven.com/aimindmaker",
      image: mavenOpenclawImage
    },
    {
      title: "Improve The Memory Of Your AI Tools",
      description: "Give your AI persistent memory so it learns and compounds knowledge over time",
      duration: "Free",
      link: "https://maven.com/aimindmaker",
      image: mavenMemoryImage
    },
    {
      title: "Vibe Coding for Leaders: Build What You Brief",
      description: "Turn your briefs into working products — no engineering team required",
      duration: "Free",
      link: "https://maven.com/aimindmaker",
      image: mavenVibecodingImage
    }
  ];

  return (
    <section id="learn" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Learn With Me</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            From free lightning lessons to deep cohort experiences — pick your path to AI fluency
          </p>
        </div>

        {/* Featured Cohort Course */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
              {/* Image */}
              <div className={`${isMobile ? 'h-48' : 'w-2/5'} overflow-hidden bg-muted/30 flex items-center justify-center`}>
                <img 
                  src={cohortCourse.image}
                  alt={cohortCourse.title}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className={`${isMobile ? 'w-full h-full object-cover' : 'w-full h-auto object-contain'}`}
                />
              </div>
              {/* Content */}
              <div className={`${isMobile ? 'p-6' : 'w-3/5 p-8 lg:p-12'} flex flex-col justify-center`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    Featured Cohort
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {cohortCourse.duration}
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {cohortCourse.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  {cohortCourse.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {cohortCourse.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a 
                    href={cohortCourse.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Join Next Cohort
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Lightning Lessons */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Lightning Lessons</h3>
            <Badge variant="outline" className="text-xs">Free</Badge>
          </div>

          <MobileCarousel 
            className="grid md:grid-cols-3 gap-6"
            uniformHeight={true}
            minHeight="carousel-lg"
          >
            {lightningLessons.map((lesson, index) => (
              <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden h-full flex flex-col">
                {/* Lesson image */}
                <div className="w-full h-36 overflow-hidden flex-shrink-0">
                  <img 
                    src={lesson.image}
                    alt={lesson.title}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {lesson.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-4 flex flex-col flex-grow">
                  <p className="text-sm text-muted-foreground flex-grow">
                    {lesson.description}
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <a 
                      href={lesson.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Start Learning
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
};

export default LearnWithMe;
