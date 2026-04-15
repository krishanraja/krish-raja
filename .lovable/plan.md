

## Strengthen Bio Site with Profile Data

### What changes

Integrate the strongest proof points from the master profile CSV into existing site sections. No new sections needed - sharpen what's already there.

### Changes by file

**1. `src/components/ProofPoints.tsx` - Sharpen achievement cards with real numbers**

Replace vague metrics with specific figures (without naming companies per current site convention):

| Current | Updated |
|---------|---------|
| "7x Growth" / "Major Media Broadcaster" | "$9M to $61M" / "Broadcaster Digital Transformation" |
| "Zero-to-Millions" / "AdTech APAC Launch" | "$0 to $12M ARR" / "Built Region from Zero" |
| "18-Person Team" | "18-Person Team" (keep) |
| "M&A Guidance" | "$55M P&L" / "Data & Automation" |

Update descriptions to be more specific using CSV data (e.g. "70+ commercial products launched", "EBITDA 22%", "triple-digit growth 2 of 3 years").

**2. `src/components/Hero.tsx` - Add the differentiator line**

Replace or augment the subtitle with the ambidextrous positioning:

Current: "16 years building revenue engines across 3 continents. From Microsoft to founding AI ventures generating real commercial outcomes."

Proposed: "16 years building revenue engines across 3 continents. The rare executive who can write production code and close a $4M enterprise deal."

This is the single most distinctive thing in the profile and it's absent from the site.

**3. `src/components/Philosophy.tsx` - Update "What I Build" with Mindmaker OS data**

Update the "Autonomous Systems" card:
- Count: "7 running" → "7+ agents, 37+ workflows"  
- Description: Reference the multi-agent operating system replacing a 15-30 person team

**4. `src/components/LearnWithMe.tsx` - Add content platforms**

Add links/references to:
- Signal & Noise podcast (MediaRadar)
- Builder Economy podcast
- Mindmaker Live
- UTS guest lecturer

These are public, linkable proof points that strengthen the teaching/content angle.

**5. `public/llms.txt` + `index.html` meta - Update with stronger numbers**

Sync the specific revenue figures and differentiator into SEO metadata and AI-readable content.

### What stays the same
- No company names added to proof points (existing convention)
- Overall site structure and section order unchanged
- Design and styling unchanged

### Technical detail
- All edits are copy/data changes in existing components
- No new dependencies or components needed
- 5 files modified

