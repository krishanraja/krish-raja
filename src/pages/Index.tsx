import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import SlideDeck from '@/components/SlideDeck';
import ProofPoints from '@/components/ProofPoints';
import Contact from '@/components/Contact';
import { HomeHero, WaysIn, Channel, InPublic, Sessions } from '@/components/home/sections';
import { AskProvider, PageLoader, useReveals } from '@/components/home/shared';
import '@/components/home/home.css';
import Footer from '@/components/Footer';
import MobileIndex from '@/components/mobile/MobileIndex';
import { useIsMobileResolved } from '@/hooks/use-mobile';
import { useLandOnSection } from '@/hooks/use-land-on-section';

const DesktopIndex = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [ready, setReady] = useState(false);
  useReveals(ready);

  return (
    <AskProvider centered>
      <div className="home home--d min-h-screen">
        <PageLoader onDone={() => setReady(true)} />
        <Navigation />

        <main id="main">
          <HomeHero mobile={false} />
          <WaysIn mobile={false} />
          <SlideDeck />
          <Channel mobile={false} />
          <InPublic mobile={false} />
          <Sessions mobile={false} />
          <ProofPoints />
          <Contact />
        </main>

        <Footer />
      </div>
    </AskProvider>
  );
};

const Index = () => {
  const isMobile = useIsMobileResolved();
  useLandOnSection(isMobile !== undefined);
  if (isMobile === undefined) return <div className="min-h-screen bg-background" />;
  return isMobile ? <MobileIndex /> : <DesktopIndex />;
};

export default Index;
