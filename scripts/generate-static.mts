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

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const INDEX = resolve(root, 'index.html');
const LLMS = resolve(root, 'public/llms.txt');
const SITEMAP = resolve(root, 'public/sitemap.xml');

/* ------------------------------------------------------------------ meta */

const metaBlock = (): string =>
  [
    `    <title>${site.title}</title>`,
    `    <meta name="title" content="${site.title}" />`,
    `    <meta name="description" content="${site.description}" />`,
    `    <meta name="author" content="${site.name}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `    <meta name="googlebot" content="index, follow" />`,
    `    <meta name="bingbot" content="index, follow" />`,
    ``,
    `    <!-- Open Graph / Facebook -->`,
    `    <meta property="og:type" content="profile" />`,
    `    <meta property="og:url" content="${site.canonical}" />`,
    `    <meta property="og:title" content="${site.title}" />`,
    `    <meta property="og:description" content="${site.description}" />`,
    `    <meta property="og:image" content="${site.ogImage}" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="${site.ogImageAlt}" />`,
    `    <meta property="og:site_name" content="${site.name}" />`,
    `    <meta property="og:locale" content="${site.locale}" />`,
    `    <meta property="profile:first_name" content="${site.firstName}" />`,
    `    <meta property="profile:last_name" content="${site.lastName}" />`,
    `    <meta property="profile:username" content="${site.username}" />`,
    ``,
    `    <!-- Twitter -->`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:url" content="${site.canonical}" />`,
    `    <meta name="twitter:title" content="${site.title}" />`,
    `    <meta name="twitter:description" content="${site.description}" />`,
    `    <meta name="twitter:image" content="${site.ogImage}" />`,
    `    <meta name="twitter:image:alt" content="${site.ogImageAlt}" />`,
    `    <meta name="twitter:creator" content="${site.twitterHandle}" />`,
    ``,
    `    <!-- Canonical URL -->`,
    `    <link rel="canonical" href="${site.canonical}" />`,
  ].join('\n');

/* --------------------------------------------------------------- json-ld */

// No aggregateRating, no review count, no star rating, and no venture count.
// See the "deliberately absent" list in CLAUDE.md.
const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.canonical}#person`,
  name: site.name,
  givenName: site.firstName,
  familyName: site.lastName,
  jobTitle: site.jobTitle,
  description: site.description,
  url: site.url,
  email: site.email,
  image: site.ogImage,
  sameAs: [...site.sameAs],
  knowsAbout: [...site.knowsAbout],
  hasOccupation: { '@type': 'Occupation', name: site.jobTitle },
  alumniOf: site.alumniOf.map((name) => ({ '@type': 'Organization', name })),
  memberOf: [{ '@type': 'Organization', name: 'Mindmaker', url: site.links.mindmaker }],
});

const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.canonical}#website`,
  url: site.url,
  name: site.name,
  description: site.websiteDescription,
  publisher: { '@id': `${site.canonical}#person` },
  inLanguage: site.language,
});

const indent = (json: unknown, spaces: number) =>
  JSON.stringify(json, null, 2)
    .split('\n')
    .map((line) => ' '.repeat(spaces) + line)
    .join('\n');

const jsonLdBlock = (): string =>
  [
    '    <!-- JSON-LD structured data for Person -->',
    '    <script type="application/ld+json">',
    indent(personLd(), 4),
    '    </script>',
    '',
    '    <!-- JSON-LD for WebSite -->',
    '    <script type="application/ld+json">',
    indent(websiteLd(), 4),
    '    </script>',
  ].join('\n');

/* -------------------------------------------------------------- llms.txt */

const bullet = (w: { name: string; qualifier?: string; detail: string }) => {
  const head = w.qualifier ? `**${w.name}** (${w.qualifier})` : `**${w.name}**`;
  return w.detail ? `- ${head}: ${w.detail}` : `- ${head}`;
};

const llmsTxt = (): string => {
  const buildNames =
    portfolio.tabs.find((t) => t.id === 'build')?.items.map((i) => i.name) ?? [];
  const buildList =
    buildNames.length > 1
      ? `${buildNames.slice(0, -1).join(', ')} and ${buildNames[buildNames.length - 1]}`
      : buildNames.join('');

  return [
    `# ${site.name}`,
    '',
    `## Who is ${site.name}`,
    '',
    site.bio,
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
    ...site.writing.map(bullet),
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
    `${site.email} · ${site.url.replace('https://', '')} · ${site.links.linkedin.replace('https://www.', '')}`,
    '',
  ].join('\n');
};

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
    `      <image:loc>${site.ogImage}</image:loc>`,
    `      <image:title>${site.name}</image:title>`,
    `      <image:caption>${site.ogImageAlt}</image:caption>`,
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
      expected: replaceBetween(replaceBetween(indexHtml, 'meta', metaBlock()), 'jsonld', jsonLdBlock()),
      actual: indexHtml,
    },
    { path: LLMS, label: 'public/llms.txt', expected: llmsTxt(), actual: readOrNull(LLMS) },
    { path: SITEMAP, label: 'public/sitemap.xml', expected: sitemapXml(), actual: readOrNull(SITEMAP) },
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
