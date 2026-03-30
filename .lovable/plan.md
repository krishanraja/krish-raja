

# Philosophy Section: Toggle Between "What I Build" and "How I Build"

## Concept
The Philosophy section gets a toggle at the top — two views sharing the same space. **"What I Build"** shows categorized evidence of AI systems you've actually shipped. **"How I Build"** shows the existing four principle cards. Default view: "What I Build" (proof first, philosophy second).

## "What I Build" — 5 Category Cards

Each card: icon, category name, count, one-line description.

1. **Products & Platforms** (icon: `Smartphone`) — "4 shipped"
   "Full-stack apps from mobile-first exec tools to market intelligence dashboards"

2. **Autonomous Systems** (icon: `Bot`) — "7 running"
   "Cron-driven agents handling ops, email triage, content synthesis, and job sourcing — 24/7"

3. **Outbound Engines** (icon: `Target`) — "80+ campaigns"
   "AI-powered cold email, LinkedIn DMs, and named-account sequences across multiple ventures"

4. **Content Systems** (icon: `FileText`) — "5 pipelines"
   "Automated newsletter production, slide generation, media pitches, and editorial calendars"

5. **Operational Tools** (icon: `Wrench`) — "5 systems"
   "Domain intelligence, lead enrichment, decision-maker mapping, and automated job applications"

## Toggle Mechanism
- Use the existing `Tabs` component from shadcn with a centered `TabsList` containing "What I Build" / "How I Build" pills
- Place it between the section subtitle and the cards
- Both views use the same `MobileCarousel` layout on mobile, grid on desktop
- "What I Build" cards are slightly simpler (no bullet points — just icon, title, count badge, description)

## Section Header Update
- Title stays: "How I Think About Building"
- Subtitle changes to: "16 years of scaling revenue across 3 continents — here's what that looks like in practice"

## Technical Changes

**File:** `src/components/Philosophy.tsx`
1. Add imports: `Tabs, TabsContent, TabsList, TabsTrigger` from shadcn, plus `FileText, Wrench, Smartphone` from lucide-react
2. Add `builds` array (5 category objects with title, icon, count, description)
3. Wrap existing principles grid and new builds grid in `Tabs` with two `TabsContent` panels
4. Default tab: "what" (What I Build)
5. Both tabs reuse the same mobile carousel / desktop grid layout pattern already in place
6. Update subtitle text

Single file change: `src/components/Philosophy.tsx`

