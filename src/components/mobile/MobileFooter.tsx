import { nav } from '@/content';

const MobileFooter = () => (
  <footer className="px-5 py-5 text-center">
    <p className="text-[11px] text-muted-foreground">
      © {new Date().getFullYear()} {nav.brand}
    </p>
  </footer>
);

export default MobileFooter;
