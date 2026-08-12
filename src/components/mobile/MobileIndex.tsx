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
import { useForcedDesktopZoom } from '@/hooks/use-mobile';

const MobileIndex = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const zoom = useForcedDesktopZoom();

  // Opt body into snap-proximity scrolling while the mobile tree is mounted.
  useEffect(() => {
    document.body.dataset.mobileSnap = 'true';
    return () => {
      delete document.body.dataset.mobileSnap;
    };
  }, []);

  /**
   * Undo the desktop-site downscale.
   *
   * Chrome ignores a reasserted viewport meta while "Request desktop site" is
   * on, which is the setting's whole point, so asking for the real viewport
   * back does not work and this does: lay the document out at phone width and
   * paint it at the width Chrome is about to shrink. See useForcedDesktopZoom.
   *
   * `data-forced-desktop` is what the shared components read to pick their
   * mobile layout, because a media query cannot help here: zoom changes the
   * used value of a length but not the viewport a breakpoint is measured
   * against, so `md:` still fires at 980 inside a 400px document.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (zoom > 1.01) {
      root.style.zoom = String(zoom);
      root.dataset.forcedDesktop = 'true';
    } else {
      root.style.removeProperty('zoom');
      delete root.dataset.forcedDesktop;
    }
    return () => {
      root.style.removeProperty('zoom');
      delete root.dataset.forcedDesktop;
    };
  }, [zoom]);

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
    // No width clamp. The zoom above makes the document 400px wide whatever the
    // viewport claims, so the shell just fills it, the same on every device.
    <div className="min-h-screen bg-background">
      <a href="#main" className="skip-link">{nav.skipLink}</a>
      <MobileTopBar />
      <main id="main" className="pb-32">
        <MobileHero onOpenContact={() => setContactOpen(true)} />
        <MobilePhilosophy />
        <MobileOperatingSystem />
        <SlideDeck compact />
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
