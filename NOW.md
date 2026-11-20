---
repo: krishanraja/krish-raja
product: krishraja.com
as_of: 2026-11-20
head: 952bf56
lifecycle: live
production_url: https://www.krishraja.com
state_doc: README.md
history_log: docs/history/now-notes/
truth_files: [docs/NORTH_STAR.md]
authority_order: [docs/NORTH_STAR.md, README.md]
steward: https://github.com/krishanraja/ai-harness/blob/main/docs/steward/RUNBOOK.md
---

# krishraja.com: where it is right now

## What it is

krishraja.com, Krish Raja's personal site: what he has built, what he is building and what he publishes.

## Who it is for and why it matters for Mindmake

Event organisers and leaders checking who Krish is. It sends the right visitor to Mindmake.

## Where it is right now (as of 2026-11-20)

<!-- north-star-state {"week_of":"2026-11-16","week_target":"private","current":"private","current_as_of":"2026-11-16","current_source":"Control Center site_enquiries with status booked (krishraja.com's enquiries, marked by Krish)","urgency":5,"urgency_reason":"under 40% of the week's target two weeks running (0% now)"} --> **North Star number: U5, stalled.** Confirmed paid speaking bookings: at 0% of this week's target (figures private). Everything else pauses unless it moves the number.

Lifecycle: live at https://www.krishraja.com, deployed by Vercel from `main`. The detail is in `README.md`; each session's closeout note folds into this file from `now-notes/` on main (`.github/workflows/closeout-fold.yml`); the notes before 14 Nov are kept verbatim in `docs/history/now-notes/`.

- The executive profile and AI keynote speaker page are live on krishraja.com. Both return their own HTML, canonical address and search metadata, and appear in the public sitemap. Production browser checks covered both enquiry forms on phone and desktop with the final send intercepted. (2026-11-20)
- The Make Your Mind Up card on the public homepage shows the robot's full head below the wordmark. Browser measurements confirmed the framing at 11 screen sizes from 320px to 1440px. (2026-11-20)
- The hero opens directly on the portrait. The leadership badges and industry line introduce Your choice of engagement, and the same corner fold takes visitors into the brain and back to the portrait. The media route shows the supplied robot and both AI Brain routes use the supplied Mindmake mark. (2026-11-20)
- The production contact form sends enquiries directly to Krish. One authorised mobile test through See me in action reached the Gmail Primary inbox with the immersion subject, visitor reply address and message spacing intact. The form waits for its delivery check before enabling submission. The test was excluded from the enquiry count. (2026-11-20)
- The approved hero uses the supplied portrait, a one-press brain reveal, four quality badges and six routes on both layouts. The mobile lead keeps its closing sentence together. The immersion route opens the session evidence and its enquiry form, and longer-term enquiries carry their own subject. The form opens an addressed email draft when direct delivery is unavailable. (2026-11-20)
- the branch sweep takes an approved list (branch@sha) on a hand run and deletes each named branch only at that exact commit, skipping and logging anything else; the weekly run is unchanged. Copied from ai-harness's canonical script and workflow. (2026-11-15)
- A weekly branch sweep (`.github/workflows/branch-sweep.yml`, Sunday 03:17 UTC, and by hand) deletes every remote branch whose work is already on main and lists each branch it keeps with why: unmerged work, an open pull request, protected (Ruling, Krish, 2026-11-15). The script is `.github/scripts/branch_sweep.py`, copied unchanged from ai-harness, which holds the canonical copy. (2026-11-15)
- Four rulings of 14 Nov shipped as one pull request each. 5.8 #44 the two subscribe buttons read "Subscribe", not "Subscribe free" (merged). 5.9 #45 the speaking card reads "Sydney Opera House · Maven"; the POSSIBLE and Cannes recordings stay in In public under Podcasts (merged). 5.12 #46 both subscribe links carry utm_source=krishraja.com, utm_medium=referral, utm_campaign=growth and a utm_content per placement, from one constant in site.ts. 5.10 one enquiry address, krish@mindmake.co, guarded by a test across the content layer, generated files, components and api, and recorded in FACTS.md. Each with its own test; tests, typecheck, lint green; mobile:check 79 passed 0 failed on the combined change. 5.11 untouched until the 3 Dec session exists. (2026-11-14)
- closeout notes now fold into NOW.md on main (.github/workflows/closeout-fold.yml runs the harness's own fold, checked by hash); the eight notes of 6 to 14 Nov, whose content NOW.md already carries, are kept verbatim in docs/history/now-notes/. (2026-11-14)

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

- Next (2026-11-20): Check indexing and search impressions for both addresses in the verified Google Search Console property.
- Mark confirmed bookings `booked` in `public.site_enquiries` (or tell Control Center to), so the North Star number is real.
- Paste the 3 Dec Lightning Lesson's Maven link, title and line into `lessons.upcoming` once it exists in Maven.
- krishraja.ai and www.krishraja.ai redirect permanently (308) to www.krishraja.com, keeping the path, on Vercel since 14 Nov 2026 (Krish moved the domain's nameservers to Vercel; read back that night: `/thinking?x=1` lands on www.krishraja.com with 200). The old copy of the site it served is gone. (2026-11-14)
- Re-run LinkedIn Post Inspector on the new card, and submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Months for the Dan Pratl, Justin Kramm and dothinkdo 2026 appearances and a year for the Captify hire, so In public is dated throughout.
- North Star check (2026-11-20): holds.

## Read next

- `docs/NORTH_STAR.md`: the North Star, its number and its weekly ladder.
- `README.md`: what this repository is and how it runs.

## Do not trust

Nothing at the moment.
