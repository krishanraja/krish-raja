/**
 * Every external URL in the content layer, actually requested.
 *
 * This is not in `npm test` on purpose. A unit suite that needs the network is
 * a unit suite that fails on a train, and the whole value of the consistency
 * suite is that it is trustworthy. Run this by hand and before a release.
 *
 * It exists because of the Mindmake rename: the brand changed while mindmake.co
 * had no DNS record, so the copy and the links moved on different days. The
 * switch that keeps them apart is `DOMAINS_LIVE` in src/content/site.ts, and
 * this is what proves the side it is currently on actually resolves.
 *
 *   node scripts/links-check.mjs
 */
import { site, portfolio, contact, appearances, lessons, deck, nav } from '../src/content/index.ts';

const urls = new Map();
const add = (url, where) => {
  if (typeof url !== 'string' || !/^https?:\/\//.test(url)) return;
  if (!urls.has(url)) urls.set(url, []);
  urls.get(url).push(where);
};

const walk = (node, path) => {
  if (typeof node === 'string') return add(node, path);
  if (Array.isArray(node)) return node.forEach((c, i) => walk(c, `${path}[${i}]`));
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
  }
};
for (const [name, mod] of Object.entries({ site, portfolio, contact, appearances, lessons, deck, nav })) {
  walk(mod, name);
}

// Announced but not live yet (site.comingSoon). Reported, never failed.
const soon = new Set(site.comingSoon ?? []);
for (const url of soon) {
  console.log(`  soon  ${url}  (coming soon, referenced by ${urls.get(url)?.filter((w) => !w.startsWith('site.comingSoon')).join(', ') || 'nothing'})`);
  urls.delete(url);
}

const norm = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/$/, '');

console.log(`checking ${urls.size} URLs from the content layer\n`);

const results = await Promise.all(
  [...urls.entries()].map(async ([url, where]) => {
    try {
      // HEAD first; a few CDNs and podcast hosts answer HEAD with 405.
      let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(20000) });
      if (res.status === 405 || res.status === 403) {
        res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000) });
      }
      // LinkedIn answers bots with 999 and some publishers with 403, 429 or,
      // under load, 503. None is a dead link: marketingmag.com.au returns 403
      // to a full Chrome user agent on every attempt, so its occasional 503 is
      // the same WAF, not an outage. Failing on these would train everyone to
      // ignore this script, which is how a real 404 gets through. They are
      // still printed, on their own line, so a host that truly dies is visible.
      const blocked = [999, 403, 429, 503].includes(res.status);
      // A link that lands somewhere else still passes, but it is reported. The
      // Maven profile moved from /mindmaker to /mindmake with the rename and
      // this script said "ok" for three months, because it followed the
      // redirect silently. Protocol, www and a trailing slash are not a move.
      const moved = res.ok && res.redirected && norm(res.url) !== norm(url) ? res.url : null;
      return { url, where, status: res.status, ok: res.ok || blocked, blocked, moved };
    } catch (err) {
      return { url, where, status: err.name === 'TimeoutError' ? 'timeout' : 'unreachable', ok: false };
    }
  }),
);

const bad = results.filter((r) => !r.ok);
for (const r of results.filter((r) => r.ok && !r.blocked && !r.moved)) console.log(`  ok    ${r.status}  ${r.url}`);
for (const r of results.filter((r) => r.moved)) console.log(`  moved ${r.status}  ${r.url}\n          now ${r.moved} (update the content layer)`);
for (const r of results.filter((r) => r.blocked)) console.log(`  bot   ${r.status}  ${r.url}  (blocked, not confirmed dead)`);
for (const r of bad) console.error(`  FAIL  ${r.status}  ${r.url}\n          referenced by ${r.where.join(', ')}`);

const blockedCount = results.filter((r) => r.blocked).length;
const movedCount = results.filter((r) => r.moved).length;
console.log(
  `\nlinks: ${results.length - bad.length - blockedCount - movedCount} ok, ${movedCount} moved, ${blockedCount} bot-blocked, ${bad.length} failed`,
);
process.exit(bad.length ? 1 : 0);
