import { ExternalLink } from 'lucide-react';
import MobileSection from './MobileSection';
import { portfolio } from '@/content';
import { type PortfolioBranch, type PortfolioItem } from '@/content/types';
import { asset } from '@/lib/asset-map';

const plate = (b: { plateOnDark?: boolean; plateOnLight?: boolean }) =>
  b.plateOnDark
    ? 'bg-muted/40 dark:bg-white'
    : b.plateOnLight
      ? 'bg-foreground dark:bg-muted/40'
      : 'bg-muted/40';

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

/**
 * One arm of Mindmake, as a tap row.
 *
 * A list, not a rail. Three destinations do not need a swipe, and nesting a
 * horizontal scroller inside a card is a good way to make neither gesture work.
 */
const BranchRow = ({ branch }: { branch: PortfolioBranch }) => {
  const Wrapper = branch.url ? 'a' : 'div';

  return (
    <Wrapper
      {...(branch.url ? { href: branch.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="mobile-tap-spring flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3"
    >
      <img
        src={asset('mindmake-mark')}
        alt=""
        loading="lazy"
        decoding="async"
        className={`mt-0.5 h-6 w-auto flex-shrink-0 ${markRadius[branch.mark]}`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-[13.5px] font-semibold text-foreground">{branch.name}</h4>
          <span className="text-[10px] font-medium uppercase tracking-wide text-primary/80">
            {branch.role}
          </span>
          {branch.url && (
            <ExternalLink className="ml-auto h-3 w-3 flex-shrink-0 text-muted-foreground" />
          )}
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
          {branch.description}
        </p>
        {branch.formats && (
          <div className="mt-2 flex flex-wrap gap-1.5">
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
      </div>
    </Wrapper>
  );
};

/** A secondary pursuit. Two per row, mark and name, nothing more. */
const SecondaryTile = ({ business }: { business: PortfolioItem }) => {
  const Wrapper = business.url ? 'a' : 'div';

  return (
    <Wrapper
      {...(business.url
        ? { href: business.url, target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="mobile-tap-spring flex h-full min-h-[3.5rem] items-start gap-2.5 rounded-xl border border-border/60 bg-card p-2.5 shadow-sm"
    >
      <div className={`flex h-9 w-11 flex-shrink-0 items-center justify-center rounded-lg p-1 ${plate(business)}`}>
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
      {/* No Beta chip here. At two tiles across, the badge stole enough width
          to truncate "Fractionl Pulse" to "Fractionl P...", and the role line
          underneath already says Build experiment. */}
      <div className="min-w-0 flex-1">
        <h4 className="text-[12.5px] font-semibold leading-snug text-foreground">{business.name}</h4>
        <p className="text-[10.5px] leading-snug text-muted-foreground">{business.role}</p>
      </div>
    </Wrapper>
  );
};

/**
 * One primary card, three rows inside it, then a quieter shelf.
 *
 * Same hierarchy as the desktop tree, expressed the way a phone can carry it:
 * the branches are rows rather than a three-across grid, and the secondary
 * pursuits are a two-column grid of marks rather than full-width cards, which
 * is what keeps the section inside its height budget.
 */
const MobilePortfolio = () => (
  <MobileSection id={portfolio.id} title={portfolio.title} intro={portfolio.sub}>
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      {/* A row of its own. In the 56px tile the other logos use, a 5.9:1
          wordmark renders about nine pixels tall. The wordmark is the name, so
          nothing repeats it in type underneath. */}
      <div className="mb-3">
        <span className={`mb-2 inline-block rounded-lg px-2 py-1.5 ${plate(portfolio.primary)}`}>
          <img
            src={asset(portfolio.primary.asset)}
            alt={portfolio.primary.name}
            loading="lazy"
            decoding="async"
            className="h-6 w-auto object-contain"
          />
        </span>
        <p className="text-[12.5px] leading-snug text-muted-foreground">
          {portfolio.primary.description}
        </p>
      </div>

      <ul className="space-y-2">
        {portfolio.primary.branches.map((b) => (
          <li key={b.name}>
            <BranchRow branch={b} />
          </li>
        ))}
      </ul>
    </div>

    <p className="mb-2.5 mt-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      {portfolio.secondaryHeading}
    </p>
    <ul className="grid grid-cols-2 gap-2">
      {portfolio.secondary.map((b) => (
        <li key={b.name}>
          <SecondaryTile business={b} />
        </li>
      ))}
    </ul>
  </MobileSection>
);

export default MobilePortfolio;
