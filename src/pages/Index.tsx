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
    // SEO and Analytics Setup
    document.title = "Krish Raja - AI Revenue Leader | 16 Years Scaling Businesses";
    
    // Structured data for search engines
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Krish Raja",
      "jobTitle": "AI Revenue Leader & Enterprise Strategist",
      "description": "16 years building revenue engines across 3 continents. From zero to multi-million ARR scaling AI-native businesses.",
      "url": "https://www.krishraja.com",
      "email": "hello@krishraja.com",
      "telephone": "+1-347-665-8225",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/in/krish-raja",
        "https://techonomic.substack.com"
      ],
      "knowsAbout": [
        "AI Product Development",
        "AI Literacy Education",
        "Revenue Operations", 
        "Go-to-Market Strategy",
        "Business Scaling"
      ],
      "alumniOf": "Microsoft",
      "awards": "30 Under 30"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

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
      // Clean up structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main">
        <Hero />
        <LivePortfolio />
        <Philosophy />
        <LearnWithMe />
        <Work />
        <ProofPoints />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
