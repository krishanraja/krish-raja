import { useEffect, useState } from 'react';
import MobileTopBar from './MobileTopBar';
import MobileActionDock from './MobileActionDock';
import MobileWorkSheet from './MobileWorkSheet';
import MobileContactSheet from './MobileContactSheet';
import MobileHero from './MobileHero';
import MobilePhilosophy from './MobilePhilosophy';
import MobilePortfolio from './MobilePortfolio';
import MobileReceipts from './MobileReceipts';
import MobileWriting from './MobileWriting';
import MobileLessons from './MobileLessons';
import MobileWorkWithMe from './MobileWorkWithMe';
import MobileContact from './MobileContact';
import MobileFooter from './MobileFooter';

const MobileIndex = () => {
  const [workOpen, setWorkOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Opt body into snap-proximity scrolling while the mobile tree is mounted.
  useEffect(() => {
    document.body.dataset.mobileSnap = 'true';
    return () => {
      delete document.body.dataset.mobileSnap;
    };
  }, []);

  // Reveal-on-scroll for any .fade-in-up elements inside section content.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="skip-link">Skip to main content</a>
      <MobileTopBar />
      <main id="main" className="pb-32">
        <MobileHero
          onOpenWork={() => setWorkOpen(true)}
          onOpenContact={() => setContactOpen(true)}
        />
        <MobilePhilosophy />
        <MobilePortfolio />
        <MobileReceipts />
        <MobileWriting />
        <MobileLessons />
        <MobileWorkWithMe />
        <MobileContact />
      </main>
      <MobileFooter />
      <MobileActionDock
        onOpenWork={() => setWorkOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />
      <MobileWorkSheet open={workOpen} onOpenChange={setWorkOpen} />
      <MobileContactSheet open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default MobileIndex;
