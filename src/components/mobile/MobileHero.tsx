import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { hero, nav } from '@/content';
import { asset } from '@/lib/asset-map';

interface MobileHeroProps {
  onOpenContact: () => void;
}

const MobileHero = ({ onOpenContact }: MobileHeroProps) => {
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
          {/* Opens the contact sheet. It used to open a work sheet holding one
              card that linked to themindmaker.ai; that sheet went with the
              "Work with me" section on 12 Aug 2026. */}
          <button
            type="button"
            onClick={onOpenContact}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm mobile-tap-spring"
          >
            {hero.primaryCta}
            <ArrowRight className="w-4 h-4" />
          </button>
          {/* h-11 on both, not padding that happens to add up. A thumb needs
              44px and the live mobile check fails anything under 40. */}
          <a
            href={hero.secondaryHref}
            className="flex h-11 items-center justify-center text-center text-sm text-muted-foreground hover:text-foreground mobile-tap-spring"
          >
            {hero.secondaryCta} ↓
          </a>
        </div>

        <a
          href={hero.channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 inline-flex h-11 items-center gap-1 text-xs font-medium text-primary link-underline"
        >
          {hero.channel.label}
          <ArrowUpRight className="w-3 h-3" />
        </a>

        {/* Four logos, sitting still.
            This was an infinite marquee, which needs more content than the
            viewport to make sense. Four logos fit across a phone with room to
            spare, so the animation was duplicating the same four and sliding
            them past a reader who could already see all of them. */}
        <div className="pt-5 border-t border-border/40">
          <p className="mobile-eyebrow mb-3">{hero.trustLabel}</p>
          <div className="flex items-center justify-between gap-3">
            {trustLogos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                loading="eager"
                decoding="async"
                className="h-5 w-auto max-w-[22%] object-contain grayscale opacity-60"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;
