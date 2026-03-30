

## Credentials as a Reverse Ticker on Mobile

### What changes

**On mobile only**, replace the credentials carousel with a CSS-animated ticker strip (same technique as the company logos), scrolling in the **opposite direction** (right-to-left becomes left-to-right). Place it directly above the logo ticker, creating a paired visual effect.

Desktop stays unchanged (wrapped badges in the grid).

### Files to change

**1. `src/components/ProofPoints.tsx`**
- In the mobile branch (`isMobile`), remove the `MobileCarousel`-wrapped credentials section from its current position
- Move credentials into the bottom ticker area, above the logos
- Render credentials as a `flex` strip with duplicated items (same `[...credentials, ...credentials]` pattern as logos), using `animate-[scroll-reverse_12s_linear_infinite]` to scroll the opposite direction
- Each credential rendered as a compact badge with the Award icon
- Keep the "Recognition & Credentials" heading as a small label above the ticker

**2. `tailwind.config.ts`**
- Add a `scroll-reverse` keyframe: `0%: translateX(-50%)` → `100%: translateX(0)` (opposite of `scroll`)

### Visual result on mobile
```text
─────────────────────────────
Recognition & Credentials
←← Former 30 Under 30 | Harvard Business School | MA Design Strategy...
→→ Nine | McCann | Captify | Singtel | BBC | Microsoft...
─────────────────────────────
```

Two tickers moving in opposite directions, creating visual energy.

