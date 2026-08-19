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
| Mindmake OS | 14 agents, 45 workflows, in production, licensed to three businesses | Same |
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


**It does not verify, and these are load-bearing:**

- **UNVERIFIED EXTERNALLY: the $9M to $61M figure is first-party only.** Every other
  Nine claim has third-party backing; this one does not. It is still published, because
  Krish stands behind it, but nobody should describe it as independently confirmed.
- **McCann: no verified employment, byline or case study.** Do not infer a McCann role.
  This is why McCann came off the trust strip.
- **BBC: appears only on Krish-controlled Maven material.** It came off the trust strip
  for that reason, then went back on 12 August 2026 on Krish's instruction, replacing
  Captify. Note what that trade costs: Captify was the one logo on the strip with a
  receipt attached, both the $0 to $12M ARR figure and a hire announcement published by
  Captify itself, which is in the content index. BBC has neither, and it is eleven months
  in 2007 to 2008. The strip is Krish's call and the site does not claim anything about
  BBC beyond the logo, but the evidence behind the strip is weaker than it was. There is a
  `TODO(krish)` on `hero.trustLogos` recording this.
- **Fractionl, Plinth and Full Time have no verified public pages.** They stay in the
  portfolio as Krish's own Beta build work, which claims nothing about traction. Do not
  add a customer, a user count or an outcome for any of them.
- **The Built podcast: no verified Krish Raja result.** A different person appears in
  search. Do not create content from it.
- **Neither Kroll appearance is Krish.** The content index verified
  `kroll-threat-modeling-podcast` because his name is in the episode title, and it listed
  `kroll-cyber-resilience` with a caveat because that one says "Krishna Raja". Krish
  confirmed on 19 August 2026 that the threat-modeling episode is not him, which means both
  are the same other person, a security speaker. The record and its capture are deleted;
  the Cyber Resilience record stays marked do-not-publish so a future search does not
  rediscover it as a new find. **This is the one place the index got identity wrong, and it
  got it wrong by matching a name.** Verification of a name is not verification of a person.

## Lightning Lessons attendee employers

Twenty-eight companies, from the Maven attendee export Krish supplied on 12 August 2026.
Rendered as a rotating strip under the Lightning Lessons.

Attendee counts in that export: **Visa 3, PwC 3, CIBC 3, and one each for the other 25.**
Those counts are recorded here and are **not published**. The strip carries logos and one
line, `Attendees from household name businesses learn with me`, which is exactly what one
attendee supports. Do not upgrade the wording to clients, customers, partners, teams
trained, companies worked with, or anything implying a commercial relationship. None of
these is a client of Mindmake.

Four of the observed email domains are not the brand's primary domain, and the marks are
sourced from the primary: BMW registered on `bmwna.com`, American Express on `aexp.com`,
Goldman Sachs on `gs.com`, LEGO on `consultant.lego.com`.

**Two things to check before this goes further.** Krish's brief said "Primary logo list:
50" above a table of 28 rows, so 22 may be missing; the site carries the 28 that were
given. And several of these companies restrict third-party use of their marks in
promotional contexts regardless of accuracy. Displaying twenty-eight corporate logos reads
as institutional endorsement to most visitors even when the caption is careful. That is
Krish's call to make, not this repo's, but it is not a call that has been made explicitly.

Marks come from Brandfetch by domain, masters in `public/files/brand logos/`. The
`theme/light` variant is the *light-coloured* asset for dark backgrounds, which is the
opposite of the CSS convention: seven brands have no dark-ink variant at all and returned
a blank placeholder the first time, so the fetch picks the darkest usable asset by
measuring ink luminance. The test suite fails if any two derivatives are identical.

## The Mindmake rename, and what is not renamed

The brand became **Mindmake** on 12 August 2026. Three things are settled and one is not.

**The domain is not live.** `mindmake.co`, `content.mindmake.co` and `ctrl.mindmake.co` had
no DNS record when the rename shipped, verified 19 August 2026; `themindmaker.ai` resolves.
So the copy renamed and the links did not. `DOMAINS_LIVE` in `src/content/site.ts` moves
every URL at once. Do not ship a mindmake.co link until `npm run links:check` passes on it.

**The contact address never changes.** `krish@themindmaker.ai`, Krish's decision, in his
words "keep it forever". It is deliberately not derived from the domain switch, and a test
pins it. If it ever looks like an oversight, it is not.

**Signal & Noise moved.** `mediaradar.com/signal-and-noise` returned 404 on 19 August 2026,
found by `npm run links:check`. The link is now `signalandnoise.ai/executive-voices`, the
owned channel page, which is also the capture source the content index records. Krish's role
is published as **Executive Host**. He describes the reality as contributing content that
originates in Mindmake and is amplified there, plus guest hosting, which is why it sits on
the secondary shelf rather than beside the Mindmake pillars.

**Plinth is dead.** Retired forever, on the banned list, do not reintroduce.

**The brand assets are complete.** The Mindmake wordmark, the mark the three arms share,
and the two Content format wordmarks all arrived 19 August 2026. The old Mindmaker icon and
the Mindmaker Live logo are deleted, so no retired brand asset ships any more.

Two things about the format wordmarks, because both are easy to get wrong again:

- **They arrived as 1200x630 canvases with about 567x136 of ink**, roughly 90% padding.
  Sized by a CSS height, that padding is what gets sized and the letters come out a third
  of the intended size. Both are cropped to their content box in `src/assets/`, which is
  the same rule every other supplied mark in this repo follows.
- **Each runs dark navy at one end and mint at the other**, so on the dark card the first
  two or three words are not there. Both sit on a light plate rather than being inverted:
  inverting would change the brand colors. The plate is 90% white rather than white, which
  is the difference between a chip and a spotlight on a dark card.

Both secondary URLs are resolved, verified 200 on 19 August 2026:

- **Full Time**, `fulltime.fm`.
- **Fractionl Circle**, `circle.fractionl.ai`, with the line
  `Surface your existing network around your next idea.` Krish, 19 August 2026. It is a
  separate product from Fractionl Pulse and serves a separate page: Pulse is market
  intelligence on fractional supply and demand, Circle is network recall. They share the
  Fractionl mark and nothing else, which is why the shelf puts them side by side.

Nothing on the portfolio is outstanding. The only open item in this file is the agent
count in the OS recording, below.

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
