import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { discoveryProfiles } from '../discovery';
import { sectionLinks } from '../links';
import { site } from '../site';

const root = resolve(__dirname, '../../..');
const read = (file: string) => readFileSync(resolve(root, file), 'utf8');
const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/'/g, '&#x27;');

describe('the public executive and keynote pages', () => {
  it('links each canonical page from the homepage, sitemap and machine-readable briefing', () => {
    const sitemap = [...read('public/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    expect(sitemap).toEqual([site.canonical, ...discoveryProfiles.map(p => site.url + p.path)]);
    const home = read('index.html');
    for (const profile of discoveryProfiles) {
      expect(home).toContain(`href="${profile.path}">${profile.label}</a>`);
      expect(read('public/llms.txt')).toContain(site.url + profile.path);
      expect(sectionLinks.some(link => '/' + link.path === profile.path)).toBe(false);
    }
  });

  it.each(discoveryProfiles)('publishes a full standalone HTML document at $path', profile => {
    const html = read(profile.path.slice(1) + '/index.html');
    const url = site.url + profile.path;
    expect(html.match(/<h1>/g)).toHaveLength(1);
    expect(html).toContain(`<h1>${profile.headline}</h1>`);
    expect(html).toContain(`<link rel="canonical" href="${url}"`);
    expect(html).toContain(`property="og:url" content="${url}"`);
    expect(html).toContain(`<title>${escape(profile.title)}</title>`);
    expect(html).toContain('mailto:' + site.email + '?subject=' + encodeURIComponent(profile.subject));
    for (const entry of profile.entries) expect(html).toContain(`<h3>${escape(entry.title)}</h3>`);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1])['@graph'];
    const page = graph.find(node => node['@id'] === url + '#page');
    const person = graph.find(node => node['@type'] === 'Person');
    expect(person['@id']).toBe(site.canonical + '#person');
    expect(page.about['@id']).toBe(person['@id']);
    const main = graph.find(node => node['@id'] === page.mainEntity['@id']);
    expect(main['@type']).toBe(profile.intent === 'speaking' ? 'Service' : 'Person');
    if (profile.intent === 'speaking') expect(main.provider['@id']).toBe(person['@id']);
  });
});
