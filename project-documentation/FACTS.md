# Facts

Every number that may appear on krishraja.com, with its source. These are identical on
Krish's LinkedIn and must not drift.

**If a figure is not on this page, it does not go on the site.** Leave a `TODO(krish):`
instead. Never invent a number, client name, date or outcome.

All of these are defined once in `src/content/receipts.ts` and referenced everywhere else,
including the meta description, the JSON-LD and `llms.txt`. `npm test` fails if any of
them disagrees across surfaces.

## The canonical numbers

| Fact | Figure | Source |
|---|---|---|
| Nine Entertainment, data and automation revenue | $9M to $61M in three years | Krish, settled brief 11 Aug 2026. Same figure on LinkedIn. |
| Nine, products launched | 70+ | Same |
| Nine, automated marketplace built from scratch | $55M | Same |
| Nine, P&L | $55M at 22% EBITDA | Same |
| Captify APAC launch | $0 to $12M ARR at 22% EBITDA, team to 18 | Same |
| Nexxen (SingTel) APAC platform revenue | $4M to $38M across twelve markets | Same |
| Microsoft UK | automated media campaigns deployed in 2010 | Same |
| Mindmaker OS | 14 agents, 45 workflows, in production, licensed to three businesses | Same |
| AdFixus POC | $254K, contracted with a major US publisher | Same. **The client is never named.** See below. |

## Named engagements

- **AdFixus**, Fractional SVP Enterprise. Repositioned from cookie-deprecation defence to
  first-party identity infrastructure. Contracted a $254K POC with a major US publisher and
  rebuilt enterprise pipeline with Hearst, Arena Group and The Weather Company.
- **Meliora**, Executive Advisory. Gen AI advisory and ventures for media, telco and
  entertainment.

## Rules attached to specific facts

**The $254K client is never named.** Hearst, Arena Group and The Weather Company are named
as pipeline, which is a different claim. Do not attach any of those three names, or any
other name, to the $254K POC.

**No venture count.** Not "13 ventures", not "8 live products", not any replacement count.
The old figure was unsupported. Do not substitute a new one.

**No price, anywhere in this repo.** Pricing lives on themindmaker.ai only.

**No geographic market claim.** The journey section (London, Sydney, New York) is
biography and is the only place a place name belongs.

## UNRESOLVED

Do not publish either side of these until Krish settles them.

**UNRESOLVED: Maven student count.** One source says 100+ enterprise students, another says
4,000+. Publish neither. The Lightning Lessons sentence keeps its shape and drops the
count.

**UNRESOLVED: 30 Under 30 category.** One source says Strategy, another says Marketing and
Media. Publish neither the category nor the award until one is confirmed.

**UNRESOLVED: first authenticated CTV product in APAC.** The claim has been made at both
Nine and Nexxen. The settled brief of 11 August 2026 attributes it to Nexxen, and the site
follows that, but Krish has not confirmed it. It appears once, on the SingTel receipt card.

**UNRESOLVED: years of experience.** The spine sentence says sixteen. The Lightning Lessons
copy said "20 years of business building". The count has been cut from that sentence rather
than reconciled. Sixteen is the published figure everywhere it appears.

**UNRESOLVED: the haptic thesis URL.** "Predicting the Future of Haptic Design (2011)"
shipped with a dead `link: "#"`. The link has been removed and the card renders as a
description-only dialog. Supply a real URL and it can be wired back.

## Facts deliberately removed and not replaced

These were on the site or in `llms.txt` and were wrong or unsupported. They are gone. Do
not reinstate them.

- "AI Revenue Leader & Enterprise Strategist"
- "Runs 8 live products"
- "The rare executive who can write production code and close a $4M enterprise deal"
- "30 Under 30 (Marketing & Media)"
- "across 13 ventures"
- Any Maven student count
