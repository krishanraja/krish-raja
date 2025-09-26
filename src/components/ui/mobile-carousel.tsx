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
  minHeight?: 'carousel-sm' | 'carousel-md' | 'carousel-lg' | 'carousel-xl' | 'carousel-2xl';
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

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  // Use fixed height utility classes for uniform card heights
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
                <div className={`w-full ${heightClass} overflow-hidden`}>
                  <div className="h-full p-4 flex flex-col justify-between">
                    {React.cloneElement(child, {
                      className: `${child.props.className || ''} flex-1 overflow-hidden`
                    })}
                  </div>
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