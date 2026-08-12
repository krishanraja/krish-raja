import { useEffect, useState } from 'react';
import MobileTopBar from './MobileTopBar';
import MobileActionDock from './MobileActionDock';
import MobileContactSheet from './MobileContactSheet';
import MobileHero from './MobileHero';
import MobilePhilosophy from './MobilePhilosophy';
import MobileOperatingSystem from './MobileOperatingSystem';
import SlideDeck from '@/components/SlideDeck';
import MobilePortfolio from './MobilePortfolio';
import MobileReceipts from './MobileReceipts';
import MobileSelectedWork from './MobileSelectedWork';
import MobileLessons from './MobileLessons';
import MobileContact from './MobileContact';
import MobileFooter from './MobileFooter';
import { nav } from '@/content';

const MobileIndex = () => {
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
      <a href="#main" className="skip-link">{nav.skipLink}</a>
      <MobileTopBar />
      <main id="main" className="pb-32">
        <MobileHero onOpenContact={() => setContactOpen(true)} />
        <MobilePhilosophy />
        <MobileOperatingSystem />
        <SlideDeck />
        <MobilePortfolio />
        <MobileReceipts />
        <MobileSelectedWork />
        <MobileLessons />
        <MobileContact />
      </main>
      <MobileFooter />
      <MobileActionDock onOpenContact={() => setContactOpen(true)} />
      <MobileContactSheet open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default MobileIndex;
