# krishraja.com

The personal site of Krish Raja. A portfolio site: what he has built, what he is building,
and what he publishes.

There is exactly one thing sold here, Mindmaker, and it is sold on
[themindmaker.ai](https://themindmaker.ai) rather than on this site. No prices appear in
this repo.

## Stack

Vite 5, React 18, TypeScript, Tailwind CSS 3, shadcn/ui. Single page. Deployed as a static
build.

Desktop and mobile render as two separate component trees, swapped whole at 768px by
`useIsMobileResolved()` in `src/pages/Index.tsx`. Both trees read the same copy.

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
npm run generate   # regenerate meta, JSON-LD, llms.txt and sitemap.xml from src/content/
```

## Where copy lives

**All of it is in `src/content/`.** Components hold layout, not words.

| Module | What it holds |
|---|---|
| `site.ts` | Name, spine sentence, meta, canonical URL, email, socials |
| `hero.ts` | H1, sub, CTAs, trust logos |
| `operate.ts` | "How I operate": sub and the four cards |
| `os.ts` | The Autonomous OS gallery entries |
| `portfolio.ts` | Every portfolio item, every tab |
| `receipts.ts` | Stat cards, named engagements, credentials, journey |
| `latest.ts` | Mindmaker Live posts and appearances |
| `work.ts` | Writing and speaking items |
| `lessons.ts` | Maven lightning lessons |
| `offer.ts` | The single Mindmaker card |
| `contact.ts` | Contact links |
| `nav.ts` | Navigation and footer labels |

Every module is exported `as const satisfies` its type, so a missing field is a compile
error rather than a blank card.

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

**A screenshot or clip of the operating system:** drop the file into `src/assets/os/` and
add one entry to `src/content/os.ts`. Stills and short mp4 or webm loops both work. Video
respects `prefers-reduced-motion` by showing a still frame instead of autoplaying.

**A Mindmaker Live post or a podcast appearance:** add one entry to `src/content/latest.ts`.
Newest first is handled for you; the six most recent are shown.

**A portfolio item, a receipt, a lesson:** the matching module in `src/content/`.

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
