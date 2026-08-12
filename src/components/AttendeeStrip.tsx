import { lessons } from '@/content';

/**
 * The employer marks under the Lightning Lessons, rotating.
 *
 * A marquee is right here and wrong in the hero. An infinite scroll only makes
 * sense when there is more content than viewport: the hero trust strip holds
 * four logos that fit across a phone with room to spare, so animating them was
 * sliding the same four past a reader who could already see all of them. This
 * one holds twenty-eight. Nothing short of a wall shows twenty-eight logos at
 * once, so motion is what makes the set legible rather than what decorates it.
 *
 * The track is duplicated once and translated by exactly half its width, which
 * is what makes the loop seamless. `aria-hidden` on the copy keeps a screen
 * reader from hearing every company twice, and the whole strip collapses to a
 * static wrapped grid under prefers-reduced-motion.
 */
const AttendeeStrip = () => {
  const marks = lessons.attendees;

  /**
   * The spacing is a right margin on every logo, not a gap on the track.
   *
   * The `scroll` keyframe translates by exactly -50%. With a flex gap, half the
   * track is n items plus n-and-a-half gaps, so the loop lands half a gap out
   * and the strip visibly hitches once a cycle. Folding the space into each
   * item makes the halves identical and the seam disappears.
   */
  const Logo = ({ slug, name, spaced = false }: { slug: string; name: string; spaced?: boolean }) => (
    <img
      src={`/media/brands/${slug}.webp`}
      alt={name}
      loading="lazy"
      decoding="async"
      // Every derivative is the same 200x72 canvas with the mark scaled to a
      // constant area inside it, so one height here sizes all 28 evenly. No
      // max-width needed: the box already is the width.
      className={`h-8 w-auto flex-shrink-0 object-contain opacity-60 grayscale md:h-10 dark:opacity-70 dark:invert ${
        spaced ? 'mr-6 md:mr-8' : ''
      }`}
    />
  );

  return (
    <div className="mt-8 border-t border-border/40 pt-6 md:mt-12 md:pt-8">
      <p className="mb-4 text-center text-xs uppercase tracking-widest text-muted-foreground md:mb-6">
        {lessons.attendeesLabel}
      </p>

      {/* Motion path. The mask fades both ends so logos arrive and leave
          rather than being clipped mid-letter against the section edge. */}
      <div
        className="relative overflow-hidden motion-reduce:hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max animate-[scroll_70s_linear_infinite] items-center">
          {marks.map((b) => (
            <Logo key={b.slug} slug={b.slug} name={b.name} spaced />
          ))}
          <span className="contents" aria-hidden>
            {marks.map((b) => (
              <Logo key={`${b.slug}-loop`} slug={b.slug} name="" spaced />
            ))}
          </span>
        </div>
      </div>

      {/* Reduced motion: the same set, standing still. */}
      <div className="hidden flex-wrap items-center justify-center gap-x-8 gap-y-4 motion-reduce:flex">
        {marks.map((b) => (
          <Logo key={b.slug} slug={b.slug} name={b.name} />
        ))}
      </div>
    </div>
  );
};

export default AttendeeStrip;
