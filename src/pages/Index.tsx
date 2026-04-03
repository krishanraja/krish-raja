import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LivePortfolio from '@/components/LivePortfolio';
import Philosophy from '@/components/Philosophy';
import LearnWithMe from '@/components/LearnWithMe';
import ProofPoints from '@/components/ProofPoints';
import Work from '@/components/Work';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Simple scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all fade-in-up elements
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main">
        <Hero />
        <Philosophy />
        <ProofPoints />
        <LivePortfolio />
        <Work />
        <LearnWithMe />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
