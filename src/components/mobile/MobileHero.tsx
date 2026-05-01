import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import krishBitmoji from '@/assets/krish_bitmoji.jpg';
import nineLogo from '@/assets/nine_logo.png';
import mccannLogo from '@/assets/mccann_logo.png';
import captifyLogo from '@/assets/captify_logo.png';
import singtelLogo from '@/assets/singtel_logo.png';
import bbcLogo from '@/assets/bbc_logo.png';
import microsoftLogo from '@/assets/microsoft_logo.png';

const trustLogos = [
  { src: nineLogo, alt: 'Nine' },
  { src: mccannLogo, alt: 'McCann' },
  { src: captifyLogo, alt: 'Captify' },
  { src: singtelLogo, alt: 'Singtel' },
  { src: bbcLogo, alt: 'BBC' },
  { src: microsoftLogo, alt: 'Microsoft' },
];

const MobileHero = () => {
  return (
    <section id="hero" className="relative pt-16 pb-8 px-5 scroll-mt-16">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={krishBitmoji}
            alt="Krish Raja"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 shadow-sm flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="mobile-eyebrow text-primary">Operator-advisor</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Brooklyn, NY
            </p>
          </div>
        </div>

        <h1 className="mobile-h1 text-balance mb-3">
          I run an autonomous AI business; I help companies commercialize theirs.
        </h1>

        <p className="mobile-body text-muted-foreground mb-5">
          16 years commercializing products at Microsoft, Nine, Captify, and Singtel. $9M → $61M revenue. $0 → $12M ARR. Now operating a 14-agent fleet from Brooklyn.
        </p>

        <div className="flex flex-col gap-2 mb-6">
          <Button asChild size="lg" className="w-full h-12">
            <a href="#work-with-me">Work with me</a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="w-full justify-center text-muted-foreground hover:text-foreground">
            <a href="#how-i-operate" className="flex items-center gap-1.5">
              How I operate
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        <a
          href="https://www.techonomic.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary font-medium link-underline mb-5"
        >
          Read Techonomic
          <ArrowRight className="w-3 h-3" />
        </a>

        <div className="pt-5 border-t border-border/40">
          <p className="mobile-eyebrow mb-3">Experience across</p>
          <div className="relative overflow-hidden -mx-5">
            <div className="flex gap-7 animate-[scroll_22s_linear_infinite] motion-reduce:animate-none w-max px-5">
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  loading="eager"
                  decoding="async"
                  className="h-5 w-auto object-contain grayscale opacity-60 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;
