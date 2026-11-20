import { useEffect, useState } from 'react';
import MobileContactOptions from './MobileContactOptions';
import MobileActionDock from './MobileActionDock';
import SlideDeck from '@/components/SlideDeck';
import MobileReceipts from './MobileReceipts';
import MobileContact from './MobileContact';
import { HomeHero, WaysIn, Channel, InPublic, Sessions } from '@/components/home/sections';
import { AskProvider } from '@/components/home/EnquiryDialog';
import { PageLoader, useReveals } from '@/components/home/shared';
import '@/components/home/home.css';
import MobileFooter from './MobileFooter';
import { nav } from '@/content';
import { usePhoneDocumentScale } from '@/hooks/use-mobile';

const MobileIndex = () => {
  const [ready, setReady] = useState(false);
  usePhoneDocumentScale(true);
  useReveals(ready);

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
    // No width clamp. The zoom above makes the document 400px wide whatever the
    // viewport claims, so the shell just fills it, the same on every device.
    <AskProvider otherWays={<MobileContactOptions />}>
      <div className="home home--m min-h-screen">
        <PageLoader onDone={() => setReady(true)} />
        <a href="#main" className="skip-link">{nav.skipLink}</a>
        <main id="main" className="pb-32" tabIndex={-1}>
          <HomeHero mobile />
          <WaysIn mobile />
          <SlideDeck compact />
          <Channel mobile />
          <InPublic mobile />
          <Sessions mobile />
          <MobileReceipts />
          <MobileContact />
        </main>
        <MobileFooter />
        <MobileActionDock />
      </div>
    </AskProvider>
  );
};

export default MobileIndex;
