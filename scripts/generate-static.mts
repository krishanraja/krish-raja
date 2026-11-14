/**
 * Generates every static artifact that has to agree with src/content/.
 *
 *   index.html      meta tags and both JSON-LD blocks, between markers
 *   public/llms.txt the whole file
 *   public/sitemap.xml the whole file
 *
 * Runs automatically before `npm run build`. Never hand-edit the outputs.
 *
 *   npm run generate          write the files
 *   npm run generate:check    fail if a committed file has drifted
 *
 * The content layer is pure data with no React or asset imports, which is why
 * this script can import it directly under tsx.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../src/content/site.js';
import { receipts } from '../src/content/receipts.js';
import { portfolio } from '../src/content/portfolio.js';
import { appearances } from '../src/content/appearances.js';
import { contact } from '../src/content/contact.js';
import { sectionLinks } from '../src/content/links.js';
import { lessons } from '../src/content/lessons.js';
import { home } from '../src/content/home.js';
import { isAnnounced, longDate } from '../src/lib/upcoming.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const INDEX = resolve(root, 'index.html');
const LLMS = resolve(root, 'public/llms.txt');
const SITEMAP = resolve(root, 'public/sitemap.xml');
const MANIFEST = resolve(root, 'public/site.webmanifest');

/* ------------------------------------------------------------------ meta */

// Every value is escaped: "B&T" or a quote in a title would otherwise break the tag.
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const metaBlock = (): string => {
  const title = esc(site.title);
  const description = esc(site.description);
  const alt = esc(site.ogImageAlt);
  const image = esc(site.ogImage);
  return [
    `    <meta name="theme-color" content="${site.themeColor}" />`,
    `    <meta name="msapplication-TileColor" content="${site.themeColor}" />`,
    `    <title>${title}</title>`,
    `    <meta name="title" content="${title}" />`,
    `    <meta name="description" content="${description}" />`,
    `    <meta name="author" content="${esc(site.name)}" />`,
    `    <meta name="application-name" content="${esc(site.name)}" />`,
    `    <meta name="apple-mobile-web-app-title" content="${esc(site.name)}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `    <meta name="googlebot" content="index, follow" />`,
    `    <meta name="bingbot" content="index, follow" />`,
    ``,
    `    <!-- Open Graph: LinkedIn, Slack, WhatsApp, iMessage, Facebook -->`,
    `    <meta property="og:type" content="profile" />`,
    `    <meta property="og:url" content="${site.canonical}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:image" content="${image}" />`,
    `    <meta property="og:image:secure_url" content="${image}" />`,
    `    <meta property="og:image:type" content="image/png" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="${alt}" />`,
    `    <meta property="og:site_name" content="${esc(site.name)}" />`,
    `    <meta property="og:locale" content="${site.locale}" />`,
    `    <meta property="profile:first_name" content="${esc(site.firstName)}" />`,
    `    <meta property="profile:last_name" content="${esc(site.lastName)}" />`,
    `    <meta property="profile:username" content="${esc(site.username)}" />`,
    ``,
    `    <!-- X / Twitter -->`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:url" content="${site.canonical}" />`,
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    `    <meta name="twitter:image:alt" content="${alt}" />`,
    `    <meta name="twitter:site" content="${esc(site.twitterHandle)}" />`,
    `    <meta name="twitter:creator" content="${esc(site.twitterHandle)}" />`,
    ``,
    `    <!-- Canonical URL -->`,
    `    <link rel="canonical" href="${site.canonical}" />`,
    ``,
    `    <!-- Identity: every profile that is verifiably his -->`,
    ...site.sameAs.map((u) => `    <link rel="me" href="${esc(u)}" />`),
    ``,
    `    <!-- A plain-text briefing for answer engines -->`,
    `    <link rel="alternate" type="text/plain" href="/llms.txt" title="${esc(site.name)}, briefing for AI assistants" />`,
  ].join('\n');
};

/* --------------------------------------------------------------- json-ld */

// Nothing here fabricates a rating, a review count or a venture count. The
// properties that must never appear are listed in
// project-documentation/retired-names.json and the test suite enforces it.
// See also the "deliberately absent" list in CLAUDE.md.
//
// One @graph, so the page, the person, the site and Mindmake are linked by @id
// rather than restated: ProfilePage says this page is about a person, Person
// carries the evidence, Organization says what he founded.
const PERSON = `${site.canonical}#person`;
const MINDMAKE = `${site.canonical}#mindmake`;

const isUni = (name: string) => /university|college|school/i.test(name);

// The appearances with a public link, newest first, as the record a search or
// answer engine can cite. Same order as the page.
const evidence = appearances.items.filter((a) => a.href);

// The live sessions, with the next one first once Krish has announced it.
// Unlike the page, the generated files keep it after the date passes, so they
// stay deterministic; clearing it in lessons.ts takes it out of both.
const upcoming = isAnnounced(lessons.upcoming) ? lessons.upcoming : null;
const booking = contact.links.find((l) => l.href === site.links.calendly);

// The live channel, in its own words from home.ts: the line under its name and
// the series it runs, e.g. "follow.the.money (Mon)".
const channel = home.channel;
const channelSeries = channel.series.map((x) => `${x.name} (${x.day})`).join(', ');
const withChannel = (w: { name: string; qualifier?: string; detail: string }) =>
  w.qualifier === site.links.content ? { ...w, detail: `${w.detail} ${channel.sub} ${channelSeries}.` } : w;

const graphLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${site.canonical}#page`,
      url: site.canonical,
      name: site.title,
      description: site.description,
      inLanguage: site.language,
      dateModified: site.updated,
      isPartOf: { '@id': `${site.canonical}#website` },
      mainEntity: { '@id': PERSON },
      primaryImageOfPage: { '@type': 'ImageObject', url: site.ogImage, width: 1200, height: 630 },
    },
    {
      '@type': 'Person',
      '@id': PERSON,
      name: site.name,
      givenName: site.firstName,
      familyName: site.lastName,
      jobTitle: site.jobTitle,
      description: site.description,
      url: site.url,
      email: `mailto:${site.email}`,
      image: { '@type': 'ImageObject', url: site.personImage, caption: site.name },
      sameAs: [...site.sameAs],
      knowsAbout: [...site.knowsAbout],
      knowsLanguage: 'en',
      award: [...site.awards],
      hasOccupation: [
        { '@type': 'Occupation', name: site.spine },
        { '@type': 'Occupation', name: 'Keynote speaker' },
      ],
      worksFor: { '@id': MINDMAKE },
      alumniOf: site.alumniOf.map((name) => ({
        '@type': isUni(name) ? 'CollegeOrUniversity' : 'Organization',
        name,
      })),
      subjectOf: evidence.map((a) => ({
        '@type': 'CreativeWork',
        name: a.title,
        url: a.href,
        ...(a.year ? { datePublished: a.year } : {}),
        publisher: { '@type': 'Organization', name: a.outlet },
      })),
    },
    {
      '@type': 'Organization',
      '@id': MINDMAKE,
      name: 'Mindmake',
      url: site.links.mindmake,
      description: 'A capped advisory practice founded by Krish Raja.',
      founder: { '@id': PERSON },
    },
    ...(upcoming
      ? [
          {
            '@type': 'EducationEvent',
            '@id': `${site.canonical}#next-session`,
            name: upcoming.title,
            ...(upcoming.description ? { description: upcoming.description } : {}),
            startDate: upcoming.startDate,
            url: upcoming.link,
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: { '@type': 'VirtualLocation', url: upcoming.link },
            organizer: { '@id': PERSON },
            performer: { '@id': PERSON },
          },
        ]
      : []),
    {
      '@type': 'WebSite',
      '@id': `${site.canonical}#website`,
      url: site.url,
      name: site.name,
      description: site.websiteDescription,
      publisher: { '@id': PERSON },
      inLanguage: site.language,
    },
  ],
});

const indent = (json: unknown, spaces: number) =>
  JSON.stringify(json, null, 2)
    .split('\n')
    .map((line) => ' '.repeat(spaces) + line)
    .join('\n');

const jsonLdBlock = (): string =>
  [
    '    <!-- JSON-LD: ProfilePage, Person, Mindmake and WebSite, linked by @id -->',
    '    <script type="application/ld+json">',
    indent(graphLd(), 4),
    '    </script>',
  ].join('\n');

/* ------------------------------------------------------------- prerender */

// The page is a React app, and most AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot) read the HTML without running JavaScript, so to them #root
// was empty. This is the same story in plain HTML: who he is, the record, the
// rooms, how to book. React replaces it on mount, and until then it is
// visually hidden with the screen-reader pattern, so nobody sees it flash.
const prerenderBlock = (): string => {
  const li = (s: string) => `          <li>${s}</li>`;
  const a = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`;
  return [
    '      <div class="prerender">',
    `        <h1>${esc(site.name)}</h1>`,
    `        <p>${esc(site.spine)}. ${esc(site.description)}</p>`,
    `        <h2>${esc(site.nowHeading)}</h2>`,
    '        <ul>',
    ...site.now.map((w) => li(`<strong>${esc(w.name)}</strong>: ${esc(w.detail)}`)),
    '        </ul>',
    '        <h2>Commercial track record</h2>',
    '        <ul>',
    ...receipts.roles.map((r) =>
      li(`<strong>${esc(r.org)}</strong>${r.title ? `, ${esc(r.title)}` : ''}: ${esc(r.detail)}`),
    ),
    '        </ul>',
    '        <h2>Speaking, podcasts and press</h2>',
    '        <ul>',
    ...evidence.map((x) => li(`${a(x.href!, x.title)}, ${esc(x.outlet)}${x.year ? `, ${x.year}` : ''}`)),
    '        </ul>',
    `        <h2>${a(site.links.content, channel.title)}</h2>`,
    `        <p>${esc(channel.sub)} ${esc(channelSeries)}.</p>`,
    `        <h2>${esc(lessons.title)}</h2>`,
    `        <p>${esc(lessons.sub)}</p>`,
    '        <ul>',
    ...(upcoming ? [li(`${a(upcoming.link, upcoming.title)}, ${esc(longDate(upcoming))}`)] : []),
    ...lessons.lessons.map((l) => li(`${a(l.link, l.title)}: ${esc(l.description)}`)),
    '        </ul>',
    `        <h2>${esc(contact.title)}</h2>`,
    `        <p>${a(`mailto:${site.email}`, site.email)}${booking ? ` · ${a(booking.href, booking.action)}` : ''} · ${a(site.links.linkedin, 'LinkedIn')} · ${a(site.links.mindmake, 'Mindmake')}</p>`,
    '        <nav>',
    ...sectionLinks.map((l) => `          ${a(`/${l.path}`, l.section.title)}`),
    '        </nav>',
    '      </div>',
  ].join('\n');
};

/* -------------------------------------------------------------- llms.txt */

const bullet = (w: { name: string; qualifier?: string; detail: string }) => {
  const head = w.qualifier ? `**${w.name}** (${w.qualifier})` : `**${w.name}**`;
  return w.detail ? `- ${head}: ${w.detail}` : `- ${head}`;
};

const llmsTxt = (): string => {
  // The portfolio is one flat list now, so the build work is whatever carries
  // the Beta flag rather than whatever sat in a tab called "build".
  // The build experiments live on the secondary shelf now, not in a flat list.
  const buildNames = portfolio.secondary.filter((i) => i.isBeta).map((i) => i.name);
  const buildList =
    buildNames.length > 1
      ? `${buildNames.slice(0, -1).join(', ')} and ${buildNames[buildNames.length - 1]}`
      : buildNames.join('');

  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `## Who is ${site.name}`,
    '',
    site.bio,
    '',
    `- Headline: ${site.spine}`,
    `- Founder of Mindmake (${site.links.mindmake})`,
    `- Award: ${site.awards.join('; ')}`,
    `- Profiles: ${site.sameAs.join(', ')}`,
    '',
    `## ${site.nowHeading}`,
    '',
    ...site.now.map(bullet),
    '',
    '## Commercial track record',
    '',
    ...receipts.roles.map((r) =>
      r.title ? `- **${r.org}**, ${r.title}: ${r.detail}` : `- **${r.org}**: ${r.detail}`,
    ),
    '',
    `## ${site.writingHeading}`,
    '',
    ...site.writing.map(withChannel).map(bullet),
    // The sessions sit under the last bullet, "Teaches on Maven", newest
    // announcement first.
    ...(upcoming ? [`  - [${upcoming.title}](${upcoming.link}), ${longDate(upcoming)}`] : []),
    ...lessons.lessons.map((l) => `  - [${l.title}](${l.link}): ${l.description}`),
    '',
    '## Speaking, podcasts and press',
    '',
    'Keynote speaker and podcast guest on AI, media and commercial strategy. Newest first:',
    '',
    ...evidence.map((x) => `- [${x.title}](${x.href}), ${x.outlet}${x.year ? `, ${x.year}` : ''}`),
    '',
    `To book Krish to speak or run an AI immersion session for a team, email ${site.email}.`,
    '',
    '## Build work',
    '',
    // The names come from the portfolio Build tab, so adding an item there
    // updates this line too.
    `${buildList} ${site.buildWorkNote}`,
    '',
    '## Education and recognition',
    '',
    site.education,
    '',
    '## Contact',
    '',
    `${site.email} · ${site.url.replace('https://www.', '')} · ${site.links.linkedin.replace('https://www.', '')}`,
    ...(booking ? ['', `${booking.action}: ${booking.href}`] : []),
    '',
  ].join('\n');
};

/* ------------------------------------------------------- site.webmanifest */

// Was hand-kept and had drifted: it named the site "Builder of AI Products"
// and carried a theme colour nothing else used.
const webmanifest = (): string =>
  JSON.stringify(
    {
      name: site.title,
      short_name: site.name,
      description: site.description,
      icons: [
        { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      theme_color: site.themeColor,
      background_color: site.themeColor,
      display: 'standalone',
      start_url: '/',
      scope: '/',
    },
    null,
    2,
  ) + '\n';

/* ----------------------------------------------------------- sitemap.xml */

const sitemapXml = (): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    '  <url>',
    `    <loc>${site.canonical}</loc>`,
    `    <lastmod>${site.updated}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '    <image:image>',
    `      <image:loc>${esc(site.ogImage)}</image:loc>`,
    `      <image:title>${site.name}</image:title>`,
    `      <image:caption>${esc(site.ogImageAlt)}</image:caption>`,
    '    </image:image>',
    '    <image:image>',
    `      <image:loc>${site.personImage}</image:loc>`,
    `      <image:title>${site.name}</image:title>`,
    '    </image:image>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');

/* ------------------------------------------------------------------ main */

const replaceBetween = (source: string, marker: string, body: string): string => {
  const start = `<!-- content:${marker}:start -->`;
  const end = `<!-- content:${marker}:end -->`;
  const from = source.indexOf(start);
  const to = source.indexOf(end);
  if (from === -1 || to === -1) {
    throw new Error(`index.html is missing the ${start} / ${end} markers`);
  }
  return source.slice(0, from + start.length) + '\n' + body + '\n    ' + source.slice(to);
};

export interface Artifact {
  path: string;
  label: string;
  expected: string;
  actual: string | null;
}

/**
 * What every generated file should contain, next to what it does contain.
 * Exported so the consistency suite can check for drift without shelling out.
 */
export const artifacts = (): Artifact[] => {
  const readOrNull = (p: string) => {
    try {
      return readFileSync(p, 'utf8');
    } catch {
      return null;
    }
  };

  const indexHtml = readFileSync(INDEX, 'utf8');

  return [
    {
      path: INDEX,
      label: 'index.html',
      expected: replaceBetween(
        replaceBetween(replaceBetween(indexHtml, 'meta', metaBlock()), 'jsonld', jsonLdBlock()),
        'prerender',
        prerenderBlock(),
      ),
      actual: indexHtml,
    },
    { path: LLMS, label: 'public/llms.txt', expected: llmsTxt(), actual: readOrNull(LLMS) },
    { path: SITEMAP, label: 'public/sitemap.xml', expected: sitemapXml(), actual: readOrNull(SITEMAP) },
    { path: MANIFEST, label: 'public/site.webmanifest', expected: webmanifest(), actual: readOrNull(MANIFEST) },
  ];
};

/** Labels of the artifacts that have drifted from src/content/. */
export const staleArtifacts = (): string[] =>
  artifacts()
    .filter((a) => a.actual !== a.expected)
    .map((a) => a.label);

const isEntry = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntry) {
  const stale = artifacts().filter((a) => a.actual !== a.expected);

  if (check) {
    for (const a of stale) {
      console.error(`stale: ${a.label} does not match src/content/. Run \`npm run generate\`.`);
    }
    if (stale.length > 0) process.exit(1);
    console.log('all generated files are in sync with src/content/');
  } else {
    for (const a of stale) {
      writeFileSync(a.path, a.expected, 'utf8');
      console.log(`wrote ${a.label}`);
    }
    console.log('generate: done');
  }
}
