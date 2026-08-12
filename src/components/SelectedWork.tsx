import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { appearances } from '@/content';
import { pick, type Appearance, type AppearanceKind } from '@/content/types';
import { asset } from '@/lib/asset-map';

type Filter = AppearanceKind | 'all';

const AppearanceCard = ({ item, compact = false }: { item: Appearance; compact?: boolean }) => {
  const image = item.media ?? asset(item.asset);
  const Wrapper = item.href ? 'a' : 'div';

  return (
    <Wrapper
      {...(item.href
        ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 ${
        item.href ? 'hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg' : ''
      }`}
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
      <div className={compact ? 'p-3' : 'p-4'}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {item.outlet}
          </span>
          {item.year && <span className="text-[10px] text-muted-foreground">{item.year}</span>}
          {item.href && (
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          )}
        </div>
        <h3
          className={`font-semibold leading-snug text-foreground transition-colors ${
            item.href ? 'group-hover:text-primary' : ''
          } ${compact ? 'text-[13px]' : 'text-sm'}`}
        >
          {item.title}
        </h3>
        {item.note && (
          <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{item.note}</p>
        )}
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
const SelectedWork = ({ compact = false }: { compact?: boolean }) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    const matching = appearances.items.filter((i) => filter === 'all' || i.kind === filter);
    return expanded ? matching : matching.filter((i) => i.flagship);
  }, [filter, expanded]);

  const hiddenCount = useMemo(() => {
    const matching = appearances.items.filter((i) => filter === 'all' || i.kind === filter);
    return matching.length - matching.filter((i) => i.flagship).length;
  }, [filter]);

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-center gap-1.5">
        {appearances.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === f.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className={
          compact
            ? 'grid grid-cols-2 gap-3'
            : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {visible.map((item) => (
          <AppearanceCard key={item.appearanceId ?? item.title} item={item} compact={compact} />
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-primary"
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
        <h2 className="headline-lg mb-3 md:mb-4">{pick(appearances.title, 'desktop')}</h2>
        <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
          {pick(appearances.sub, 'desktop')}
        </p>
      </div>
      <SelectedWork />
    </div>
  </section>
);

export { SelectedWork };
export default SelectedWorkSection;
