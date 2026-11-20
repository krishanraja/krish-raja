import assert from 'node:assert/strict';
import { preview } from 'vite';
import { discoveryProfiles } from '../src/content/discovery.js';
import { site } from '../src/content/site.js';

// Fetch the addresses that are actually shared. A correct file on disk can
// still be masked by an SPA server returning the homepage at a clean URL.
const server = await preview({ logLevel: 'silent', preview: { host: '127.0.0.1', port: 0, open: false } });
try {
  const address = server.httpServer.address();
  assert(address && typeof address !== 'string');
  for (const profile of discoveryProfiles) {
    for (const query of ['', '?utm_source=referral']) {
      const url = `http://127.0.0.1:${address.port}${profile.path}${query}`;
      const response = await fetch(url, { redirect: 'error' });
      assert.equal(response.status, 200, url);
      const html = await response.text();
      assert(html.includes(`<link rel="canonical" href="${site.url}${profile.path}"`), url);
      assert(html.includes(`<h1>${profile.headline}</h1>`), url);
      console.log(profile.path + query + ' serves its own HTML and canonical');
    }
  }
} finally {
  await new Promise<void>(done => server.httpServer.close(() => done()));
}
