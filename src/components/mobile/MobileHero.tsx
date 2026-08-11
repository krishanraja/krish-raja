import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { hero, nav } from '@/content';
import { asset } from '@/lib/asset-map';

interface MobileHeroProps {
  onOpenWork: () => void;
  onOpenContact: () => void;
}

const MobileHero = ({ onOpenWork, onOpenContact }: MobileHeroProps) => {
  const trustLogos = hero.trustLogos.map((logo) => ({
    src: asset(logo.asset),
    alt: logo.alt,
  }));

  return (
    <section id="hero" className="relative pt-14 pb-8 px-5 mobile-section">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={onOpenContact}
            className="flex-shrink-0 mobile-tap-spring rounded-full"
            aria-label={nav.contactAria}
          >
            <img
              src={asset('krish-bitmoji')}
              alt={nav.brand}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
            />
          </button>
          <div className="min-w-0">
            <p className="text-[12.5px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-reduce:animate-none"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>{hero.status}</span>
            </p>
          </div>
        </div>

        <h1 className="mobile-h1 text-balance mb-3">
          {hero.h1}
        </h1>

        <p className="mobile-body text-muted-foreground mb-5">
          {hero.sub}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          <button
            type="button"
            onClick={onOpenWork}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm mobile-tap-spring"
          >
            {hero.primaryCta}
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={hero.secondaryHref}
            className="text-center text-sm text-muted-foreground hover:text-foreground py-2 mobile-tap-spring"
          >
            {hero.secondaryCta} ↓
          </a>
        </div>

        <a
          href={hero.channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary font-medium link-underline mb-5"
        >
          {hero.channel.label}
          <ArrowUpRight className="w-3 h-3" />
        </a>

        <div className="pt-5 border-t border-border/40">
          <p className="mobile-eyebrow mb-3">{hero.trustLabel}</p>
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
