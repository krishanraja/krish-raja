import MobileSection from './MobileSection';
import { appearances } from '@/content';
import { SelectedWork } from '@/components/SelectedWork';

const MobileSelectedWork = () => (
  <MobileSection
    id={appearances.id}
    title={appearances.title}
    intro={appearances.sub}
    tone="muted"
  >
    <SelectedWork layout="rail" />
  </MobileSection>
);

export default MobileSelectedWork;
