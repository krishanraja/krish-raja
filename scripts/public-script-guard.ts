/**
 * What must never reach the public script.
 *
 * On 14 Nov 2026 a database address and a publishable key went out in the page's
 * script for most of an hour. The page only ever talks to /api/enquiry now, and
 * this is what keeps it that way: the `public-script-guard` plugin in
 * vite.config.ts runs it over every JavaScript chunk and the HTML, and a hit
 * fails the build, so it cannot deploy.
 */
export const FORBIDDEN_IN_PUBLIC_SCRIPT: readonly { label: string; pattern: RegExp }[] = [
  { label: 'a Supabase reference', pattern: /supabase/i },
  { label: 'a Supabase key prefix (sb_)', pattern: /\bsb_/ },
  { label: 'a JWT', pattern: /eyJhbGciOi[A-Za-z0-9_-]{10,}/ },
  { label: 'a server-only variable name', pattern: /SITE_ENQUIRIES_(URL|KEY)/ },
];

/** The labels of every forbidden thing found, empty when the code is clean. */
export const findForbidden = (code: string): string[] =>
  FORBIDDEN_IN_PUBLIC_SCRIPT.filter((f) => f.pattern.test(code)).map((f) => f.label);
