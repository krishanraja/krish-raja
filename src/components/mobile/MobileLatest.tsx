import { ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';
import { latest, recentEntries } from '@/content';
import { pick } from '@/content/types';
import { LatestCard } from '@/components/LatestList';

const MobileLatest = () => (
  <MobileSection
    id={latest.id}
    eyebrow={pick(latest.eyebrow, 'mobile')}
    title={pick(latest.title, 'mobile')}
    intro={pick(latest.sub, 'mobile')}
  >
    <ul className="space-y-3">
      {recentEntries().map((entry) => (
        <li key={entry.id}>
          <LatestCard entry={entry} compact />
        </li>
      ))}
    </ul>

    <a
      href={latest.archive.href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary link-underline"
    >
      {latest.archive.label}
      <ArrowUpRight className="h-3 w-3" />
    </a>
  </MobileSection>
);

export default MobileLatest;
