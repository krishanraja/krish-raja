import { ArrowUpRight } from 'lucide-react';
import { latest } from '@/content';
import type { LatestEntry } from '@/content/types';
import { asset } from '@/lib/asset-map';

const formatDate = (iso?: string) => {
  if (!iso) return null;
  const [year, month] = iso.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const label = months[Number(month) - 1];
  return label ? `${label} ${year}` : year;
};

export const LatestCard = ({ entry, compact = false }: { entry: LatestEntry; compact?: boolean }) => {
  const thumbnail = asset(entry.asset);
  const date = formatDate(entry.date);

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      {thumbnail && (
        <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          {latest.typeLabels[entry.type]}
        </span>
        {entry.format && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {entry.format}
          </span>
        )}
        {date && <span className="text-[10px] text-muted-foreground">{date}</span>}
        <ArrowUpRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      <h3
        className={`font-semibold leading-snug text-foreground transition-colors group-hover:text-primary ${
          compact ? 'line-clamp-3 text-[13.5px]' : 'line-clamp-3 text-sm'
        }`}
      >
        {entry.title}
      </h3>
      {entry.blurb && (
        <p className={`mt-1.5 leading-snug text-muted-foreground ${compact ? 'text-[12px]' : 'text-xs'}`}>
          {entry.blurb}
        </p>
      )}
    </a>
  );
};
