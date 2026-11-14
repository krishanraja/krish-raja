# CLAUDE.md

<!-- north-star:start -->
## North Star: read it first, every session

This repository's North Star is [`docs/NORTH_STAR.md`](docs/NORTH_STAR.md): an ambition Krish set that is not reached yet.

- Read it before any work, every session.
- Before you start, say which part of it the task moves. If it moves nothing, say so first and let Krish decide.
- Prefer the work that moves it furthest, and close by noting what moved.
- Check the North Star number and its urgency (U1 to U5) on the first line under "Where it is right now" in `NOW.md`, and push at the intensity [the harness contract](https://github.com/krishanraja/ai-harness/blob/main/contract/north-star-metric.md) sets for that level. Update it whenever you can measure it; a number nobody measures is U4.
- Only Krish changes it.
<!-- north-star:end -->

Guidance for Claude Code and any other agent working in this repo.

## What this is

krishraja.com, the personal site of Krish Raja. It is a **portfolio site**. Its job is proof:
what he has built, what he is building, and what he publishes.

It is not a shop. There is exactly one thing he sells (Mindmake) and it is sold somewhere
else, on mindmake.co.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 with shadcn/ui primitives in `src/components/ui/`
- One page. The other routes are the short section addresses (`/thinking` and the rest,
  below), which open the same page, and a 404
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

### The consequence: the mobile tree may not use breakpoints, or viewport units

`zoom` changes the used value of a length. It does **not** change the viewport a media
query measures, so `md:` still fires at 980 inside a 400px document. Any `sm:`/`md:`/`lg:`
class reachable from the mobile tree will therefore render its desktop variant in a
phone-width column.

The mobile tree itself has none. Everything shared with the desktop tree (the homepage
sections in `src/components/home/`, `SlideDeck` and `AttendeeStrip`) takes its layout from
a **prop** rather than a breakpoint, and `MobileIndex` passes it. `npm run mobile:check` fails if a
breakpoint class appears anywhere under `main#main`, the top bar or the dock.

**`svh`, `dvh` and `vh` fail for the same reason, and they fail silently.** A viewport
unit resolves against the viewport, which zoom does not divide, so it comes back in
viewport pixels and is then multiplied by the zoom like any other length. Measured on
20 August 2026 in desktop-site mode: an element asking for `100svh` laid out at **1750**
inside a document **714** layout pixels tall, and painted at 4288. That is not a rounding
error, it is a six-screen element, and unlike a breakpoint it produces no visual clue on
the 390px profiles where it behaves perfectly.

`useMobileViewportHeight()` is the corrected unit. It is `innerHeight` divided by the same
zoom the width already uses, resampled on width changes only, so a URL bar sliding away
mid-scroll does not reflow the page under a moving thumb. The mobile hero sizes its one
screen from it. **Anything else that wants "one screen" wants that hook, not a CSS unit.**

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
tap target clears 40px, no section outruns a 950px budget, the hero's trust logos are
seated at the foot of the first screen rather than floating above dead background, the
dock is one row of five with no sideways scroll, every rail has something to swipe to,
the contact sheet opens, and no retired mobile-only string is on the page.

Measure **sizes** in `offsetWidth`/`offsetHeight`, never `getBoundingClientRect()`. The
rect returns painted pixels, which the root zoom inflates by 2.45; the offsets are layout
pixels, which is the unit a thumb actually experiences. Two budget checks silently passed
against the wrong unit before this was noticed.

**Positions** are the exception, and the seating check is the one that needs them: the
dock is `fixed`, so it shares no offset parent with anything in the hero and `offsetTop`
cannot measure the distance between them. Take both rects and divide by the zoom, which
lands back in layout pixels. Dividing is not optional.

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
npm run brand      # favicons, app icons and the 1200x630 share card, from the bitmoji (run by hand)
```

## `npx tsc --noEmit` checks nothing. Use `npm run typecheck`.

`tsconfig.json` is a solution file: `"files": []` plus two project references. A bare
`tsc --noEmit` therefore typechecks zero files and exits 0 no matter what is broken, which
it did for a whole session while three components referenced a property that no longer
existed. `npm run typecheck` runs `tsc -b`, which builds the referenced projects and
actually reports. Vite does not typecheck either; esbuild strips types without reading them.

## Mindmake, and the one line that moves the domains

The brand is **Mindmake**. It was Mindmaker until 12 August 2026.

The copy renamed on 12 August and the links waited for `mindmake.co` to resolve. Both sets
of URLs live in `src/content/site.ts` behind one constant, flipped on 11 November 2026:

```ts
const DOMAINS_LIVE = true;   // flipped 11 Nov 2026; content now points at makeyourmindup.ai
```

Everything reads from `hosts`, so the switch is one line and `npm run links:check` proves the
side you are on actually resolves. It earns that on real runs: it caught
`mediaradar.com/signal-and-noise` returning 404. A test fails the build if half the URLs flip.

**The contact address is deliberately not part of that switch.** The published address is
`krish@mindmake.co` (Krish, 2026-10-03), which replaced `krish@themindmaker.ai`; the old
one still redirects to it so older links keep working. It moved on its own decision, not via
`DOMAINS_LIVE` (that governs website URLs, not the mailbox). It is in FACTS.md and a test pins it.

Mindmake branches into Advisory, CTRL and Content; Content has two formats, **The Money of
AI** and **Building with AI**. Signal & Noise, Fractionl Pulse and Full Time are one tier
down. The portfolio shelf that showed all of this came off the homepage on 9 November 2026;
`portfolio.ts` stays because `llms.txt` and the hero's Mindmake card read from it.

## THE RULE: all copy lives in `src/content/`

Every user-facing string is defined in `src/content/` exactly once, and referenced
everywhere else. Components contain layout, not words.

This includes the `index.html` meta tags, the JSON-LD graph, `public/llms.txt`,
`public/sitemap.xml` and `public/site.webmanifest`. Those are **generated** by
`scripts/generate-static.mts`,
which runs automatically before every build. Do not hand-edit them. Edit
`src/content/site.ts` and run `npm run generate`.

`index.html` also carries a **crawler copy** of the page inside `#root`, between
`content:prerender` markers: who he is, the record, every appearance with its link, how to
book. Most AI crawlers read HTML without running JavaScript, so without it they saw an
empty page. React replaces it on mount and it is visually hidden until then. It is
generated with everything else; never hand-edit it.

The favicon, app icons and `public/og-image.png` come from `npm run brand`, which renders
them from `src/assets/krish_bitmoji.jpg`. After re-rendering the card, bump the `?v=` on
`site.ogImage`, or LinkedIn and WhatsApp keep showing the old one.

`npm test` fails if a generated file has drifted from the content layer, or if the
spine or any headline number disagrees across surfaces.

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
2. **British spelling throughout**, including the spine (Ruling, Krish, 2026-11-07:
   British everywhere, which supersedes the US decision of 12 August 2026). The test
   suite fails on `commercializ`, `organiz`, `optimiz`, `recogniz`, `monetiz`, `behavior`
   and the rest of krish-voice's US list. Quoted historical strings (the retired spines)
   stay verbatim.
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

The spine, revised 29 August 2026 to the live LinkedIn headline, byte for byte, title
case and no trailing period. LinkedIn is the source of truth and this follows it:

> AI-Native Commercial Strategy Leader

It replaced two earlier spines on the same day, and neither returns as the primary
headline: `Sixteen years commercializing content, media and IP businesses. Now I build the
AI systems that run them.` and `The AI-native commercial strategy operator.` See
`project-documentation/POSITIONING.md`.

Three things must never differ across krishraja.com, LinkedIn and mindmake.co:

1. The cluster, word for word: `content, media and IP businesses`
2. Every number in `project-documentation/FACTS.md`
3. What Mindmake is: **a capped advisory practice**. Not a startup, not a lab, not a
   consultancy.

Everything else varies by surface.

## Homepage section order

Both trees render the same order. Desktop lives in `src/pages/Index.tsx`, mobile in
`src/components/mobile/MobileIndex.tsx`.

Rebuilt 9 Nov 2026 from the mock Krish approved round by round. The new sections live in
`src/components/home/` (`sections.tsx`, `shared.tsx`, `BrainBloom.tsx`, `home.css`) and
are shared by both trees through a `mobile` prop; their copy is in `src/content/home.ts`.

1. Hero, with the brain (`BrainBloom`) beside it on desktop and on its own screen below it on mobile (`#how-i-operate`)
2. Your AI Chief of Staff: the three ways in (`#build`)
3. The thinking (`SlideDeck.tsx`, shared by both trees)
4. Make Your Mind Up, the live channel (`#live`, fed by `api/live.js`)
5. In public (`#selected-work`, one designed thumbnail per appearance)
6. See me in action: the sessions and the attendee logos (`#lightning-lessons`)
7. Sixteen years of receipts (`ProofPoints.tsx` / `MobileReceipts.tsx`)
8. Contact (`Contact.tsx` / `MobileContact.tsx`)

The operating system recordings and the portfolio shelf came off on 9 Nov 2026 (Krish).

**The homepage's own system, in `home.css`. Break one and Krish will see it before any test does:**
one typeface (Onest); one button anatomy (label then a round badge, fixed height, never
wraps); a small set of choices always shows every option; anything that swaps content
reserves the space of its longest option, so clicking never moves the page; hovers
change transform, opacity, colour or shadow only. Nothing under `.home--m` may sit in a
media query.

"Work with me" was section 9 until 12 August 2026. It was a whole section explaining one
card whose button linked to themindmaker.ai, which is what Contact does in a single row,
so it folded in there. Since 9 Nov 2026 "Get in touch" opens the enquiry form, which
writes an email to the published address in the reader's own mail app.

## Enquiries are counted: `src/lib/enquiry.ts`

The enquiry form, every email link and every Calendly link add one row to
`public.site_enquiries` in the fleet Supabase (Mindmaker OS), insert only, from the
production hosts only. One delegated click listener covers both trees, so a new
email or booking button is counted without wiring. Krish marks a row `booked`;
that count is the North Star number. The contract is in `docs/enquiry-trace.md`.

## Short section addresses: `krishraja.com/thinking`

Every section has a short address, defined once in `src/content/links.ts`:
`/operate`, `/build`, `/thinking`, `/live`, `/work`, `/lessons`, `/receipts`,
`/contact`. Each opens the homepage and lands on that section. The old `#the-thinking`
anchors work as well.

Three parts, and each one matters:

1. **A real file per address.** The `section-addresses` plugin in `vite.config.ts`
   writes `dist/<path>/index.html` after every build. Vercel has no SPA rewrite here,
   so without the file `/thinking` is a 404. Each file swaps in that section's own
   `title` and `sub` as the link preview, because LinkedIn and Slack never run
   JavaScript and never see a `#`. The canonical stays the homepage.
2. **The route.** `/:section` in `src/App.tsx` renders the homepage for a known path,
   and the 404 for anything else.
3. **The landing.** `useLandOnSection()` scrolls to the section once a tree is chosen.
   On a single-page app the browser's own hash jump fires before React renders the
   target, so plain `#` links did nothing on first load before this. It re-aligns for
   two seconds while images load, and stops as soon as the reader touches the page.

To add one, add an entry to `links.ts`. `npm test` fails if a section has no address or
two, and `npm run mobile:check` checks that `/thinking` lands on both trees.

They are paths, not subdomains. A subdomain is a separate host per section, with its own
DNS record and Vercel domain, and it would land on the same anchor anyway.

## Media: `public/files/` in, `public/media/` out

`public/files/` holds the masters Krish supplies: talk slides, attendee logos, the
content-index captures and its manifest. They are large (about 75MB of slides) and are
never referenced by the site directly. All 177 slide masters stay as a library, though the
deck shows 30 (Krish, 2026-11-13).

`npm run media` renders the shippable versions into `public/media/`, which is committed:
slides to two WebP widths, attendee logos into a common box, appearance captures to 800px
WebP. The whole of `public/media/` is about 4MB.

It is deliberately **not** part of `npm run build`. Run it by hand after adding a master.
`npm run media -- --check` fails if a referenced derivative is missing, and the test suite
calls the same check.

The work list comes from the content layer, so:

- a slide: add an entry to `deck.ts` naming a file in `public/files/slides/`
- an appearance: add an entry to `appearances.ts` with its `appearanceId`, and a `crop`
- an attendee logo: put `<slug>.png` in `public/files/brand logos/`, add an entry to
  `lessons.attendees`

then `npm run media`. No component edits, ever.

The next live session has its own slot, `lessons.upcoming` in `src/content/lessons.ts`:
paste its Maven `link`, `title` and `description` and it heads the session list on both
trees, with its date in place of the number, and goes into the crawler copy, `llms.txt`
and the JSON-LD as an `EducationEvent`. Until both a link and a title are filled it renders
nothing, and the page hides it once its start time passes. Clear it after the session.

The designed In public thumbnails (`public/media/thumbs/`, the `thumb` field) are rendered
separately from `public/files/thumbs/render.html` by `scripts/render-thumbs.cjs`; its header
says how.

The operating system recordings (`os.ts`, `public/files/os screenshots/`, the video step
of the media script and its poster fingerprints) were deleted on 13 November 2026, four
days after the section came off the homepage. Git history has them.

Four things about masters, each learned the hard way:

1. **Do not upload large binaries through the GitHub web UI.** A 31MB video arrived on
   12 August 2026 as a two-byte file containing a CRLF. Push with git.
2. **Name it for the entry, not for the day.** A file called `new os content vid.mp4` was
   renamed on the strength of its name and turned out to be a different recording. Look
   at what a master actually shows before its name goes into the content layer.
3. **A capture with browser chrome does not need recapturing.** `MediaCrop` takes
   `{ top, bottom, left, right }` in source pixels and `npm run media` cuts it before
   scaling.

   **The appearance captures need it, every one.** They are 1280x720 photographs of a
   browser, so the subject is a fraction of the frame and the rest is navigation, a
   scrollbar and YouTube's recommendation rail. Scaled whole into a thumbnail, a face that
   fills a third of the frame lands about twenty pixels across. `object-position` does
   nothing here, because the captures are already 16:9. All six YouTube watch pages share
   one player rectangle, `(16, 67, 874, 493)`, which is exactly 16:9.

   Aim each crop at a face, and say in a comment what it is aimed at. Where there is no
   face, aim at the masthead, the headline or the illustration, and the comment says so.

   **Do not read coordinates off a contact sheet.** Four crops were set that way and all
   four landed on the wrong part of the page, because a tile in a composite is not the
   image. Draw the proposed rectangle on the full master and look at it.
4. **A crop is not a file, so mtime cannot see it.** `public/media/recipes.json` records
   what each derivative was built from beyond its source, and `npm run media -- --check`
   fails with `crop edited in the content layer, never applied` when the two disagree.

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
- **Prices.** Pricing lives on mindmake.co only, so there is one place to keep
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
- **"Operator-advisor" as the primary self-description.** Superseded by the spine.
- **The two retired spines as a primary headline.** `Sixteen years commercializing
  content, media and IP businesses. Now I build the AI systems that run them.` and
  `The AI-native commercial strategy operator.`, both retired 29 August 2026.
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
- **A live-status line in the hero.** "14 agents · 45 workflows" sat beside the mobile
  headshot with a pinging dot and had no desktop counterpart, which made it the last
  mobile-only string on the site. It came off on 20 August 2026 and `HeroContent.status`
  went with it, because a slot only one tree can fill is how the invented mobile headings
  arrived in the first place. The counts are not lost: they are in the `llms.txt` prose.
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
  the banned list. The test checks prose rather than raw substrings, so an old
  `themindmaker.ai` URL in a comment or a historical note does not trip it.
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

- `project-documentation/POSITIONING.md`: the spine, approved meta, retired names and spines
- `project-documentation/FACTS.md`: every number with its source, and the unresolved conflicts
