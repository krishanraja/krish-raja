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
  minHeight?: 'carousel-sm' | 'carousel-md' | 'carousel-lg' | 'carousel-xl' | 'carousel-2xl' | 'carousel-3xl' | 'carousel-4xl' | 'carousel-5xl';
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  className = "",
  itemClassName = "",
  showDots = true,
  spaceBetween = 16,
  uniformHeight = true,
  minHeight = "carousel-md"
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
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  // Mobile: Pure Flexbox carousel with forced Card heights
  const heightClass = uniformHeight ? `h-${minHeight}` : "";
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
          {children.map((child, index) => (
            <CarouselItem key={index} className={itemClasses}>
              {uniformHeight ? (
                // Apply height directly to the Card component with !important override
                <div className={`w-full ${heightClass} flex flex-col`} style={{ minHeight: 'unset' }}>
                  {React.cloneElement(child, {
                    className: `${child.props.className?.replace(/h-full|flex-1|min-h-\[\d+px\]/g, '') || ''} !${heightClass} overflow-hidden flex flex-col`,
                    style: { 
                      height: `var(--${minHeight})`,
                      minHeight: `var(--${minHeight})`,
                      maxHeight: `var(--${minHeight})`,
                      ...child.props.style 
                    }
                  })}
                </div>
              ) : (
                child
              )}
            </CarouselItem>
          ))}
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