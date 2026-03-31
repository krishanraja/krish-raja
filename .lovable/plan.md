

## Remove "Forbes" From All References

### Problem
"Forbes" appears across meta tags, structured data, documentation, and component data. User wants it removed everywhere.

### Changes

**1. `index.html`** — 8 edits
- Title tags (title, og:title, twitter:title): `"Forbes 30 Under 30"` → `"30 Under 30"`
- Description tags (meta, og:description, twitter:description): `"Forbes 30 Under 30"` → `"30 Under 30"`
- Keywords meta: `"Forbes 30 Under 30"` → `"30 Under 30"`
- JSON-LD Person `description`: remove "Forbes" prefix
- JSON-LD Person `award`: `"Forbes 30 Under 30 (Marketing & Media)"` → `"30 Under 30 (Marketing & Media)"`

**2. `src/components/ProofPoints.tsx`** — 1 edit
- Credentials array: `"Former 30 Under 30"` stays as-is (already has no "Forbes")
- ✅ No changes needed here

**3. `public/llms.txt`** — 2 edits
- Recognition line: `"Forbes 30 Under 30"` → `"30 Under 30"`
- Keywords line: `"Forbes 30 Under 30"` → `"30 Under 30"`

**4. `DOCUMENTATION.md`** — 1 edit
- Title reference: `"Forbes 30 Under 30"` → `"30 Under 30"`
- Description reference: `"Forbes 30 Under 30"` → `"30 Under 30"`

### Also updates the OG image plan
The previously approved OG image refresh plan referenced "Forbes 30 Under 30" — will use just "30 Under 30" instead.

