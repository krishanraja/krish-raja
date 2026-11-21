import { ContactPanel } from '@/components/Contact';
import { contact } from '@/content';
import { useMobileViewportHeight } from '@/hooks/use-mobile';

export default function MobileContact() {
  const screen = useMobileViewportHeight();
  const minHeight = screen > 0 ? `min(calc(${screen}px - var(--mobile-dock-h, 63px)), 940px)` : undefined;

  return (
    <section id={contact.id} className="mobile-section mobile-contact" style={{ minHeight }}>
      <ContactPanel />
    </section>
  );
}
