
# Add Beta Banners to Portfolio Cards

## Overview
Add "Beta" badges to five business cards (WellWell, Conclusiv, Ritual, Swaami, Lockstep) to indicate these apps are not yet in production.

## Implementation

### 1. Update Business Interface
Add an optional `isBeta` property to the `Business` interface:
```typescript
interface Business {
  name: string;
  description: string;
  icon: string;
  url: string;
  role: string;
  mobileOnly?: boolean;
  isBeta?: boolean;  // NEW
}
```

### 2. Mark Beta Businesses
Add `isBeta: true` to the following entries in `builderBusinesses`:
- WellWell
- Conclusiv
- Ritual
- Swaami
- Lockstep

(Note: Rinoa is NOT marked as beta)

### 3. Add Badge Import
Import the existing `Badge` component:
```typescript
import { Badge } from '@/components/ui/badge';
```

### 4. Render Beta Badge in BusinessCard
Add conditional badge rendering inside the card, positioned in the top-left corner (adjusting for the existing mobile-only smartphone icon):

```text
┌──────────────────────────────┐
│ Beta              [↗]        │  ← Badge top-left, external link top-right
│    [icon]                    │
│    Business Name             │
│    Role                      │
│    Description...            │
└──────────────────────────────┘
```

The badge will use a subtle amber/yellow color scheme to indicate "in development" status without being too alarming:
- Background: `bg-amber-500/20`
- Text: `text-amber-600 dark:text-amber-400`
- Border: `border-amber-500/30`

### 5. Handle Icon Conflicts
The mobile-only smartphone icon currently appears at `top-3 left-3`. For cards that have both `mobileOnly` AND `isBeta`:
- Position Beta badge at `top-3 left-3`
- Move smartphone icon to appear inline after the badge or remove it (since Beta implies early stage anyway)

Actually, a cleaner approach: stack them vertically or show Beta badge in the same position, slightly offset. Given that all beta apps except Conclusiv are also mobile-only, I'll position the Beta badge at `top-3 left-3` and remove the smartphone icon for beta cards (the Beta status is more important information).

---

## Technical Details

**File to modify:** `src/components/LivePortfolio.tsx`

**Changes:**
1. Add `Badge` import from `@/components/ui/badge`
2. Add `isBeta?: boolean` to `Business` interface (line 41)
3. Add `isBeta: true` to WellWell, Conclusiv, Ritual, Swaami, Lockstep entries
4. In `BusinessCard` component, add beta badge rendering with appropriate styling
5. Adjust mobile-only icon logic to not show when beta badge is present (to avoid clutter)
