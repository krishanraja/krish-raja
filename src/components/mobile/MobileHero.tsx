import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { hero, nav } from '@/content';
import { asset } from '@/lib/asset-map';
import { useMobileViewportHeight } from '@/hooks/use-mobile';

interface MobileHeroProps {
  onOpenContact: () => void;
}

const MobileHero = ({ onOpenContact }: MobileHeroProps) => {
  const trustLogos = hero.trustLogos.map((logo) => ({
    src: asset(logo.asset),
    alt: logo.alt,
  }));

  /**
   * One screen, with the logos seated at the foot of it.
   *
   * The hero used to end wherever its content ended, which on a tall handset
   * left the trust strip floating with a stretch of dead background between it
   * and the dock, so the page read as having stopped rather than continued.
   *
   * Filling the screen moves that slack rather than removing it, so it is split
   * between two `mt-auto` margins, above the headshot and above the divider,
   * because flexbox divides free space equally among the auto margins in its
   * main axis. Pinned at one point only, the whole 115px on a Pixel 7 opened
   * into a single hole under the Substack link and read as a rendering fault.
   * Halved, each gap reads as spacing and the block sits optically centered
   * with the logos seated at the foot.
   *
   * The height comes from a hook rather than `100svh` because a viewport unit
   * is measured against the viewport, which the root zoom does not change: in
   * desktop-site mode `100svh` is 1750 layout pixels inside a 714 pixel screen.
   * See useMobileViewportHeight.
   *
   * Capped short of the 950px per-section budget the live mobile check
   * enforces, so an unusually tall viewport cannot turn the hero into a screen
   * and a half of white space.
   */
  const screen = useMobileViewportHeight();
  const fillScreen =
    screen > 0
      ? { minHeight: `min(calc(${screen}px - var(--mobile-dock-h, 63px)), 940px)` }
      : undefined;

  return (
    <section id="hero" className="relative flex flex-col pt-14 pb-8 px-5 mobile-section" style={fillScreen}>
      <div className="relative z-10 flex flex-1 flex-col">
        {/* The headshot is the whole row. It shared it with a "14 agents, 45
            workflows" status line until 20 Aug 2026; the counts are still on
            the page, in the operating system section that can show them
            running. */}
        <button
          type="button"
          onClick={onOpenContact}
          className="mt-auto flex-shrink-0 self-start mobile-tap-spring rounded-full mb-5"
          aria-label={nav.contactAria}
        >
          <img
            src={asset('krish-bitmoji')}
            alt={nav.brand}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-28 h-28 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
          />
        </button>

        <h1 className="mobile-h1 text-balance mb-3">
          {hero.h1}
        </h1>

        <p className="mobile-body text-muted-foreground mb-5">
          {hero.sub}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {/* Opens the contact sheet. It used to open a work sheet holding one
              card that linked to themindmaker.ai; that sheet went with the
              "Work with me" section on 12 Aug 2026.

              The label stays centered, and that is not an oversight. A filled
              full-width button aligns by its box, and this one already sits on
              the hero's axis at both edges, 20 and 392. Its label cannot join
              that axis, because the pill needs its own padding: left-aligning
              the text lands it at 44, near the line without being on it, which
              reads as a mistake rather than a decision. */}
          <button
            type="button"
            onClick={onOpenContact}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm mobile-tap-spring"
          >
            {hero.primaryCta}
            <ArrowRight className="w-4 h-4" />
          </button>
          {/* h-11 on both, not padding that happens to add up. A thumb needs
              44px and the live mobile check fails anything under 40.

              Left-aligned, and hugging its own text rather than stretching the
              row. Everything else in the hero starts at x=20: the headshot, the
              headline, the paragraph, the Substack link below, the eyebrow and
              the first logo. This sat at 152, centered directly above a link at
              20, which is what made the three calls to action read as
              unaligned. Hugging matters too: stretched, it put a full-width
              invisible hit area 8px under the primary button, so a low thumb
              aimed at "Get in touch" caught this instead. */}
          <a
            href={hero.secondaryHref}
            className="self-start inline-flex h-11 items-center text-sm text-muted-foreground hover:text-foreground mobile-tap-spring"
          >
            {hero.secondaryCta} ↓
          </a>
        </div>

        {/* self-start for the same reason as the link above: `inline-flex` does
            not stop a flex column stretching this to the full row, so the box
            ran 20 to 392 while the words ended at 142. Tapping the empty half
            opened Substack in a new tab. */}
        <a
          href={hero.channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 self-start inline-flex h-11 items-center gap-1 text-xs font-medium text-primary link-underline"
        >
          {hero.channel.label}
          <ArrowUpRight className="w-3 h-3" />
        </a>

        {/* Four logos, sitting still.
            This was an infinite marquee, which needs more content than the
            viewport to make sense. Four logos fit across a phone with room to
            spare, so the animation was duplicating the same four and sliding
            them past a reader who could already see all of them. */}
        <div data-trust-strip className="mt-auto pt-5 border-t border-border/40">
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
