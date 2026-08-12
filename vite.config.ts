import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { rm } from "node:fs/promises";
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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
