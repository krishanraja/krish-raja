import { useEffect } from 'react';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';
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
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
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
      <MobileTopBar />
      <main id="main" className="pb-20">
        <MobileHero />
        <MobilePhilosophy />
        <MobilePortfolio />
        <MobileReceipts />
        <MobileWriting />
        <MobileLessons />
        <MobileWorkWithMe />
        <MobileContact />
      </main>
      <MobileFooter />
      <MobileBottomNav />
    </div>
  );
};

export default MobileIndex;
