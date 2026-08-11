import { ArrowRight } from 'lucide-react';
import { latest } from '@/content';
import { pick } from '@/content/types';
import { LatestCard, recentEntries } from '@/components/LatestList';

const Latest = () => (
  <section id={latest.id} className="section-padding scroll-mt-16">
    <div className="container-width">
      <div className="text-center mb-6 md:mb-10">
        <h2 className="headline-lg mb-3 md:mb-4">{pick(latest.title, 'desktop')}</h2>
        <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
          {pick(latest.sub, 'desktop')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentEntries().map((entry) => (
          <LatestCard key={entry.id} entry={entry} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={latest.archive.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          {latest.archive.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </section>
);

export default Latest;
