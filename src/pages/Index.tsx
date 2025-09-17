import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HowIHelp from '@/components/HowIHelp';
import StrategicFramework from '@/components/StrategicFramework';
import ProofPoints from '@/components/ProofPoints';
import AIMindMaker from '@/components/AIMindMaker';
import Work from '@/components/Work';
import StrategicAdvisor from '@/components/StrategicAdvisor';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // SEO and Analytics Setup
    document.title = "Krish Raja - AI Strategy & Revenue Growth Advisor | 16+ Years Building Businesses";
    
    // Structured data for search engines
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Krish Raja",
      "jobTitle": "AI Strategy & Revenue Growth Advisor",
      "description": "Strategic advisor helping executives turn AI literacy into revenue growth. Scaled businesses from $0 to $61M across 3 continents.",
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
        "AI Strategy",
        "Revenue Operations",
        "Data Commercialization", 
        "Go-to-Market Strategy",
        "Business Scaling"
      ],
      "alumniOf": "Microsoft",
      "awards": "30 Under 30 (Marketing & Media)"
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
    <>
      <head>
        <title>Krish Raja - AI Strategy & Revenue Growth Advisor | 16+ Years Building Businesses</title>
        <meta 
          name="description" 
          content="Strategic advisor helping executives turn AI literacy into revenue growth. Scaled businesses from $0 to $61M across 3 continents. Book a strategy call." 
        />
        <meta name="keywords" content="AI strategy consultant, data transformation advisor, revenue operations expert, AI business consultant, strategic AI implementation" />
        <meta name="author" content="Krish Raja" />
        <meta property="og:title" content="Krish Raja - AI Strategy & Revenue Growth Advisor" />
        <meta property="og:description" content="Strategic advisor helping executives turn AI literacy into revenue growth. 16+ years building businesses from $0 to $61M." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.krishraja.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Krish Raja - AI Strategy & Revenue Growth Advisor" />
        <meta name="twitter:description" content="Strategic advisor helping executives turn AI literacy into revenue growth. Book a strategy call." />
        <link rel="canonical" href="https://www.krishraja.com" />
      </head>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main id="main">
          <Hero />
          <HowIHelp />
          <StrategicFramework />
          <ProofPoints />
          <AIMindMaker />
          <Work />
          <StrategicAdvisor />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
