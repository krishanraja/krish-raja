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
  swapped whole by `useIsMobileResolved()` in `src/pages/Index.tsx`

## The mobile tree is chosen by input, not only by width

`useIsMobileResolved()` returns true below 768px, **and** for any device whose primary
pointer is coarse and cannot hover, up to 1024px.

The second half is load-bearing. Chrome for Android's "Request desktop site" lays the page
out in a virtual viewport of about 980 CSS pixels and scales the result down to fit the
screen. The viewport meta tag is ignored by design, so nothing in the document changes it.
Under width-only detection every `sm:` and `md:` breakpoint fired and a handset got the
desktop tree at roughly 40% scale. What survives that setting is the input model: the only
pointer is still a finger. A touchscreen laptop reports neither `pointer: coarse` nor
`hover: none`, because its primary pointer is a trackpad, so it keeps the desktop tree.

When that happens `useIsForcedDesktopViewport()` also clamps the mobile shell, the top bar
and the dock to 34rem, so the phone layout stays a phone-width column instead of stretching
to 980px. On a real handset the clamp is wider than the screen and does nothing.

**Test any layout change at 980px with touch emulation, not just at 390px.**

## How to run

```bash
npm ci
npm run dev        # http://localhost:8080
npm run build      # runs `generate` first, then vite build
npm run lint
npm test           # vitest, includes the positioning consistency suite
npm run generate   # regenerate index.html meta, llms.txt, sitemap.xml, webmanifest
npm run media      # transcode public/files/ masters into public/media/ (slow, run by hand)
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
2. **US spelling throughout**, including the spine sentence. Decided 12 August 2026. The
   test suite fails on `commercialis`, `organis`, `defence`, `optimis` and `recognis`.
3. **Never invent a number, client name, date or outcome.** Every approved figure is in
   `project-documentation/FACTS.md`. If a figure is not there, it does not go on the site.
   Leave a `TODO(krish):` instead.
4. **Banned vocabulary in user-facing copy:** leverage, synergy, empower, unlock as
   metaphor, seamless, journey, landscape, ecosystem (unless naming a real market
   structure), game-changer, cutting-edge, best-in-class, solutions, drive value,
   impactful, robust, transformative, elevate, harness as a verb, delve, deep dive, unpack,
   spearhead as metaphor, navigate as metaphor, at the end of the day, in today's world,
   it's worth noting, mission-critical.
5. **Banned constructions:** "It is not just X, it is Y", "at the intersection of",
   "uniquely positioned to", "what sets X apart", "I am passionate about",
   rhetorical-question openers, any paragraph starting "Additionally".
6. **The test:** could a senior peer who knows Krish well have written this in ten
   minutes? If it reads like marketing, cut it.
7. **When in doubt, keep and flag.** Deleting good detail is the failure mode. Leave a
   `TODO(krish):` rather than removing something you are unsure about.

## The settled position

> Krish operates in content, audience and IP businesses, plus the data and identity layer
> underneath them. Media, entertainment, creator economy, publishing, adtech, telco data,
> search data.

The spine sentence, which also appears on his LinkedIn and must not drift:

> Sixteen years commercializing content, media and IP businesses. Now I build the AI
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
4. The thinking (`SlideDeck.tsx`, shared by both trees)
5. The portfolio (`LivePortfolio.tsx`)
6. Sixteen years of receipts (`ProofPoints.tsx`)
7. Selected work (`SelectedWork.tsx`)
8. Lightning Lessons (`LightningLessons.tsx`)
9. Contact (`Contact.tsx`)

"Work with me" was section 9 until 12 August 2026. It was a whole section explaining one
card whose button linked to themindmaker.ai, which is what Contact does in a single row,
so it folded in there. The nav CTA and the hero button both say "Get in touch" and both
land on `#contact`.

## Media: `public/files/` in, `public/media/` out

`public/files/` holds the masters Krish supplies: OS screen recordings, talk slides, the
content-index captures and its manifest. They are large (85MB of video, 74MB of slides)
and are never referenced by the site directly.

`npm run media` renders the shippable versions into `public/media/`, which is committed.
Video goes to 720p H.264 with a poster still, slides to two WebP widths, appearance
captures to 800px WebP. The whole of `public/media/` is about 5.6MB.

It is deliberately **not** part of `npm run build`. Run it by hand after adding a master.
`npm run media -- --check` fails if a referenced derivative is missing, and the test suite
calls the same check.

The work list comes from the content layer, so:

- a recording: drop it in `public/files/os screenshots/`, add an entry to `os.ts`
- a slide: add an entry to `deck.ts` naming a file in `public/files/slides/`
- an appearance: add an entry to `appearances.ts` with its `appearanceId`

then `npm run media`. No component edits, ever.

Two things about uploading a master:

1. **Do not use the GitHub web UI for video.** A 31MB replacement of
   `os-content-final-lite.mp4` arrived on 12 August 2026 as a two-byte file containing a
   CRLF. Push it with git, or drag it into the repo locally. `ffprobe` the file after it
   lands: a master that will not probe cannot be transcoded.
2. **Name it for the entry, not for the day.** The masters are `os-<id>-final.mp4`, so a
   file called `new os content vid.mp4` gets renamed to `os-content-final.mp4` before its
   `source` goes into `os.ts`. Four masters, four entries, one naming rule.

## The content index is authoritative

`public/files/content index/krish-raja-content-index.md` is a manifest of every verified
appearance: the capture, its `screenshot_status`, and the `source_urls` that back it.

Two of its records are marked do-not-publish (`krish-raja-linkedin` is an auth wall,
`techonomic-author-page` failed TLS). **Never publish a capture the manifest does not mark
`approved`.** The test suite enforces this, and also checks that every appearance link is
one of that record's own `source_urls`, so a link cannot drift from its evidence.

## Deliberately absent. Do not re-add.

These are not oversights. Each was removed on purpose and must not come back.

- **A venture count.** No "13 ventures", no "8 live products", no replacement count.
- **`aggregateRating`, review counts and star ratings** in structured data. A sister repo
  has a fabricated one. Do not replicate that pattern.
- **Prices.** Pricing lives on themindmaker.ai only, so there is one place to keep
  current. No price appears anywhere in this repo.
- **A "Free" chip on the Lightning Lessons cards.** Free is a price. `LessonsContent` has
  no `badge` field, on both trees, and adding one back reintroduces the only price on the
  site.
- **Links to `themindmaker.ai/cohort` or `themindmaker.ai/enterprise`.** Both routes are
  orphaned and serve retired prices. Link to the root only.
- **Any geographic market claim.** No "UK", "London-based", "New York", no market
  qualifier in the positioning, the meta or the structured data. The site is
  international. The journey section (London, Sydney, New York) is biography and is the
  one exception.
- **Any Maven student count other than 4,000+.** An earlier source said 100+. That figure
  must not return.
- **A 30 Under 30 category other than Strategy.** B&T verifies Strategy. Marketing and
  Media was the disputed reading and must not return.
- **The client name against the $254K POC.** Never named.
- **"AI Decision Cohort", "Signal Session", "Revenue Architecture".** Retired names. They
  must never reappear in this repo.
- **"Techonomic" and "The Builder Economy" as standalone channels.** Both folded into
  Mindmaker Live. Both domains are dead.
- **"Operator-advisor" as the primary self-description.** Superseded by the spine
  sentence.
- **Any client name or dollar figure against the advisory work.** AdFixus, Meliora, the
  $254K POC, Hearst, Arena Group and The Weather Company are all off the site as of
  12 August 2026. The receipts section carries one anonymized `Executive advisory` entry
  instead. FACTS.md still records the detail; the site does not publish it, and the test
  suite fails if any of those strings returns.
- **A "Work with me" section, and a nav or hero CTA by that name.** Folded into Contact.
- **Portfolio tabs.** Advise, Build work and Write were three tabs of three cards. One
  flat grid now. Fractionl Circle came off with them: same brand, same logo and the same
  URL as Fractionl Pulse.
- **A count chip on any "How I operate" card.** The Operating System card carried one and
  its three neighbours did not, so one of four read as a different component.

## Further reading

- `project-documentation/POSITIONING.md`: the spine sentence, approved meta, retired names
- `project-documentation/FACTS.md`: every number with its source, and the unresolved conflicts
