import MobileSection from './MobileSection';
import { os } from '@/content';
import { pick } from '@/content/types';
import { OsClip } from '@/components/OsGallery';

const MobileOperatingSystem = () => (
  <MobileSection
    id={os.id}
    eyebrow={os.eyebrow}
    title={pick(os.title, 'mobile')}
    intro={pick(os.sub, 'mobile')}
  >
    <div className="-mx-5 px-5 mobile-snap-track flex gap-4 overflow-x-auto pb-2">
      {os.entries.map((entry) => (
        <div key={entry.id} className="mobile-snap-item w-[66%] flex-shrink-0">
          <OsClip entry={entry} />
        </div>
      ))}
    </div>
  </MobileSection>
);

export default MobileOperatingSystem;
