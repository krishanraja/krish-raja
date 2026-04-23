import { Button } from '@/components/ui/button';
import AnimatedProfilePicture from '@/components/AnimatedProfilePicture';
import nineLogo from '@/assets/nine_logo.png';
import mccannLogo from '@/assets/mccann_logo.png';
import captifyLogo from '@/assets/captify_logo.png';
import singtelLogo from '@/assets/singtel_logo.png';
import bbcLogo from '@/assets/bbc_logo.png';
import microsoftLogo from '@/assets/microsoft_logo.png';

const trustLogos = [
  { src: nineLogo, alt: "Nine" },
  { src: mccannLogo, alt: "McCann" },
  { src: captifyLogo, alt: "Captify" },
  { src: singtelLogo, alt: "Singtel" },
  { src: bbcLogo, alt: "BBC" },
  { src: microsoftLogo, alt: "Microsoft" },
];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding">
      <div className="container-width text-center relative z-10">
        <div className="fade-in-up">
          <div className="mb-8 flex justify-center">
            <AnimatedProfilePicture />
          </div>

          <p className="text-lg md:text-xl font-display italic text-muted-foreground mb-3">
            Hi — I'm Krish. Operator-advisor.
          </p>
          <h1 className="headline-xl mb-6 text-balance">
            I run an autonomous AI business; I help companies commercialize theirs.
          </h1>

          <p className="text-sm md:body-lg md:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto text-balance">
            16 years commercializing products at Microsoft, Nine, Captify, and Singtel. $9M → $61M revenue growth. $0 → $12M ARR. Now operating a 14-agent fleet across multiple ventures from Brooklyn, NY.
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
              <a href="#work-with-me">Work with me</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a
                href="https://www.techonomic.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Techonomic
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="#how-i-operate">How I operate</a>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Experience across</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {trustLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  loading="eager"
                  decoding="async"
                  className="h-6 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </div>
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
