# 2026-11-06: short section addresses

## Status

Live on www.krishraja.com from commit 0857582, merged to main and deployed by Vercel.

Every section now has a short address that opens the homepage and lands on it:
`/operate`, `/os`, `/thinking`, `/portfolio`, `/receipts`, `/work`, `/lessons`,
`/contact`. Each is a real file in the build whose link preview carries that section's
own title and sub. The canonical stays the homepage. Plain `#section` links now land on
first load too; before this they did nothing on a fresh visit.

Verified on production in a real browser: all eight return 200, and each lands at the
section's top margin on desktop, Pixel 7 and Android desktop-site mode. Unknown paths
still 404. Tests 140/140, typecheck clean, `mobile:check` 79 passed and 0 failed.

The addresses are defined in `src/content/links.ts`. How it works is in `CLAUDE.md`
under "Short section addresses".

## Next step

Use `krishraja.com/thinking` as the link in every speaking pitch and organiser reply,
and `krishraja.com/contact` as the ask. Paste `/thinking` into a LinkedIn post draft
once to confirm the preview card reads as intended. LinkedIn caches previews, and its
Post Inspector refreshes one.

## North Star check

Moves the path an organiser takes: one link lands on the talks with a preview that says
so, and one lands on the way to ask. The number itself (confirmed paid speaking
bookings) is still not measured, so NOW.md stays at U4. Measuring it needs Krish to
confirm the count of bookings so far.
