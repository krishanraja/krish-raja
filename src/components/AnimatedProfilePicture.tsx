import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import krishBitmoji from '@/assets/krish_bitmoji.jpg';
import krishHeadshot from '@/assets/krish-headshot.jpg';

const AnimatedProfilePicture = () => {
  const [revealProgress, setRevealProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate where the element center is relative to viewport
      const elementCenterY = rect.top + rect.height / 2;
      const viewportProgress = elementCenterY / viewportHeight;
      
      // Start transition almost immediately on scroll (95% down viewport)
      // Complete while still visible (60% down viewport)
      const startPoint = 0.95;
      const endPoint = 0.6;
      
      if (viewportProgress >= startPoint) {
        setRevealProgress(0);
      } else if (viewportProgress <= endPoint) {
        setRevealProgress(1);
      } else {
        const progress = (startPoint - viewportProgress) / (startPoint - endPoint);
        setRevealProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile: Fade + scale for better performance
  if (isMobile) {
    return (
      <div ref={containerRef} className="relative w-28 h-28">
        {/* Cartoon (fades out) */}
        <img 
          src={krishBitmoji} 
          alt="Krish Raja - Cartoon" 
          className="absolute inset-0 w-28 h-28 rounded-full shadow-lg ring-4 ring-primary/20 object-cover transition-all duration-200 ease-out"
          style={{
            opacity: 1 - revealProgress,
            transform: `scale(${1 - revealProgress * 0.1})`,
            filter: `blur(${revealProgress * 4}px)`,
          }}
        />
        {/* Real headshot (fades in with scale) */}
        <img 
          src={krishHeadshot} 
          alt="Krish Raja" 
          className="absolute inset-0 w-28 h-28 rounded-full shadow-lg ring-4 ring-primary/20 object-cover transition-all duration-200 ease-out"
          style={{
            opacity: revealProgress,
            transform: `scale(${0.9 + revealProgress * 0.1})`,
          }}
        />
      </div>
    );
  }

  // Desktop version with circular clip-path reveal
  return (
    <div ref={containerRef} className="relative w-28 h-28 group">
      {/* Cartoon (base layer - fades and blurs out) */}
      <img 
        src={krishBitmoji} 
        alt="Krish Raja - Cartoon" 
        className="absolute inset-0 w-28 h-28 rounded-full shadow-lg ring-4 ring-primary/20 object-cover"
        style={{
          opacity: 1 - revealProgress * 0.5,
          filter: `blur(${revealProgress * 8}px)`,
          transform: `scale(${1 + revealProgress * 0.05})`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Real headshot (reveals with circular clip-path from center) */}
      <img 
        src={krishHeadshot} 
        alt="Krish Raja" 
        className="absolute inset-0 w-28 h-28 rounded-full shadow-lg ring-4 ring-primary/20 object-cover"
        style={{
          clipPath: `circle(${revealProgress * 50}% at 50% 50%)`,
          opacity: revealProgress > 0 ? 1 : 0,
          transition: 'clip-path 0.1s ease-out, opacity 0.2s ease-out',
        }}
      />
      
      {/* Glow effect during transition */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: revealProgress > 0 && revealProgress < 1 
            ? `0 0 ${20 + revealProgress * 20}px hsl(var(--primary) / ${0.3 - Math.abs(revealProgress - 0.5) * 0.4})`
            : 'none',
          transition: 'box-shadow 0.3s ease-out',
        }}
      />
    </div>
  );
};

export default AnimatedProfilePicture;
