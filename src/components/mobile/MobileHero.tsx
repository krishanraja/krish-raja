import { ArrowRight, ArrowUpRight } from 'lucide-react';
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

interface MobileHeroProps {
  onOpenWork: () => void;
  onOpenContact: () => void;
}

const MobileHero = ({ onOpenWork, onOpenContact }: MobileHeroProps) => {
  return (
    <section id="hero" className="relative pt-14 pb-8 px-5 mobile-section">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={onOpenContact}
            className="flex-shrink-0 mobile-tap-spring rounded-full"
            aria-label="Contact options"
          >
            <img
              src={krishBitmoji}
              alt="Krish Raja"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
            />
          </button>
          <div className="min-w-0">
            <p className="mobile-eyebrow text-primary">Operator-advisor</p>
            <p className="text-[12.5px] text-muted-foreground flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-reduce:animate-none"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Brooklyn, NY
              <span className="text-muted-foreground/50">·</span>
              <span>14 agents · 45 workflows</span>
            </p>
          </div>
        </div>

        <h1 className="mobile-h1 text-balance mb-3">
          I run an autonomous AI business; I help companies commercialize theirs.
        </h1>

        <p className="mobile-body text-muted-foreground mb-5">
          16 years commercializing products at Microsoft, Nine, Captify, and Singtel. $9M → $61M revenue. $0 → $12M ARR. Now operating a 14-agent fleet from Brooklyn.
        </p>

        <div className="flex flex-col gap-2 mb-5">
          <button
            type="button"
            onClick={onOpenWork}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm mobile-tap-spring"
          >
            Work with me
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#how-i-operate"
            className="text-center text-sm text-muted-foreground hover:text-foreground py-2 mobile-tap-spring"
          >
            How I operate ↓
          </a>
        </div>

        <a
          href="https://www.techonomic.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary font-medium link-underline mb-5"
        >
          Read Techonomic
          <ArrowUpRight className="w-3 h-3" />
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
