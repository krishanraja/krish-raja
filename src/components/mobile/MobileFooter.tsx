import { nav } from '@/content';
import { discoveryProfiles } from '@/content/discovery';

const MobileFooter = () => (
  <footer className="px-5 py-5 text-center">
    <nav aria-label="Professional profiles" className="mb-2 flex flex-wrap items-center justify-center gap-x-5">
      {discoveryProfiles.map(profile => <a key={profile.path} href={profile.path} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">{profile.label}</a>)}
    </nav>
    <p className="text-[11px] text-muted-foreground">
      © {new Date().getFullYear()} {nav.brand}
    </p>
  </footer>
);

export default MobileFooter;
