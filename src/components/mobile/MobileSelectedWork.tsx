import MobileSection from './MobileSection';
import { appearances } from '@/content';
import { pick } from '@/content/types';
import { SelectedWork } from '@/components/SelectedWork';

const MobileSelectedWork = () => (
  <MobileSection
    id={appearances.id}
    eyebrow={appearances.eyebrow}
    title={pick(appearances.title, 'mobile')}
    intro={pick(appearances.sub, 'mobile')}
    tone="muted"
  >
    <SelectedWork layout="rail" />
  </MobileSection>
);

export default MobileSelectedWork;
