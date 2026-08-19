import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { appearances } from '@/content';
import { type Appearance, type AppearanceKind } from '@/content/types';
import { asset } from '@/lib/asset-map';

type Filter = AppearanceKind | 'all';

/**
 * Two layouts, one list.
 *
 * `rows` is the desktop layout: a small thumbnail beside the line of text, two
 * per row. It replaced a three-across grid of full-width 16:9 cards, which ran
 * the section past 1500px for twelve items and past 2600px with the full index
 * open. The evidence is a browser screenshot either way, so it does not need to
 * be large to do its job; it needs to be legible enough to prove the thing
 * exists.
 *
 * `rail` is the mobile layout: one card tall, swiped sideways. Same reason,
 * more sharply. Twelve stacked cards is a thousand pixels of thumb travel
 * through a section that is a list of links.
 */
type Layout = 'rows' | 'rail';

/** Desktop. Thumbnail left, outlet and title right, two to a row. */
const AppearanceRow = ({ item }: { item: Appearance }) => {
  const image = item.media ?? asset(item.asset);
  const Wrapper = item.href ? 'a' : 'div';

  return (
    <Wrapper
      {...(item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-3 shadow-sm transition-all duration-200 ${
        item.href ? 'hover:border-primary/40 hover:shadow-md' : ''
      }`}
    >
      {image && (
        <div className="aspect-video w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-primary">
            {item.outlet}
          </span>
          {item.year && (
            <span className="flex-shrink-0 text-[10px] text-muted-foreground">{item.year}</span>
          )}
          {item.href && (
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          )}
        </div>
        <h3
          className={`text-sm font-semibold leading-snug text-foreground transition-colors ${
            item.href ? 'group-hover:text-primary' : ''
          }`}
        >
          {item.title}
        </h3>
      </div>
    </Wrapper>
  );
};

/** Mobile. One card per screen with the next one peeking, swiped sideways. */
const AppearanceCard = ({ item }: { item: Appearance }) => {
  const image = item.media ?? asset(item.asset);
  const Wrapper = item.href ? 'a' : 'div';

  return (
    <Wrapper
      {...(item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="mobile-snap-item mobile-tap-spring flex w-[74vw] max-w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
    >
      {image && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-primary">
            {item.outlet}
          </span>
          {item.year && (
            <span className="flex-shrink-0 text-[10px] text-muted-foreground">{item.year}</span>
          )}
          {item.href && (
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-[13.5px] font-semibold leading-snug text-foreground">{item.title}</h3>
      </div>
    </Wrapper>
  );
};

/**
 * Selected work.
 *
 * Replaces the old "Writing and speaking" and "Latest" sections, which
 * overlapped. Twelve flagship items carry the section; the rest of the verified
 * record sits one tap away rather than being cut or dumped on the page.
 */
const SelectedWork = ({ layout = 'rows' }: { layout?: Layout }) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState(false);

  /**
   * Newest first, undated last.
   *
   * Sorted here rather than in appearances.ts so the data file can stay grouped
   * by what it means (the flagship set, then the rest of the index) while the
   * page shows what a visitor wants, which is the most recent thing he did.
   * Two entries carry no year: the Kroll podcast and the Captify hire
   * announcement, neither of which the content index dates.
   */
  const matching = useMemo(() => {
    const year = (v?: string) => (v ? Number(v) : -1);
    return appearances.items
      .filter((i) => filter === 'all' || i.kind === filter)
      .slice()
      .sort((a, b) => year(b.year) - year(a.year));
  }, [filter]);

  const visible = expanded ? matching : matching.slice(0, appearances.previewCount);
  const hiddenCount = Math.max(0, matching.length - appearances.previewCount);

  const key = (item: Appearance) => item.appearanceId ?? item.title;

  return (
    <>
      <div
        className={`mb-4 flex gap-1.5 ${
          layout === 'rail'
            ? 'mobile-scroll-x -mx-5 overflow-x-auto px-5'
            : 'mb-6 flex-wrap justify-center'
        }`}
      >
        {appearances.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`mobile-tap-spring flex-shrink-0 rounded-full px-3.5 text-xs font-medium transition-colors ${
              layout === 'rail' ? 'h-11' : 'py-1.5'
            } ${
              filter === f.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {layout === 'rail' ? (
        <div
          className="mobile-snap-track -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2"
          role="list"
        >
          {visible.map((item) => (
            <AppearanceCard key={key(item)} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {visible.map((item) => (
            <AppearanceRow key={key(item)} item={item} />
          ))}
        </div>
      )}

      {hiddenCount > 0 && (
        <div className={layout === 'rail' ? 'mt-4' : 'mt-6 text-center'}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`link-underline mobile-tap-spring inline-flex items-center gap-1.5 text-sm font-medium text-primary ${
              layout === 'rail' ? 'h-11' : ''
            }`}
          >
            {expanded ? appearances.lessLabel : `${appearances.moreLabel} (${hiddenCount} more)`}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </>
  );
};

const SelectedWorkSection = () => (
  <section id={appearances.id} className="section-padding scroll-mt-16">
    <div className="container-width">
      <div className="mb-6 text-center md:mb-10">
        <h2 className="headline-lg mb-3 md:mb-4">{appearances.title}</h2>
        <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
          {appearances.sub}
        </p>
      </div>
      <SelectedWork />
    </div>
  </section>
);

export { SelectedWork };
export default SelectedWorkSection;
