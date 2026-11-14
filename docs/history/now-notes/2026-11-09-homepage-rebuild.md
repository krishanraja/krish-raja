# 2026-11-09: the homepage rebuilt

## Status

The homepage Krish approved over twelve rounds of review has been built into the site and merged
to main. Order: hero with the brain, Build Your AI Chief of Staff (speaking and immersion,
Mindmake, Make Your Mind Up), the slides, the live Make Your Mind Up channel, In public with a
designed thumbnail per appearance, the sessions with the attendee logos, receipts, contact.

- One typeface (Onest), ink and burnt orange, light only.
- "Get in touch" and "Book an immersion session" open an enquiry form that writes an email to
  krish@mindmake.co in the reader's own mail app. Nothing pretends to send.
- `api/live.js` reads the Substack and YouTube feeds for makeyourmindup.ai and caches them for
  30 minutes. The page falls back to the snapshot in `src/content/home.ts`.
- The operating system recordings and the portfolio shelf are off the page (Krish, 9 Nov 2026).
  Their content modules stay, because llms.txt and the meta still read them.

Verified before merge: typecheck clean, lint 0 errors, tests 140/140, build clean,
`mobile:check` 79 passed and 0 failed, and a system check at eleven widths (320 to 1440)
covering overflow, one typeface, buttons never wrapping or overflowing their card, button pairs
aligned, choice sets fully visible, no stranded heading words, tap targets, and that clicking
the brain parts or the filters never moves anything else on the page.

## Next step

- Two links were already dead before this change and still are: `ctrl.themindmaker.ai` (404)
  and the LiveRamp article (404, shown on the In public wall). Krish to say whether CTRL has a
  new address and whether the LiveRamp card should come off.
- Three appearances Krish saw in the mock are not on the site because they are not in the
  content index yet: Austin Leonard, POSSIBLE 2026 day two and day three. Add their records
  (approved) and their thumbnails are one entry each.
- When content.mindmake.co resolves, flip `DOMAINS_LIVE`. mindmake.co and ctrl.mindmake.co
  already do; themindmaker.ai already redirects to mindmake.co.
- Check `/api/live` on production after the deploy, since it only runs on Vercel.

## North Star check

Moves the organiser's path directly: the second section now offers "Book an immersion session"
next to proof of the rooms, the slides show what a session contains, and every ask opens one
form addressed to Krish. The number itself (confirmed paid speaking bookings) is still not
measured; this does not change that.
