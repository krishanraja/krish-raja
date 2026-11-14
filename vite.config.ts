import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { sectionPages } from "./scripts/section-pages";
import { findForbidden } from "./scripts/public-script-guard";
import { componentTagger } from "lovable-tagger";

/**
 * Keeps the masters in `public/files/` out of the deployed build.
 *
 * Vite copies everything in `public/` into `dist/`. That directory holds 162MB
 * of masters that nothing on the site references, because `npm run media`
 * renders what the site actually uses into `public/media/`.
 *
 * Two reasons this matters, and the second is the important one:
 *
 * 1. Size. It is the difference between an 18MB deploy and a 180MB one.
 * 2. The content index marks two captures do-not-publish: the LinkedIn one is
 *    an authentication challenge, and the Techonomic record has no trustworthy
 *    capture at all. Copying them to a CDN publishes them, whether or not a
 *    page links to them. They stay in the repo as audit artifacts, which is
 *    what the manifest asks for, and they do not ship.
 */
const keepMastersOutOfTheBuild = (): Plugin => ({
  name: 'keep-masters-out-of-the-build',
  apply: 'build',
  closeBundle: async () => {
    await rm(path.resolve(__dirname, 'dist/files'), { recursive: true, force: true });
  },
});

/**
 * Writes dist/<path>/index.html for every short section address in
 * src/content/links.ts, so krishraja.com/thinking is a real file on Vercel and
 * its link preview names the section. A plugin rather than a postbuild script,
 * so it runs however the host invokes the build.
 */
const sectionAddresses = (): Plugin => ({
  name: 'section-addresses',
  apply: 'build',
  closeBundle: async () => {
    const dist = path.resolve(__dirname, 'dist');
    // A failed build writes no page; step aside so its real error is the one shown.
    const indexHtml = await readFile(path.join(dist, 'index.html'), 'utf8').catch(() => null);
    if (indexHtml === null) return;
    for (const [file, html] of sectionPages(indexHtml)) {
      await mkdir(path.dirname(path.join(dist, file)), { recursive: true });
      await writeFile(path.join(dist, file), html, 'utf8');
    }
  },
});

/**
 * Fails the build if the public script or the page mentions a database, a key
 * or a server-only variable. See scripts/public-script-guard.ts for why.
 */
const publicScriptGuard = (): Plugin => ({
  name: 'public-script-guard',
  apply: 'build',
  generateBundle(_, bundle) {
    for (const [file, out] of Object.entries(bundle)) {
      const code =
        out.type === 'chunk' ? out.code : /\.(js|mjs|html)$/.test(file) ? String(out.source) : '';
      const hits = code ? findForbidden(code) : [];
      if (hits.length) this.error(`${file} would ship ${hits.join(', ')}. Nothing on the page may know where enquiries are stored.`);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    allowedHosts: [".vercel.run"],
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    keepMastersOutOfTheBuild(),
    sectionAddresses(),
    publicScriptGuard(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
