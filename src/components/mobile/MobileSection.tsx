import { ReactNode } from 'react';

interface MobileSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: 'default' | 'muted';
}

const MobileSection = ({ id, eyebrow, title, intro, children, tone = 'default' }: MobileSectionProps) => (
  <section
    id={id}
    className={`mobile-section ${tone === 'muted' ? 'bg-muted/30' : ''}`}
  >
    <header className="mb-5">
      {eyebrow && <p className="mobile-eyebrow mb-2">{eyebrow}</p>}
      <h2 className="mobile-h2 text-foreground">{title}</h2>
      {intro && <p className="mobile-body text-muted-foreground mt-2">{intro}</p>}
    </header>
    {children}
  </section>
);

export default MobileSection;
