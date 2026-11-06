/**
 * One static HTML file per short section address, written into the build.
 *
 * krishraja.com is a single page, so /thinking would 404 on Vercel without a
 * file at dist/thinking/index.html. Each file is the built index.html with the
 * meta block swapped for that section's title, sub and address. The app itself
 * is unchanged: React Router matches the path and scrolls to the section.
 *
 * The canonical stays the homepage. Eight copies of one page each claiming to
 * be the original would split the search listing; the preview card is what
 * these files are for.
 *
 * Pure data in, strings out, so the Vite plugin and the test suite share it.
 */
import { site } from '../src/content/site';
import { sectionLinks } from '../src/content/links';
import type { SectionLink } from '../src/content/types';

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const sectionUrl = (link: SectionLink) => `${site.url}/${link.path}`;

export const sectionTitle = (link: SectionLink) => `${site.name}: ${link.section.title}`;

/** The built index.html, re-pointed at one section. */
export const sectionPageHtml = (indexHtml: string, link: SectionLink): string => {
  const title = escapeAttr(sectionTitle(link));
  const description = escapeAttr(link.section.sub);
  const url = escapeAttr(sectionUrl(link));
  const siteTitle = escapeAttr(site.title);
  const siteDescription = escapeAttr(site.description);

  const swaps: Array<[RegExp, string]> = [
    [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
    [/(<meta name="title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta name="twitter:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`],
  ];

  let html = indexHtml;
  for (const [pattern, replacement] of swaps) {
    if (!pattern.test(html)) {
      throw new Error(`section page /${link.path}: index.html has no match for ${pattern}`);
    }
    html = html.replace(pattern, replacement);
  }
  // Guard against a swap that silently matched the wrong tag.
  if (!html.includes(`<title>${title}</title>`) || html.includes(`content="${siteTitle}"`)) {
    throw new Error(`section page /${link.path}: title swap did not land`);
  }
  if (html.includes(`content="${siteDescription}"`)) {
    throw new Error(`section page /${link.path}: description swap did not land`);
  }
  return html;
};

/** Every file to write, as [path relative to the build root, contents]. */
export const sectionPages = (indexHtml: string): Array<[string, string]> =>
  sectionLinks.map((link) => [`${link.path}/index.html`, sectionPageHtml(indexHtml, link)]);
