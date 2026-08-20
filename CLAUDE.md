# CLAUDE.md

Guidance for Claude Code and any other agent working in this repo.

## What this is

krishraja.com, the personal site of Krish Raja. It is a **portfolio site**. Its job is proof:
what he has built, what he is building, and what he publishes.

It is not a shop. There is exactly one thing he sells (Mindmake) and it is sold somewhere
else, on themindmaker.ai until mindmake.co resolves.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 with shadcn/ui primitives in `src/components/ui/`
- Single page, no routes other than `/` and a 404
- Two component trees: desktop (`src/components/`) and mobile (`src/components/mobile/`),
  swapped whole by `useIsMobileResolved()` in `src/pages/Index.tsx`

## The mobile experience is two facts, and both have to be handled

A phone gets a good page only if **the right tree renders** and **it renders at phone
scale**. These are separate, and getting one right does nothing for the other. Missing the
second is what made three rounds of mobile fixes look like nothing had shipped.

### 1. Which tree renders: input, not width

`useIsMobileResolved()` returns true below 768px, **and** for any device whose primary
pointer is coarse and cannot hover, up to 1024px.

Chrome for Android's "Request desktop site" lays the page out in a virtual viewport of
about 980 CSS pixels. The viewport meta tag is ignored by design, so nothing in the
document changes it, and under width-only detection every `sm:` and `md:` breakpoint fired
and a handset got the desktop tree. What survives that setting is the input model: the
only pointer is still a finger. A touchscreen laptop reports neither `pointer: coarse` nor
`hover: none`, because its primary pointer is a trackpad, so it keeps the desktop tree.

### 2. What scale it renders at: `useForcedDesktopZoom()`

Desktop-site mode does not stop at the layout. Chrome then **scales the whole 980px result
down to fit the physical screen**, about 0.42 on a 410px handset. So a perfectly correct
mobile layout still arrived at 42% size, with 6px body text.

The first attempt at this clamped the shell to 34rem, which fixed the wrong half: it
changed the column's width and left the scale alone, so the page became a 228px strip of a
410px screen with dead margins either side. Predicted and measured agreed to within a
pixel, which is how the diagnosis was confirmed.

The fix is `zoom` on the root element: lay out at 400px, paint at `innerWidth / 400`, and
Chrome's fit-to-width puts it back at 1:1. `zoom` and not a transform, because a transform
would make the fixed dock's containing block the page instead of the screen.

### The consequence: the mobile tree may not use breakpoints

`zoom` changes the used value of a length. It does **not** change the viewport a media
query measures, so `md:` still fires at 980 inside a 400px document. Any `sm:`/`md:`/`lg:`
class reachable from the mobile tree will therefore render its desktop variant in a
phone-width column.

The mobile tree itself has none. The three components shared with the desktop tree,
`SlideDeck`, `AttendeeStrip` and `SelectedWork`, take their layout from a **prop** rather
than a breakpoint, and `MobileIndex` passes it. `npm run mobile:check` fails if a
breakpoint class appears anywhere under `main#main`, the top bar or the dock.

**Test any layout change at 980px with touch emulation, not just at 390px.**

## Look at the phone. `npm test` cannot.

```bash
npm run build && (cd dist && python3 -m http.server 4173 --bind 127.0.0.1 &)
npm run mobile:check
```

`scripts/mobile-check.mjs` drives Chromium at Pixel 7, iPhone 13, iPhone SE and an Android
in forced-desktop mode, and asserts on what actually rendered: the mobile tree is the one
serving, **the document lays out between 320 and 460px whatever the viewport claims**,
nothing overflows sideways, no breakpoint class is reachable from the mobile tree, every
tap target clears 40px, no section outruns a 950px budget, the dock is one row of five
with no sideways scroll, every rail has something to swipe to, the contact sheet opens,
and no retired mobile-only string is on the page.

Measure in `offsetWidth`/`offsetHeight`, never `getBoundingClientRect()`. The rect returns
painted pixels, which the root zoom inflates by 2.45; the offsets are layout pixels, which
is the unit a thumb actually experiences. Two budget checks silently passed against the
wrong unit before this was noticed.

It also prints a `near` line for any section within 5% of the height budget. The portfolio
went from comfortable to 962px on an iPhone SE the moment a section intro grew by one
sentence, and the run before that gave no hint it was close. A guard that only speaks at
the moment of breach makes every breach a surprise. The SE is where this shows up first:
it lays out at **320px**, so the same section that measures 777px on a Pixel 7 measures
940px there, entirely in wrapping.

It exists because on 12 August 2026 the build was green, the unit suite was green, and the
phone was serving the desktop tree at 40% scale under a marquee animating four logos that
already fit on screen. None of that is expressible as an assertion about the content
layer. All of it is obvious to anything that opens the page at phone size and looks.

The rule that follows: **a change to either tree is not verified until something rendered
it at phone size.** Height measurements are not enough; the last three rounds of mobile
defects were all visual, and all in sections that measured fine.

## How to run

```bash
npm ci
npm run dev        # http://localhost:8080
npm run build      # runs `generate` first, then vite build
npm run lint
npm test           # vitest, includes the positioning consistency suite
npm run typecheck  # tsc -b. Plain `tsc --noEmit` checks NOTHING here, see below
npm run mobile:check   # drives a real browser at four phone sizes, needs a server on :4173
npm run links:check    # requests every external URL in the content layer
npm run generate   # regenerate index.html meta, llms.txt, sitemap.xml, webmanifest
npm run media      # transcode public/files/ masters into public/media/ (slow, run by hand)
```

## `npx tsc --noEmit` checks nothing. Use `npm run typecheck`.

`tsconfig.json` is a solution file: `"files": []` plus two project references. A bare
`tsc --noEmit` therefore typechecks zero files and exits 0 no matter what is broken, which
it did for a whole session while three components referenced a property that no longer
existed. `npm run typecheck` runs `tsc -b`, which builds the referenced projects and
actually reports. Vite does not typecheck either; esbuild strips types without reading them.

## Mindmake, and the one line that moves the domains

The brand is **Mindmake**. It was Mindmaker until 12 August 2026.

`mindmake.co` has no DNS record yet, so the copy renamed and the links did not. Both sets of
URLs live in `src/content/site.ts` behind one constant:

```ts
const DOMAINS_LIVE = false;   // flip when mindmake.co resolves, then `npm run generate`
```

Everything reads from `hosts`, so the switch is one line and `npm run links:check` proves the
side you are on actually resolves. It earns that on real runs: it caught
`mediaradar.com/signal-and-noise` returning 404. A test fails the build if half the URLs flip.

**The contact address is deliberately not part of that switch.** `krish@themindmaker.ai`
stays forever, by Krish's decision. It is in FACTS.md. Do not "fix" it to match the brand.

The site is one primary block and a secondary shelf, not five peers. Mindmake branches into
Advisory, CTRL and Content; Content has two formats, **The Money of AI** and **Building with
AI**. Signal & Noise, Fractionl Pulse and Full Time sit one tier down under "Also building".

The three branches share **one** mark, `mindmake-mark`, and differ only by `PortfolioBranch.mark`
(`square` / `soft` / `round`), which is a CSS bottom-corner radius rather than three files.
The mark's two bottom squares reach the edges of its own content box, so the radius clips
exactly those and leaves the transparent top corners alone. Round all four and it eats the
tall peak and the mark stops being the mark, which is the one thing not allowed to happen.
They were three lucide glyphs until 19 Aug 2026; three arms of one brand now look like it.

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

### One section, one set of words

There is no `Copy` type, no `pick()`, and no `eyebrow`. `SectionHeader` is `{ id, title,
sub }`, all plain strings, rendered by both trees.

`Copy` existed to record drift the extraction refactor inherited, which was the right
first move. Keeping the capability was not. A field that can hold a different string per
surface is a field that invites one, and by 12 August 2026 the mobile tree carried
headings Krish had never written: "The operating stack", "60-minute Maven sessions",
"Taken by more than 4,000 people". The eyebrows were worse, because no desktop copy
existed to fill that slot at all, so all eight were invented outright: "How I operate",
"The OS", "The thinking", "Portfolio", "Receipts", "Selected work", "Lightning Lessons",
"Contact".

None of it was a copy decision. It was a layout pattern, eyebrow above title, filled in
because the slot existed. **Deleting the slot is what stops that recurring. A rule in this
document would not have.** If a section seems to need a word above its title, it needs a
better title.

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
3. What Mindmake is: **a capped advisory practice**. Not a startup, not a lab, not a
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
- an appearance: add an entry to `appearances.ts` with its `appearanceId`, and a `crop`
- an attendee logo: put `<slug>.png` in `public/files/brand logos/`, add an entry to
  `lessons.attendees`

then `npm run media`. No component edits, ever.

Three things about uploading a master:

1. **Do not use the GitHub web UI for video.** A 31MB replacement of
   `os-content-final-lite.mp4` arrived on 12 August 2026 as a two-byte file containing a
   CRLF. Push it with git, or drag it into the repo locally. `ffprobe` the file after it
   lands: a master that will not probe cannot be transcoded.
2. **Name it for the entry, not for the day.** The masters are `os-<id>-final.mp4`, so a
   file called `new os content vid.mp4` gets renamed before its `source` goes into `os.ts`.
   Four masters, four entries, one naming rule.
3. **A recording with browser chrome does not need re-recording.** `MediaCrop` takes
   `{ top, bottom, left, right }` in source pixels and `npm run media` cuts it before
   scaling. The org clip is captured through Chrome, so it carries `crop: { top: 150 }`.
   Keep the numbers even; H.264 chroma subsampling needs even offsets.

   **The appearance captures take the same field, and every one of them needs it.** They
   are 1280x720 photographs of a browser, so the subject is a fraction of the frame and
   the rest is navigation, a scrollbar and YouTube's recommendation rail. Scaled whole
   into the 96px desktop thumbnail, a face that fills a third of the frame lands about
   twenty pixels across, which is why every card read as grey chrome. The crop is what
   changes the picture: `object-position` does nothing here, because the captures are
   already 16:9 and there is no overflow to move. All six YouTube watch pages share one
   player rectangle, `(16, 67, 874, 493)`, which is exactly 16:9.

   Aim each crop at a face, and say in a comment what it is aimed at. Six of the
   nineteen have no face to aim at; those go to the masthead, the headline or the
   illustration, and the comment says so.

   **Do not read coordinates off a contact sheet.** Four crops were set that way and all
   four landed on the wrong part of the page, because a tile in a composite is not the
   image. Draw the proposed rectangle on the full master and look at it.

   **A crop is not a file, so mtime cannot see it.** `public/media/recipes.json` records
   what each derivative was built from beyond its source, and `npm run media -- --check`
   fails with `crop edited in the content layer, never applied` when the two disagree.
   Without it, editing a crop leaves a stale derivative that looks entirely correct.
4. **Watch a frame before you believe the filename.** Also on 12 August 2026, a master
   named `new os content vid.mp4` was renamed to `os-content-final.mp4` on the strength of
   that name and transcoded. It was a recording of the Org screen, so the site shipped the
   same agent roster labelled both "Content" and "The org". Every check passed: ffprobe
   parsed it, the file shrank 20x, the page rendered, the suite was green. The only way to
   catch it was to look.

   ```bash
   ffmpeg -i "public/files/os screenshots/os-<id>-final.mp4" -ss 3 -frames:v 1 /tmp/f.png
   ```

   `npm run media` writes **`public/media/os/contact-sheet.jpg`**, one labelled frame per
   entry side by side. That is the whole answer: looking now costs one glance. It also
   writes a 16x16 average hash of every poster to `public/media/os/fingerprints.json`, and
   the test suite fails if two entries are within 32 bits of each other. Genuinely different captures of this app run 69 to 128 bits
   apart. Nothing in code can know whether a video is *about* content; it can know that
   two entries claiming to be different recordings are the same picture, which is the half
   that actually shipped broken.

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
  Mindmake Content. Both domains are dead.
- **"Operator-advisor" as the primary self-description.** Superseded by the spine
  sentence.
- **Any client name or dollar figure against the advisory work.** AdFixus, Meliora, the
  $254K POC, Hearst, Arena Group and The Weather Company are all off the site as of
  12 August 2026. The receipts section carries one anonymized `Executive advisory` entry
  instead. FACTS.md still records the detail; the site does not publish it, and the test
  suite fails if any of those strings returns.
- **A "Work with me" section, and a nav or hero CTA by that name.** Folded into Contact.
- **Portfolio tabs.** Advise, Build work and Write were three tabs of three cards. One
  flat grid now. Fractionl Circle came off with them, because it pointed at Pulse's URL
  and so read as one product listed twice. It went back on 19 August 2026 with an address
  of its own, `circle.fractionl.ai`, which is what that objection was actually about. The
  two still share the Fractionl mark, so the shelf orders them next to each other: split
  apart, one mark on two cards reads as a rendering fault rather than a brand family.
  **Each card links to its own product, not to `fractionl.ai`.** That is the parent site
  and mentions neither by name, so a reader who tapped Pulse used to land somewhere that
  did not have Pulse on it. `pulse.fractionl.ai` and `circle.fractionl.ai`, both verified.
- **A count chip on any "How I operate" card.** The Operating System card carried one and
  its three neighbours did not, so one of four read as a different component.
- **Section eyebrows, and any mobile-only heading.** See "One section, one set of words".
  The types no longer allow either.
- **A dock taller than one row, or wider than five slots.** It was nine chips scrolling
  sideways above a full-width button: two rows, 110px of permanent screen, five
  destinations off-screen at any moment, all of it restating headings the page already
  shows. `npm run mobile:check` fails if it grows back.
- **The trust-strip marquee on mobile.** An infinite scroll needs more content than the
  viewport. Four logos fit across a phone with room to spare, so the animation was
  duplicating them and sliding them past a reader who could already see all four.
  The attendee strip under the Lightning Lessons holds twenty-eight and does rotate,
  which is the same rule pointing the other way.
- **"Mindmaker", "Mindmaker Live", "Mindmaker OS", "Plinth".** Retired 12 Aug 2026 and on
  the banned list. The `themindmaker.ai` URLs are the one exception and stay until
  `DOMAINS_LIVE` flips, which is why the test checks prose rather than raw substrings.
- **"Paid" and "Built" as content format names.** They are **The Money of AI** and
  **Building with AI**.
- **Five equal portfolio cards.** Mindmaker, Fractionl Pulse, CTRL, Mindmaker Live and
  Signal & Noise all the same size said the five things carried equal weight, which is the
  opposite of consolidating. One primary block, three branches, a secondary shelf.
- **Any upgrade of the attendee-strip wording.** The line is
  `Attendees from household name businesses learn with me`. Most of those companies sent
  one person to a free Maven session. Not clients, not customers, not partners, not
  "trusted by". The test suite fails on all of those words. See FACTS.md.

## Further reading

- `project-documentation/POSITIONING.md`: the spine sentence, approved meta, retired names
- `project-documentation/FACTS.md`: every number with its source, and the unresolved conflicts
