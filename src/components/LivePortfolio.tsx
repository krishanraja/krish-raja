import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { portfolio } from '@/content';
import { type PortfolioBranch, type PortfolioItem } from '@/content/types';
import { asset } from '@/lib/asset-map';

/**
 * The plate behind a mark.
 *
 * Three of these logos are light gradients drawn for a dark background, so on
 * the light card they need a dark plate under them or they are not there. That
 * is `plateOnLight`. `plateOnDark` is the same rule pointing the other way.
 */
const plate = (business: { plateOnDark?: boolean; plateOnLight?: boolean }) =>
  business.plateOnDark
    ? 'bg-white/0 dark:bg-white dark:px-2'
    : business.plateOnLight
      ? 'bg-foreground px-2.5 dark:bg-white/10 dark:px-1.5'
      : 'bg-white/0 dark:bg-white/10';

/**
 * The three arms share one mark and differ only in how far its corners are cut.
 *
 * Not three files: the mark's two bottom squares reach the edges of its own
 * content box, so a CSS radius clips exactly those and leaves the transparent
 * top corners alone. Adjusting the family is a number here, not a re-export.
 *
 * Bottom corners only. The two squares are what reach the edges of the box, so
 * that is where a radius does anything; rounding all four cut into the tall
 * peak on the right and started turning the mark into a blob, which is the one
 * thing that was not allowed to happen to it.
 */
const markRadius = {
  square: 'rounded-none',
  soft: 'rounded-b-[16%]',
  round: 'rounded-b-[34%]',
} as const;

/** One arm of Mindmake, inside the primary card. */
const Branch = ({ branch }: { branch: PortfolioBranch }) => {
  const Wrapper = branch.url ? 'a' : 'div';

  return (
    <Wrapper
      {...(branch.url ? { href: branch.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group flex h-full flex-col rounded-xl border border-border/60 bg-background/60 p-4 transition-all duration-200 ${
        branch.url ? 'hover:border-primary/40 hover:shadow-md' : ''
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        {/* No plate. The mark carries its own colour, and a mint gradient on
            the blue tile the lucide glyphs used clashed with it. */}
        <img
          src={asset('mindmake-mark')}
          alt=""
          loading="lazy"
          decoding="async"
          className={`h-7 w-auto flex-shrink-0 ${markRadius[branch.mark]}`}
        />
        <h4 className="text-sm font-semibold text-foreground">{branch.name}</h4>
        {branch.url && (
          <ExternalLink className="ml-auto h-3 w-3 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-primary/80">
        {branch.role}
      </p>
      <p className="text-xs leading-snug text-muted-foreground">{branch.description}</p>
      {branch.formats && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {branch.formats.map((f) => (
            <span
              key={f.name}
              // A plate, because each wordmark runs dark at one end and mint at
              // the other, so on the dark card half of each one is not there.
              // Small on purpose: these name the formats, they do not headline.
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 dark:bg-white/90"
            >
              <img
                src={asset(f.asset)}
                alt={f.name}
                loading="lazy"
                decoding="async"
                className="h-4 w-auto"
              />
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

/** One of the secondary pursuits. Smaller, quieter, still real. */
const SecondaryCard = ({ business }: { business: PortfolioItem }) => {
  const Wrapper = business.url ? 'a' : 'div';

  return (
    <Wrapper
      {...(business.url
        ? { href: business.url, target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      // items-start and h-full: the name and description wrap now rather than
      // truncating, so the mark must stay put and short cards must not float.
      className={`group flex h-full items-start gap-3 rounded-xl border border-border/50 bg-card/50 p-3 transition-all duration-200 ${
        business.url ? 'hover:border-primary/40 hover:shadow-md' : ''
      }`}
    >
      <div className={`flex h-10 w-14 flex-shrink-0 items-center justify-center rounded-lg p-1 ${plate(business)}`}>
        <img
          src={asset(business.asset)}
          alt={`${business.name} logo`}
          loading="lazy"
          decoding="async"
          className={`max-h-full max-w-full w-auto object-contain ${
            business.invertOnDark ? 'dark:brightness-200 dark:invert' : 'dark:brightness-110'
          }`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-1.5">
          <h4 className="text-sm font-semibold text-foreground">{business.name}</h4>
          {business.isBeta && (
            <Badge className="border-amber-500/30 bg-amber-500/20 px-1.5 py-0 text-[9px] leading-4 text-amber-600 dark:text-amber-400">
              {portfolio.betaBadge}
            </Badge>
          )}
          {business.url && (
            <ExternalLink className="ml-auto h-3 w-3 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
        <p className="text-[11px] font-medium text-primary/80">{business.role}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{business.description}</p>
      </div>
    </Wrapper>
  );
};

/**
 * One primary block, three branches, a secondary shelf.
 *
 * Renders above 768px only, since Index.tsx swaps in the mobile tree below
 * that, which is why there is no mobile branch left in here.
 */
const LivePortfolio = () => (
  <section id={portfolio.id} className="section-padding scroll-mt-16">
    <div className="container-width">
      <div className="mb-6 text-center md:mb-10">
        <h2 className="headline-lg mb-3 md:mb-4">{portfolio.title}</h2>
        <p className="body-lg mx-auto max-w-2xl text-muted-foreground">{portfolio.sub}</p>
      </div>

      {/* The primary block. One brand, three arms inside its border, so the
          hierarchy is the layout rather than something the copy has to claim. */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur-sm md:p-8">
        {/* The wordmark is the name, so there is no heading under it repeating
            it in type. A 5.9:1 mark also cannot live in the small square tile
            the other logos use; at max-w-[9rem] it came out 144x24. */}
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <div className={`rounded-lg px-3 py-2 ${plate(portfolio.primary)}`}>
            <img
              src={asset(portfolio.primary.asset)}
              alt={portfolio.primary.name}
              loading="lazy"
              decoding="async"
              className="h-9 w-auto max-w-[17rem] object-contain"
            />
          </div>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            {portfolio.primary.description}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {portfolio.primary.branches.map((b) => (
            <Branch key={b.name} branch={b} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
          {portfolio.secondaryHeading}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.secondary.map((b) => (
            <SecondaryCard key={b.name} business={b} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default LivePortfolio;
