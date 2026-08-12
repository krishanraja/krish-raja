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
| APAC's first authenticated CTV product | Nine | Krish, 12 Aug 2026. Previously attributed to Nexxen in the 11 Aug brief; he confirmed Nine. |
| Maven students | 4,000+ | Krish, 12 Aug 2026. An earlier source said 100+; that figure is retired. |
| B&T 30 Under 30 | Strategy, 2017 | Verified independently by B&T, per the content index. The Marketing and Media reading is retired. |
| Microsoft UK | automated media campaigns deployed in 2010 | Same |
| Mindmaker OS | 14 agents, 45 workflows, in production, licensed to three businesses | Same |
| AdFixus POC | $254K, contracted with a major US publisher | Same. **The client is never named.** See below. |

## Named engagements

- **AdFixus**, Fractional SVP Enterprise. Repositioned from cookie-deprecation defense to
  first-party identity infrastructure. Contracted a $254K POC with a major US publisher and
  rebuilt enterprise pipeline with Hearst, Arena Group and The Weather Company.
- **Meliora**, Executive Advisory. Gen AI advisory and ventures for media, telco and
  entertainment.

## What the content index establishes, and what it does not

`public/files/content index/krish-raja-content-index.md` is a manifest of 33 appearances
with capture status, verification level and source URLs. Its "completed search-gap status"
section is the strongest external evidence this repo has, and it cuts both ways.

**It verifies:**

- **Amobee**, via LiveRamp and the IAB CTV Handbook, with Captify confirming the tenure.
- **Nine Entertainment**, via the Adobe Symposium keynote coverage, the Adobe article, the
  Nine byline and the Mumbrella360 programme.
- **B&T 30 Under 30, Strategy, 2017.** This is why the award is published again.
- **The Sydney Opera House keynote**, by combined evidence: Marketing Mag identifies the
  Adobe Symposium keynote, Adobe's own release identifies the venue.
- **Kroll**, with a naming caveat on one mirror that titles him "Krishna Raja".

**It does not verify, and these are load-bearing:**

- **UNVERIFIED EXTERNALLY: the $9M to $61M figure is first-party only.** Every other
  Nine claim has third-party backing; this one does not. It is still published, because
  Krish stands behind it, but nobody should describe it as independently confirmed.
- **McCann: no verified employment, byline or case study.** Do not infer a McCann role.
  This is why McCann came off the trust strip.
- **BBC: appears only on Krish-controlled Maven material.** Same reason it came off.
- **Fractionl, Plinth and Full Time have no verified public pages.** They stay in the
  portfolio as Krish's own Beta build work, which claims nothing about traction. Do not
  add a customer, a user count or an outcome for any of them.
- **The Built podcast: no verified Krish Raja result.** A different person appears in
  search. Do not create content from it.

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

**UNRESOLVED: the agent count shown in the OS recording.** The site says 14 agents
everywhere. The `org` recording shows "12 agents, 200 runs in last batch" on screen. A
visitor who watches the clip sees a number that contradicts the headline. Either the
recording predates two agents, or the Org tab counts a subset. **Resolve this before the
site is promoted.** See the note in `src/content/os.ts`.

**RESOLVED 12 Aug 2026: Maven student count is 4,000+.** Confirmed by Krish. The 100+
reading is retired and the test suite fails if it returns.

**RESOLVED 12 Aug 2026: 30 Under 30 is Strategy.** Confirmed by Krish and independently by
B&T via the content index. Back in the credentials row.

**RESOLVED 12 Aug 2026: the first authenticated CTV product belongs to Nine.** Confirmed by
Krish. It sits on the Nine receipt and in the Nine line of llms.txt, and has been removed
from the SingTel card and the Nexxen line.

**RESOLVED 12 Aug 2026: the haptic thesis has no URL.** It was published as a book, not a
web page. The card renders description-only and permanently. There is nothing to link.

**RESOLVED: years of experience is sixteen.** The Lightning Lessons copy that said "20
years of business building" is gone. The test suite fails on any career-length claim that
does not say sixteen.

## Facts deliberately removed and not replaced

These were on the site or in `llms.txt` and were wrong or unsupported. They are gone. Do
not reinstate them.

- "AI Revenue Leader & Enterprise Strategist"
- "Runs 8 live products"
- "The rare executive who can write production code and close a $4M enterprise deal"
- "30 Under 30 (Marketing & Media)", the disputed category. Strategy is the verified one.
- "across 13 ventures"
- Any Maven student count other than 4,000+
