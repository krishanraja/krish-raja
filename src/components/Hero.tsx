import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin, ArrowDown, Calendar } from 'lucide-react';
import AnimatedProfilePicture from '@/components/AnimatedProfilePicture';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding">
      <div className="container-width text-center relative z-10">
        <div className="fade-in-up">
          <div className="mb-8 flex justify-center">
            <AnimatedProfilePicture />
          </div>
          
          <h1 className="headline-xl mb-6 text-balance">
            I build <span className="text-primary">AI products</span> and teach others to do the same
          </h1>
          
          <p className="body-lg text-muted-foreground mb-4 max-w-2xl mx-auto text-balance">
            Builder-in-action running 8 live products. 16 years scaling businesses across 3 continents. My mission: help humans and businesses use data + AI to become self-reliant, fractional, and value-creating.
          </p>
          
          <div className="text-sm text-muted-foreground mb-10 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Based in Brooklyn, NY
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="#portfolio" className="flex items-center gap-2">
                Explore My Portfolio
                <ArrowDown size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a 
                href="https://maven.com/aimindmaker/ai-literacy-to-strategy-for-leaders" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2"
              >
                Join a Cohort
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
          
          <div className="flex flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="sm" asChild className="border-primary/40 hover:border-primary hover:bg-primary/5">
              <a href="https://calendly.com/krish-raja/krish-raja" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Calendar size={16} />
                Book a call
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="border-primary/40 hover:border-primary hover:bg-primary/5">
              <a href="https://www.linkedin.com/in/krish-raja/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
