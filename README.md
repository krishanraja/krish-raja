# krishraja.com

The personal site of Krish Raja. A portfolio site: what he has built, what he is building,
and what he publishes.

There is exactly one thing sold here, Mindmaker, and it is sold on
[themindmaker.ai](https://themindmaker.ai) rather than on this site. No prices appear in
this repo.

## Stack

Vite 5, React 18, TypeScript, Tailwind CSS 3, shadcn/ui. Single page. Deployed as a static
build.

Desktop and mobile render as two separate component trees, swapped whole by
`useIsMobileResolved()` in `src/pages/Index.tsx`. Both trees read the same copy.

The swap is on input, not only on width: below 768px, or any device whose primary pointer
is coarse and cannot hover, up to 1024px. The second clause is what keeps a handset on the
mobile tree when the browser is in "Request desktop site" mode and reporting a 980px
viewport. See CLAUDE.md for why.

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
npm run generate   # regenerate meta, JSON-LD, llms.txt, sitemap.xml, webmanifest
npm run media      # rebuild public/media/ from the masters in public/files/ (slow)
```

## Where copy lives

**All of it is in `src/content/`.** Components hold layout, not words.

| Module | What it holds |
|---|---|
| `site.ts` | Name, spine sentence, meta, canonical URL, email, socials |
| `hero.ts` | H1, sub, CTAs, trust logos |
| `operate.ts` | "How I operate": sub and the four cards |
| `os.ts` | The four Mindmaker OS recordings |
| `deck.ts` | The slide deck: which slides, and which talk each came from |
| `appearances.ts` | Selected work, tied to the content-index manifest |
| `portfolio.ts` | Every portfolio item, one flat list |
| `receipts.ts` | Stat cards, the anonymized advisory entry, credentials, journey |
| `lessons.ts` | Maven lightning lessons |
| `contact.ts` | The four ways in, including the Mindmaker link the old offer card held |
| `nav.ts` | Navigation and footer labels |

Every module is annotated with its type from `src/content/types.ts`, so a missing field is
a compile error rather than a blank card, and a stray field is a compile error rather than
dead data.

The modules are pure data. No React, no lucide, no asset imports, because
`scripts/generate-static.mts` and the test suite import them under plain Node, where a
`.png` import would throw. Icons and images are named by string key and resolved through
`src/lib/icon-map.ts` and `src/lib/asset-map.ts`.

## Changing the positioning in one place

Edit `src/content/site.ts` and run `npm run generate`.

That one file feeds the hero, the `<title>` and every meta tag, both JSON-LD blocks,
`public/llms.txt` and `public/sitemap.xml`. Those four artifacts are **generated** by
`scripts/generate-static.mts`, which runs automatically before every build. Do not
hand-edit them; your changes will be overwritten.

`npm test` fails the build if a generated file has drifted from the content layer, or if
the spine sentence or any headline number disagrees between the page, the meta, the
structured data and `llms.txt`.

## Adding content without touching a component

Masters go in `public/files/`. The site never references them directly: `npm run media`
renders shippable versions into `public/media/`, which is committed. That step is not part
of `npm run build`, because it takes minutes and the inputs change rarely.

**A recording of the OS:** drop the mp4 in `public/files/os screenshots/`, add an entry to
`src/content/os.ts`, run `npm run media`. It is transcoded to 720p with a poster still,
framed as a phone (all four sources are portrait captures), lazy loaded, played only when
on screen, and it respects `prefers-reduced-motion` by showing the poster with controls.

**A slide:** add an entry to `src/content/deck.ts` naming a file in `public/files/slides/`,
run `npm run media`. Two WebP widths are produced: one for the card, one for the
full-screen reader.

**An appearance:** add an entry to `src/content/appearances.ts` with the `appearanceId`
from the content index, run `npm run media`. The build fails if that record is not marked
`approved` in the manifest, or if the link you gave is not one of its own `source_urls`.

**A portfolio item, a receipt, a lesson:** the matching module in `src/content/`.

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
