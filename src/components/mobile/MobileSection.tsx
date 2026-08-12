import { ReactNode } from 'react';

/**
 * No eyebrow prop. Every section used to pass one, and because no desktop copy
 * existed to fill it, all eight labels were invented for the slot. The slot is
 * gone, so the temptation is too.
 */
interface MobileSectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: 'default' | 'muted';
}

const MobileSection = ({ id, title, intro, children, tone = 'default' }: MobileSectionProps) => (
  <section
    id={id}
    className={`mobile-section ${tone === 'muted' ? 'bg-muted/30' : ''}`}
  >
    <header className="mb-5">
      <h2 className="mobile-h2 text-foreground">{title}</h2>
      {intro && <p className="mobile-body text-muted-foreground mt-2">{intro}</p>}
    </header>
    {children}
  </section>
);

export default MobileSection;
