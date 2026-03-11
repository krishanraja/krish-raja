

# Site Repositioning: Commercial Leader, Not Hobbyist

## Changes

### 1. Hero Rewrite (`src/components/Hero.tsx`)
- **Headline**: `From zero to multi-million ARR.` (line 1) + `I scale AI-native businesses.` (line 2, "scale AI-native businesses" in primary color)
- **Subline**: "16 years building revenue engines across 3 continents. From Microsoft to founding AI ventures generating real commercial outcomes."
- **CTA**: Change "Explore My Portfolio" → "See My Track Record" linking to `#proof-points`

### 2. Section Reorder (`src/pages/Index.tsx`)
Current: Hero → Portfolio → Philosophy → Learn → Work → ProofPoints
New: **Hero → ProofPoints → Portfolio → Work → Philosophy → Learn**

Update SEO title to "Krish Raja - AI Revenue Leader | 16 Years Scaling Businesses" and structured data: jobTitle → "AI Revenue Leader & Enterprise Strategist", description updated accordingly. Change `"awards": "30 Under 30 (Marketing & Media)"` → `"awards": "30 Under 30"` (remove Forbes reference).

### 3. Curate Builder Tab (`src/components/LivePortfolio.tsx`)
- Remove Rinoa, Ritual, Swaami from `builderBusinesses` array (keep Conclusiv, WellWell, Lockstep)
- Remove unused imports: `rinoaIcon`, `ritualIcon`, `swaamiIcon`
- Update subtitle: "13 ventures" → "10 ventures"

### 4. Navigation Reorder (`src/components/Navigation.tsx`)
New `navItems` order:
1. `{ label: 'Track Record', href: '#proof-points' }`
2. `{ label: 'Portfolio', href: '#portfolio' }`
3. `{ label: 'Writing', href: '#writing' }`
4. `{ label: 'Philosophy', href: '#philosophy' }`
5. `{ label: 'Learn', href: '#learn' }`
6. `{ label: 'Contact', href: '#contact' }`

### 5. Remove Forbes references
- `src/components/ProofPoints.tsx` line 64: Change `"Former 30-Under-30"` → `"Former 30 Under 30"`  (already no Forbes mention here, just standardize)
- `src/pages/Index.tsx` line 44: Already just says "30 Under 30" — no Forbes reference found anywhere. No changes needed.

### Files Changed
- `src/components/Hero.tsx`
- `src/pages/Index.tsx`
- `src/components/LivePortfolio.tsx`
- `src/components/Navigation.tsx`

