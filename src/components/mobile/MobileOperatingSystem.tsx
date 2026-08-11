import MobileSection from './MobileSection';
import { os } from '@/content';
import { pick } from '@/content/types';
import { OsTile } from '@/components/OsGallery';

const MobileOperatingSystem = () => (
  <MobileSection
    id={os.id}
    eyebrow={pick(os.eyebrow, 'mobile')}
    title={pick(os.title, 'mobile')}
    intro={pick(os.sub, 'mobile')}
  >
    <div className="-mx-5 px-5 mobile-snap-track flex gap-3 overflow-x-auto pb-2">
      {os.entries.map((entry) => (
        <div key={entry.id} className="mobile-snap-item w-[82%] flex-shrink-0">
          <OsTile entry={entry} compact />
        </div>
      ))}
    </div>
  </MobileSection>
);

export default MobileOperatingSystem;
