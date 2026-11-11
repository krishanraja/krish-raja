/**
 * GET /api/live: the latest pieces from makeyourmindup.ai, for the homepage.
 *
 * The browser cannot read the Substack feed directly (no CORS header), so this
 * Vercel function reads it server-side, pairs each post with its YouTube video
 * by title, and returns a short JSON list. Cached at the edge for 30 minutes and
 * served stale for a day if a feed is down. The page falls back to the snapshot
 * in src/content/home.ts if this call fails outright.
 */
const FEED = 'https://home.makeyourmindup.ai/feed';
const YT = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCvxmp6eKUqrjGGbCGl7f9-A';
const SERIES = { 1: 'follow.the.money', 3: 'under.the.hood', 5: 'mind.the.gap' };

const decode = (s) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").trim();
const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
};
const words = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2));
const similar = (a, b) => {
  const A = words(a), B = words(b);
  const shared = [...A].filter((w) => B.has(w)).length;
  return shared / Math.max(1, Math.min(A.size, B.size));
};

export function parse(feedXml, ytXml) {
  const videos = [...ytXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((m) => m[1])
    .filter((e) => !e.includes('/shorts/'))
    .map((e) => ({ id: tag(e, 'yt:videoId'), title: tag(e, 'title') }));
  const used = new Set();
  return [...feedXml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((m) => m[1])
    .map((it) => {
      const title = tag(it, 'title');
      const date = new Date(tag(it, 'pubDate'));
      const desc = tag(it, 'description');
      const best = videos
        .filter((v) => !used.has(v.id))
        .map((v) => ({ v, s: similar(v.title, title) }))
        .sort((a, b) => b.s - a.s)[0];
      const video = best && best.s >= 0.6 ? best.v.id : undefined;
      if (video) used.add(video);
      // The post's own lead image, resized to 800px. Substack's image proxy takes its
      // options as the comma list after /fetch/. The feed's URLs carry a $s_ signature
      // that browsers get a 404 for, so the options are replaced whole, signature and
      // all; the unsigned form serves. Used when no YouTube still is found.
      const img = (it.match(/https:\/\/substackcdn\.com\/image\/fetch\/[^"\s<]+/) || [])[0];
      const image = img ? img.replace(/\/fetch\/[^/]*\//, '/fetch/w_800,c_limit,f_auto,q_auto:good/') : undefined;
      return {
        title,
        link: tag(it, 'link'),
        date: Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10),
        series: SERIES[date.getUTCDay()],
        format: desc.includes('|') ? desc.split('|')[0].trim() : undefined,
        video,
        image,
      };
    })
    .filter((p) => p.title && p.link && !/^video:/i.test(p.title))
    .slice(0, 6);
}

export default async function handler(req, res) {
  try {
    const [feed, yt] = await Promise.all([
      fetch(FEED, { headers: { 'user-agent': 'krishraja.com live feed' } }).then((r) => (r.ok ? r.text() : Promise.reject(r.status))),
      fetch(YT).then((r) => (r.ok ? r.text() : '')).catch(() => ''),
    ]);
    const items = parse(feed, yt);
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json(items);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: 'feed unavailable' });
  }
}
