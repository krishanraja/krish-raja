import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import OperatingSystem from '@/components/OperatingSystem';
import SlideDeck from '@/components/SlideDeck';
import LivePortfolio from '@/components/LivePortfolio';
import ProofPoints from '@/components/ProofPoints';
import SelectedWork from '@/components/SelectedWork';
import LightningLessons from '@/components/LightningLessons';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileIndex from '@/components/mobile/MobileIndex';
import { useIsMobileResolved } from '@/hooks/use-mobile';

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main id="main">
        <Hero />
        <Philosophy />
        <OperatingSystem />
        <SlideDeck />
        <LivePortfolio />
        <ProofPoints />
        <SelectedWork />
        <LightningLessons />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

const Index = () => {
  const isMobile = useIsMobileResolved();
  if (isMobile === undefined) return <div className="min-h-screen bg-background" />;
  return isMobile ? <MobileIndex /> : <DesktopIndex />;
};

export default Index;
