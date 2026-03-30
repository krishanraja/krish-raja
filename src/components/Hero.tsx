import { Button } from '@/components/ui/button';
import { Linkedin, ArrowDown } from 'lucide-react';
import AnimatedProfilePicture from '@/components/AnimatedProfilePicture';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding">
      <div className="container-width text-center relative z-10">
        <div className="fade-in-up">
          <div className="mb-8 flex justify-center">
            <AnimatedProfilePicture />
          </div>
          
          <p className="text-lg md:text-xl font-medium italic text-muted-foreground mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Hi! I'm Krish. 👋
          </p>
          <h1 className="headline-xl mb-6 text-balance">
            I <span className="text-primary">build revenue streams</span> in an AI era and help others to do the same.
          </h1>
          
          <p className="text-sm md:body-lg md:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto text-balance">
            16 years building revenue engines across 3 continents. From Microsoft to founding AI ventures generating real commercial outcomes.
          </p>
          
          <div className="text-sm text-muted-foreground mb-10 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Based in Brooklyn, NY
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="#proof-points" className="flex items-center gap-2">
                See My Track Record
                <ArrowDown size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a 
                href="https://www.linkedin.com/in/krish-raja/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2"
              >
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
