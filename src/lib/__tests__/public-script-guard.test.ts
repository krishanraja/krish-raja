import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findForbidden } from '../../../scripts/public-script-guard';

const root = join(__dirname, '../../..');
const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? files(p) : [p];
  });

describe('nothing on the page knows where enquiries are stored', () => {
  it('the build guard catches each forbidden thing', () => {
    expect(findForbidden('fetch("/api/enquiry")')).toEqual([]);
    expect(findForbidden('https://abc.supabase.co/rest/v1/x')).not.toEqual([]);
    expect(findForbidden('const k="sb_publishable_x"')).not.toEqual([]);
    expect(findForbidden('eyJhbGciOiJIUzI1NiIsInR5cCI6')).not.toEqual([]);
    expect(findForbidden('process.env.SITE_ENQUIRIES_KEY')).not.toEqual([]);
  });

  it('no page source carries an address, a key prefix, a JWT or a server variable', () => {
    const src = files(join(root, 'src')).filter((f) => /\.(ts|tsx|css|html)$/.test(f) && !f.includes('__tests__'));
    const hits = src
      .map((f) => [relative(root, f), findForbidden(readFileSync(f, 'utf8'))] as const)
      .filter(([, h]) => h.length);
    expect(hits).toEqual([]);
  });

  it('the server endpoint reads the store from the environment, not from source', () => {
    const api = readFileSync(join(root, 'api/enquiry.js'), 'utf8');
    expect(api).toMatch(/env\.SITE_ENQUIRIES_URL/);
    expect(api).toMatch(/env\.SITE_ENQUIRIES_KEY/);
    expect(api).not.toMatch(/supabase\.co|\bsb_(publishable|secret)|eyJhbGciOi/i);
  });

  it('no VITE_ variable could carry a store address or key into the script', () => {
    const example = readFileSync(join(root, '.env.example'), 'utf8');
    expect(example).not.toMatch(/^VITE_/m);
  });
});
