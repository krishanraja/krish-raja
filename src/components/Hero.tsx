import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import krishBitmoji from '@/assets/krish_bitmoji.jpg';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding">
      <div className="container-width text-center relative z-10">
        <div className="fade-in-up">
          <div className="mb-8 flex justify-center">
            <img 
              src={krishBitmoji} 
              alt="Krish Raja avatar" 
              className="w-32 h-32 rounded-full shadow-lg"
            />
          </div>
          <h1 className="headline-xl mb-6 text-balance">
            I turn AI literacy into <span className="text-primary">AI strategy and revenue</span>
          </h1>
          <p className="body-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
            Operator and strategic advisor across AI, data, identity, and SaaS GTM. 16+ years scaling businesses from zero to multi-million dollar revenue across three continents.
          </p>
          
          <div className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
            Currently helping executives across media, telco & tech • Based in Brooklyn, NY
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="https://calendly.com/krish-raja/krish-raja" className="flex items-center gap-2">
                Book a call
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="mailto:hello@krishraja.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Mail size={16} />
                Email me
              </a>
            </Button>
          </div>
          
          <div className="mt-8">
            <Button variant="ghost" asChild className="text-muted-foreground">
              <a href="#work" className="link-underline">
                View work
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