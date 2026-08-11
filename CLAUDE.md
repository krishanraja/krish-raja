# CLAUDE.md

Guidance for Claude Code and any other agent working in this repo.

## What this is

krishraja.com, the personal site of Krish Raja. It is a **portfolio site**. Its job is proof:
what he has built, what he is building, and what he publishes.

It is not a shop. There is exactly one thing he sells (Mindmaker) and it is sold somewhere
else, on themindmaker.ai.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 with shadcn/ui primitives in `src/components/ui/`
- Single page, no routes other than `/` and a 404
- Two component trees: desktop (`src/components/`) and mobile (`src/components/mobile/`),
  swapped whole at 768px by `useIsMobileResolved()` in `src/pages/Index.tsx`

## How to run

```bash
npm ci
npm run dev        # http://localhost:8080
npm run build      # runs `generate` first, then vite build
npm run lint
npm test           # vitest, includes the positioning consistency suite
npm run generate   # regenerate index.html meta, llms.txt and sitemap.xml from src/content/
```

## THE RULE: all copy lives in `src/content/`

Every user-facing string is defined in `src/content/` exactly once, and referenced
everywhere else. Components contain layout, not words.

This includes `index.html` meta tags, both JSON-LD blocks, `public/llms.txt` and
`public/sitemap.xml`. Those four are **generated** by `scripts/generate-static.mts`,
which runs automatically before every build. Do not hand-edit them. Edit
`src/content/site.ts` and run `npm run generate`.

`npm test` fails if a generated file has drifted from the content layer, or if the
spine sentence or any headline number disagrees across surfaces.

Before adding a string to a component, ask which content module it belongs in.
`grep -rn "61M" src/components/` must always return nothing.

Two rules keep the layer honest:

1. **Every module is annotated with its type** from `src/content/types.ts`
   (`export const hero: HeroContent = {...}`). A missing field is a compile error, a stray
   field is a compile error.
2. **The modules are pure data.** No React, no lucide, no asset imports. The generator
   script and the test suite import them under plain Node, where a `.png` import throws.
   Icons and images are named by string key and resolved in `src/lib/icon-map.ts` and
   `src/lib/asset-map.ts`.

Where the desktop and mobile trees still disagree on wording, the `Copy` type carries the
variants (`{ desktop, mobile, sheet? }`) and components read through `pick()`. Plain
`string` is the goal. Use the variant form only to record drift that already exists.

## Hard rules for copy

1. **No em dashes. Anywhere. Including code and commit messages.** Use commas, periods
   or parentheses.
2. **Never invent a number, client name, date or outcome.** Every approved figure is in
   `project-documentation/FACTS.md`. If a figure is not there, it does not go on the site.
   Leave a `TODO(krish):` instead.
3. **Banned vocabulary in user-facing copy:** leverage, synergy, empower, unlock as
   metaphor, seamless, journey, landscape, ecosystem (unless naming a real market
   structure), game-changer, cutting-edge, best-in-class, solutions, drive value,
   impactful, robust, transformative, elevate, harness, delve, deep dive, unpack,
   spearhead as metaphor, navigate as metaphor, at the end of the day, in today's world,
   it's worth noting, mission-critical.
4. **Banned constructions:** "It is not just X, it is Y", "at the intersection of",
   "uniquely positioned to", "what sets X apart", "I am passionate about",
   rhetorical-question openers, any paragraph starting "Additionally".
5. **The test:** could a senior peer who knows Krish well have written this in ten
   minutes? If it reads like marketing, cut it.
6. **When in doubt, keep and flag.** Deleting good detail is the failure mode. Leave a
   `TODO(krish):` rather than removing something you are unsure about.

## The settled position

> Krish operates in content, audience and IP businesses, plus the data and identity layer
> underneath them. Media, entertainment, creator economy, publishing, adtech, telco data,
> search data.

The spine sentence, which also appears on his LinkedIn and must not drift:

> Sixteen years commercialising content, media and IP businesses. Now I build the AI
> systems that run them.

Three things must never differ across krishraja.com, LinkedIn and themindmaker.ai:

1. The cluster, word for word: `content, media and IP businesses`
2. Every number in `project-documentation/FACTS.md`
3. What Mindmaker is: **a capped advisory practice**. Not a startup, not a lab, not a
   consultancy.

Everything else varies by surface.

## Homepage section order

Both trees render the same order. Desktop lives in `src/pages/Index.tsx`, mobile in
`src/components/mobile/MobileIndex.tsx`.

1. Hero
2. How I operate (`Philosophy.tsx`)
3. The operating system, running (`OperatingSystem.tsx`)
4. The portfolio (`LivePortfolio.tsx`)
5. Sixteen years of receipts (`ProofPoints.tsx`)
6. Writing and speaking (`Work.tsx`)
7. Latest (`Latest.tsx`)
8. Lightning Lessons (`LightningLessons.tsx`)
9. Work with me (`WorkWithMe.tsx`)
10. Contact (`Contact.tsx`)

## Deliberately absent. Do not re-add.

These are not oversights. Each was removed on purpose and must not come back.

- **A venture count.** No "13 ventures", no "8 live products", no replacement count.
- **`aggregateRating`, review counts and star ratings** in structured data. A sister repo
  has a fabricated one. Do not replicate that pattern.
- **Prices.** Pricing lives on themindmaker.ai only, so there is one place to keep
  current. No price appears anywhere in this repo.
- **Links to `themindmaker.ai/cohort` or `themindmaker.ai/enterprise`.** Both routes are
  orphaned and serve retired prices. Link to the root only.
- **Any geographic market claim.** No "UK", "London-based", "New York", no market
  qualifier in the positioning, the meta or the structured data. The site is
  international. The journey section (London, Sydney, New York) is biography and is the
  one exception.
- **The Maven student count.** Sources say both 100+ and 4,000+. Publish neither.
- **A 30 Under 30 category.** Sources disagree on Strategy versus Marketing and Media.
- **The client name against the $254K POC.** Never named.
- **"AI Decision Cohort", "Signal Session", "Revenue Architecture".** Retired names. They
  must never reappear in this repo.
- **"Techonomic" and "The Builder Economy" as standalone channels.** Both folded into
  Mindmaker Live. Both domains are dead.
- **"Operator-advisor" as the primary self-description.** Superseded by the spine
  sentence.

## Further reading

- `project-documentation/POSITIONING.md`: the spine sentence, approved meta, retired names
- `project-documentation/FACTS.md`: every number with its source, and the unresolved conflicts
