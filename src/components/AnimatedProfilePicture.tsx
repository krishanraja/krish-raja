import { useState, useEffect } from 'react';
import { useIsMobileResolved } from '@/hooks/use-mobile';
import krishBitmoji from '@/assets/krish_bitmoji.jpg';
import krishHeadshot from '@/assets/krish-headshot.jpg';

// Preload profile images immediately
const preloadProfileImages = () => {
  [krishBitmoji, krishHeadshot].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const AnimatedProfilePicture = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isMobile = useIsMobileResolved();

  // Preload images on mount
  useEffect(() => {
    preloadProfileImages();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <div className="relative">
      {/* Pulsing ring (stops after first tap) */}
      {!hasInteracted && (
        <div className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
      )}
      
      {/* 3D Flip Container */}
      <div 
        onClick={handleFlip}
        className="w-28 h-28 cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Front: Cartoon */}
          <img 
            src={krishBitmoji} 
            alt="Krish Raja - Cartoon"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full rounded-full object-cover shadow-lg ring-4 ring-primary/20"
            style={{ backfaceVisibility: 'hidden' }}
          />
          
          {/* Back: Headshot */}
          <img 
            src={krishHeadshot} 
            alt="Krish Raja"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full rounded-full object-cover shadow-lg ring-4 ring-primary/20"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          />
        </div>
      </div>
      
      {/* Desktop: "Tap me" hint. Strict equality so the hint never flashes before the hook resolves. */}
      {isMobile === false && !hasInteracted && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-pulse whitespace-nowrap">
          Tap me
        </span>
      )}
    </div>
  );
};

export default AnimatedProfilePicture;
