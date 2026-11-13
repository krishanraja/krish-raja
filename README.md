# krishraja.com

The personal site of Krish Raja. A portfolio site: what he has built, what he is building,
and what he publishes.

There is exactly one thing sold here, Mindmake, and it is sold on
[mindmake.co](https://mindmake.co) rather than on this site. No prices appear in
this repo.

## Stack

Vite 5, React 18, TypeScript, Tailwind CSS 3, shadcn/ui. Single page. Deployed as a static
build.

Desktop and mobile render as two separate component trees, swapped whole by
`useIsMobileResolved()` in `src/pages/Index.tsx`. Both trees read the same copy.

The swap is on input, not only on width: below 768px, or any device whose primary pointer
is coarse and cannot hover, up to 1024px. That keeps a handset on the mobile tree when the
browser is in "Request desktop site" mode and reporting a 980px viewport.

Rendering the mobile tree is only half of it. Chrome then scales that 980px layout down to
fit the screen, so `useForcedDesktopZoom()` applies a compensating `zoom` to the root: the
document lays out at 400px and paints at 980, and the two cancel. The consequence is that
**the mobile tree must not use Tailwind breakpoints**, because zoom does not move a media
query. Shared components take their layout from a prop. See CLAUDE.md.

## Running it

```bash
npm ci
npm run dev        # http://localhost:8080
```

```bash
npm run build      # regenerates static artifacts, then builds to dist/
npm run preview    # serve the production build
npm run lint
npm test           # includes the positioning consistency suite
npm run typecheck  # tsc -b. Plain `tsc --noEmit` checks nothing here
npm run mobile:check   # drives a real browser at four phone sizes, needs a server on :4173
npm run links:check    # requests every external URL in the content layer
npm run generate   # regenerate meta, JSON-LD, llms.txt, sitemap.xml, webmanifest
npm run media      # rebuild public/media/ from the masters in public/files/ (slow)
npm run brand      # favicons, app icons and the share card, from the bitmoji
```

## Where copy lives

**All of it is in `src/content/`.** Components hold layout, not words.

| Module | What it holds |
|---|---|
| `site.ts` | Name, spine, title and description, share image, profiles, structured data inputs |
| `home.ts` | The homepage sections: the three ways in, the live channel, the loader |
| `hero.ts` | H1, CTAs, trust logos |
| `operate.ts` | The bold line and fit copy under the hero, and the brain's four pillars |
| `deck.ts` | The slide deck: which slides, and which talk each came from |
| `appearances.ts` | In public, newest first, tied to the content-index manifest |
| `lessons.ts` | The live sessions and the attendee strip |
| `receipts.ts` | Stat cards, the anonymised advisory entry, credentials, journey, roles |
| `portfolio.ts` | Mindmake, its three branches and the other builds. Not rendered; feeds `llms.txt` |
| `contact.ts` | The four ways in |
| `links.ts` | The short section addresses (`/thinking` and the rest) |
| `nav.ts` | Navigation, dock and footer labels |

Every module is annotated with its type from `src/content/types.ts`, so a missing field is
a compile error rather than a blank card, and a stray field is a compile error rather than
dead data.

The modules are pure data. No React, no lucide, no asset imports, because
`scripts/generate-static.mts` and the test suite import them under plain Node, where a
`.png` import would throw. Icons and images are named by string key and resolved through
`src/lib/icon-map.ts` and `src/lib/asset-map.ts`.

## Changing the positioning in one place

Edit `src/content/site.ts` and run `npm run generate`.

That one file feeds the `<title>`, every meta and share tag, the structured data, the
crawler copy of the page inside `#root`, `public/llms.txt`, `public/sitemap.xml` and
`public/site.webmanifest`. All of them are **generated** by
`scripts/generate-static.mts`, which runs automatically before every build. Do not
hand-edit them; your changes will be overwritten.

The favicon, app icons and the 1200x630 share card (`public/og-image.png`) are rendered
from the bitmoji by `npm run brand`. After changing the card, bump the `?v=` on
`site.ogImage` so LinkedIn and WhatsApp fetch the new one.

`npm test` fails the build if a generated file has drifted from the content layer, or if
the spine sentence or any headline number disagrees between the page, the meta, the
structured data and `llms.txt`.

## Adding content without touching a component

Masters go in `public/files/`. The site never references them directly: `npm run media`
renders shippable versions into `public/media/`, which is committed. That step is not part
of `npm run build`, because it takes minutes and the inputs change rarely.

**A slide:** add an entry to `src/content/deck.ts` naming a file in `public/files/slides/`,
run `npm run media`. Two WebP widths are produced: one for the card, one for the
full-screen reader.

**An appearance:** add an entry to `src/content/appearances.ts` with the `appearanceId`
from the content index, run `npm run media`. The build fails if that record is not marked
`approved` in the manifest, or if the link you gave is not one of its own `source_urls`.

**An attendee logo:** put `<slug>.png` in `public/files/brand logos/`, add it to
`lessons.attendees`, run `npm run media`.

**A receipt, a lesson, a section heading:** the matching module in `src/content/`.

Everything above is content-only. No component edits, ever.

## Rules

Copy rules, the settled position and the list of things deliberately absent from this site
are in [`CLAUDE.md`](./CLAUDE.md). The two that catch people out:

1. **No em dashes anywhere**, including code and commit messages.
2. **Never invent a number.** Every approved figure is in
   [`project-documentation/FACTS.md`](./project-documentation/FACTS.md). If it is not
   there, it does not go on the site.

Positioning detail is in
[`project-documentation/POSITIONING.md`](./project-documentation/POSITIONING.md), including
the names that are retired and must never return.
