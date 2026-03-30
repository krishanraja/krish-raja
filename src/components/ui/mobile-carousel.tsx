import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface MobileCarouselProps {
  children: React.ReactElement[];
  className?: string;
  itemClassName?: string;
  showDots?: boolean;
  spaceBetween?: number;
  uniformHeight?: boolean;
  minHeight?: 'carousel-xs' | 'carousel-sm' | 'carousel-md' | 'carousel-lg' | 'carousel-xl' | 'carousel-2xl' | 'carousel-3xl' | 'carousel-4xl' | 'carousel-5xl';
  allowContentExpansion?: boolean;
  expandedIndex?: number | null;
  alwaysCarousel?: boolean;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  className = "",
  itemClassName = "",
  showDots = true,
  spaceBetween = 16,
  uniformHeight = true,
  minHeight = "carousel-md",
  allowContentExpansion = false,
  expandedIndex = null,
  alwaysCarousel = false
}) => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = React.useState(0);
  const [carouselApi, setCarouselApi] = React.useState<any>();

  React.useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on('select', () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Desktop: render as provided (usually Grid)
  if (!isMobile && !alwaysCarousel) {
    return <div className={className}>{children}</div>;
  }

  const desktopBasis = alwaysCarousel && !isMobile ? 'basis-[33.333%]' : 'basis-[85%]';
  const itemClasses = `pl-4 ${desktopBasis} ${itemClassName}`;

  // Mobile: Pure Flexbox carousel with forced Card heights
  const getHeightClass = (height: string) => {
    switch (height) {
      case 'carousel-xs': return 'h-carousel-xs min-h-carousel-xs';
      case 'carousel-sm': return 'h-carousel-sm min-h-carousel-sm';
      case 'carousel-md': return 'h-carousel-md min-h-carousel-md';
      case 'carousel-lg': return 'h-carousel-lg min-h-carousel-lg';
      case 'carousel-xl': return 'h-carousel-xl min-h-carousel-xl';
      case 'carousel-2xl': return 'h-carousel-2xl min-h-carousel-2xl';
      case 'carousel-3xl': return 'h-carousel-3xl min-h-carousel-3xl';
      case 'carousel-4xl': return 'h-carousel-4xl min-h-carousel-4xl';
      case 'carousel-5xl': return 'h-carousel-5xl min-h-carousel-5xl';
      default: return 'h-carousel-md min-h-carousel-md';
    }
  };

  const heightClasses = uniformHeight ? getHeightClass(minHeight) : "";
  const itemClasses = `pl-4 basis-[85%] ${itemClassName}`;

  return (
    <div className="relative">
      <Carousel
        setApi={setCarouselApi}
        className="w-full"
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-4 flex items-stretch">
          {children.map((child, index) => {
            const isCurrentExpanded = allowContentExpansion && expandedIndex === index;
            const baseHeightClasses = uniformHeight ? getHeightClass(minHeight) : "";
            const minHeightOnly = baseHeightClasses.split(' ').find(cls => cls.startsWith('min-h-'));
            
            return (
              <CarouselItem key={index} className={itemClasses}>
                {uniformHeight ? (
                  <div className={`w-full ${isCurrentExpanded ? minHeightOnly : baseHeightClasses} flex flex-col transition-all duration-300`}>
                    {React.cloneElement(child, {
                      className: `${child.props.className || ''} h-full flex flex-col ${isCurrentExpanded ? '' : 'overflow-hidden'}`,
                    })}
                  </div>
                ) : (
                  <div className="w-full">
                    {child}
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {/* Navigation buttons */}
        <CarouselPrevious className="left-2 h-8 w-8" />
        <CarouselNext className="right-2 h-8 w-8" />
      </Carousel>

      {/* Dot indicators */}
      {showDots && children.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {children.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === current 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};