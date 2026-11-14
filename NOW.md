---
repo: krishanraja/krish-raja
product: krishraja.com
as_of: 2026-11-14
head: 952bf56
lifecycle: live
production_url: https://www.krishraja.com
state_doc: README.md
history_log: now-notes/
truth_files: [docs/NORTH_STAR.md]
authority_order: [docs/NORTH_STAR.md, README.md]
steward: https://github.com/krishanraja/ai-harness/blob/main/docs/steward/RUNBOOK.md
---

# krishraja.com: where it is right now

## What it is

krishraja.com, Krish Raja's personal site: what he has built, what he is building and what he publishes.

## Who it is for and why it matters for Mindmake

Event organisers and leaders checking who Krish is. It sends the right visitor to Mindmake.

## Where it is right now (as of 2026-11-14)

<!-- north-star-state {"week_of": "2026-11-09", "week_target": 2, "current": null, "current_as_of": null, "current_source": "public.site_enquiries where status = 'booked' (fleet Supabase, from 2026-11-14)", "urgency": 4, "urgency_reason": "measurable from 2026-11-14; no booking marked yet, fresh baseline"} --> **North Star number: U4.** Confirmed paid speaking bookings: measurable from 14 November 2026 as rows Krish marks `booked` in `public.site_enquiries` (see `docs/enquiry-trace.md`); a fresh baseline, none marked yet, against 2 this week on the way to 12 by 22 February 2027.

Lifecycle: live at https://www.krishraja.com, deployed by Vercel from `main`. The detail is in `README.md`; each session's closeout note is in `now-notes/`.

## What changed recently

- 2026-11-14 **Enquiries counted.** The enquiry form, every email link and every Calendly link write one row to `public.site_enquiries` (fleet Supabase, insert only, production hosts only). Verified with a real production click. Contract in `docs/enquiry-trace.md`.
- 2026-11-14 **Next-session slot.** `lessons.upcoming` holds the 3 Dec session with its link and title empty; once filled it heads the session list, enters llms.txt, the crawler copy and the JSON-LD, and hides when it starts. The crawler files now list the lessons and the booking link.
- 2026-11-14 **Stale facts and CI.** CTRL is live, so it is no longer "coming soon"; the channel is named Make Your Mind Up in llms.txt and the crawler copy; tests, typecheck and lint now run on every pull request.
- 2026-11-14 **Maven profile** points at `maven.com/mindmake` (the old address redirects); `links:check` now reports any link that moved.
- 2026-11-13 **Cleanup.** Deleted the retired sections' code (14 components, 37 unused UI-kit files, the old Supabase contact form), 36 unused npm packages, about 20 unused images, the operating system recordings (90MB of masters) and the content fields nothing read. Docs brought up to date. The 147 slide masters not in the deck stay, by Krish's choice.
- 2026-11-13 **Discoverability.** New title and description naming him as a speaker, a new share card and favicon from the bitmoji, one linked structured-data graph, a crawler copy of the page for AI bots, a fuller `llms.txt`, en-GB throughout.
- 2026-11-11 **Hero and sections.** Fit copy as a lead and four traits, section titles wipe in behind a mint bar, In public runs newest first, Contact and receipts headings at section size.
- 2026-11-09 **Homepage rebuilt** from the mock Krish approved; the OS recordings and portfolio shelf came off.

## What is next and what is waiting on Krish

- Mark confirmed bookings `booked` in `public.site_enquiries` (or tell Control Center to), so the North Star number is real.
- Paste the 3 Dec Lightning Lesson's Maven link, title and line into `lessons.upcoming` once it exists in Maven.
- krishraja.ai serves an old copy of the site (title "AI Revenue Leader", "Brooklyn, NY", retired figures); redirect it to www.krishraja.com (a domain setting, his yes).
- Re-run LinkedIn Post Inspector on the new card, and submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Months for the Dan Pratl, Justin Kramm and dothinkdo 2026 appearances and a year for the Captify hire, so In public is dated throughout.
- North Star check (2026-11-13): holds, and the discoverability work moves it.

## Read next

- `docs/NORTH_STAR.md`: the North Star, its number and its weekly ladder.
- `README.md`: what this repository is and how it runs.

## Do not trust

Nothing at the moment.
