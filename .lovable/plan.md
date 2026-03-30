

## Unified Mobile Carousel System

### Problem
7+ horizontal swipe zones using 3 different implementations (MobileCarousel/embla, raw `overflow-x-auto snap-x`, raw `overflow-x-auto`). Inconsistent feel, no unified interaction pattern.

### Solution: One Carousel, One Feel

Standardize **every** horizontal swipe section to use the same `MobileCarousel` component with identical interaction behavior:

- Same 85% peek pattern (next card visible)
- Same dot indicators
- Same embla-powered smooth snap
- No arrow buttons on mobile (swipe only)
- Consistent spacing and padding

### Changes

**1. `src/components/ui/mobile-carousel.tsx`**
- Hide `CarouselPrevious`/`CarouselNext` on mobile (add `hidden md:flex`)
- Ensure consistent dot style, spacing, and snap behavior across all uses

**2. `src/components/LivePortfolio.tsx`**
- Replace the raw `overflow-x-auto snap-x` in `BusinessGrid` mobile path with `MobileCarousel`
- Cards get the same peek + dot + snap treatment as everywhere else

**3. `src/components/ProofPoints.tsx`**
- Replace the raw `overflow-x-auto` credentials badge strip with `MobileCarousel` (each slide = 2-3 badges grouped, or individual badge cards)
- Credentials are currently the only section using a completely different scroll mechanism

**4. No structural changes to Philosophy, Work, or LearnWithMe** — they already use `MobileCarousel`. They just inherit the improved consistency from step 1.

### Result
Every swipeable section on mobile uses identical physics, peek ratio, dots, and gesture handling. One muscle memory for the user.

