# Positioning

Settled 10 and 11 August 2026. Spine and meta revised 29 August 2026. This is the spine. Changing anything here means changing
LinkedIn and mindmake.co in the same pass.

## The market

> Krish operates in content, audience and IP businesses, plus the data and identity layer
> underneath them. Media, entertainment, creator economy, publishing, adtech, telco data,
> search data.

## The spine

Settled 29 August 2026. The spine is now the LinkedIn headline itself, byte for byte,
title case and no trailing period:

> AI-Native Commercial Strategy Leader

**LinkedIn is the source of truth for this string.** When the headline moves, this moves,
and not the other way round. Defined once, in `src/content/site.ts` as `spine`. The hero
H1 is this line.

**Spelling is British throughout** (Ruling, Krish, 2026-11-07: British everywhere,
including krishraja.com; it supersedes the US spelling decided on 12 August 2026). The rule
governs every string in the content layer and his LinkedIn. The retired spines below are
quoted as they were written.

### The two retired spines. Neither returns as the primary headline.

| Retired spine | Retired | Why |
|---|---|---|
| `Sixteen years commercializing content, media and IP businesses. Now I build the AI systems that run them.` | 29 August 2026 | A sentence, not a headline. It described the past first and the AI work second, which is the wrong order for the position Krish now runs. The sixteen years and the cluster both survive, in the meta description and the bio. |
| `The AI-native commercial strategy operator.` | 29 August 2026 | Shorter-lived. It never matched the LinkedIn headline, which is the whole point of having a spine, and "operator" reads junior to the role. |

Neither may be reused as the primary headline. Both are still accurate prose and may
appear in body copy or the bio if Krish wants them there.

## The coherence rule

Three surfaces do three different jobs and should not read identically. What must never
differ is narrower than a shared sentence.

**1. The cluster, word for word.**

```
content, media and IP businesses
```

It appears on krishraja.com, in the LinkedIn headline and About, and wherever
mindmake.co describes Krish.

**2. Every number in `FACTS.md`.** A figure that differs across two surfaces is a defect.

**3. What Mindmake is:** a capped advisory practice. Not a startup, not a lab, not a
consultancy. The cap is real and it matters, because it is what makes the site honest to
a buyer and to a hirer at the same time.

Everything else varies by surface:

| Surface | What it runs |
|---|---|
| krishraja.com | The spine as the H1, identical to the LinkedIn headline |
| LinkedIn | The headline, which is the source of the spine |
| mindmake.co | Barely describes Krish at all. It sells the practice, not the person. |

## What he sells

Mindmaker, and nothing else. Everything else on krishraja.com is build work, writing or
receipts.

**No prices on this site.** Pricing lives on mindmake.co only, so there is exactly one
place to keep current.

**No geographic market claim on this site.** Krish's advisory market is the UK, but that
fact belongs on his LinkedIn profile and nowhere else. This site is international and says
nothing about where clients are. The journey section (London, Sydney, New York) is
biography, not a market claim.

## Approved meta

Applied identically to `<title>`, `meta[name=title]`, `meta[name=description]`,
`og:title`, `og:description`, `twitter:title`, `twitter:description`. Generated from
`src/content/site.ts`, never hand-edited.

Updated 13 November 2026 (Krish asked for the site to be found "in every way"). The title
adds "and Speaker", because event organisers are who the site is for, and stays at 60
characters so Google shows it whole. The description leads with his name, so an answer
engine quoting it says who it is about, and fits under Google's ~160. The receipts moved to
`llms.txt` and the structured data, where there is room. A test pins both lengths.

**Title**

```
Krish Raja: AI-Native Commercial Strategy Leader and Speaker
```

**Description**

```
Krish Raja is an AI-native commercial strategy leader, keynote speaker and founder of
Mindmake, with sixteen years growing content, media and IP businesses.
```

Retired 13 November 2026: `Krish Raja: AI-Native Commercial Strategy Leader` and the
"Sixteen years scaling commercial businesses across Microsoft, Nine Entertainment..."
description, which ran to 250 characters and was cut mid-sentence in every result.

**JSON-LD `jobTitle`**

```
AI-Native Commercial Strategy Leader, founder of Mindmake
```

**JSON-LD `description`:** the meta description above, verbatim.

**`ogImageAlt`**

```
Krish Raja, AI-native commercial strategy leader
```

**`websiteDescription`**

```
Personal website of Krish Raja, AI-native commercial strategy leader and founder of Mindmake
```

**`bio`**, which opens `public/llms.txt`

```
Krish Raja is an AI-native commercial strategy leader and the founder of Mindmake. Sixteen
years scaling commercial businesses across Microsoft, Nine Entertainment, SingTel and
Captify. He now builds the AI systems that run commercial engines in content, media and IP
businesses.
```

## Retired names. These must never return.

| Name | Why it is retired |
|---|---|
| **AI Decision Cohort** | Offer retired. The route it linked to is orphaned. |
| **Signal Session** | Offer retired, and it carried a price this site must not show. |
| **Revenue Architecture** | Offer retired, same reason. |
| **Techonomic** (as a standalone channel) | Folded into Mindmaker Live. techonomic.co no longer resolves. |
| **The Builder Economy** (as a standalone channel) | Folded into Mindmaker Live. thebuildereconomy.com returns 404. |
| **"Operator-advisor"** (as the primary self-description) | Superseded by the spine. |
| **"Sixteen years commercializing content, media and IP businesses. Now I build the AI systems that run them."** (as the primary headline) | Retired 29 Aug 2026. See The spine. |
| **"The AI-native commercial strategy operator."** (as the primary headline) | Retired 29 Aug 2026. See The spine. |
| **"Operator, not advisor"** (as a slide in the deck) | The agentic org chart deck opens with it. That slide is excluded from `deck.ts` for the same reason the phrase is retired. |
| **"Teardown"** (as an episode format name) | Collides with The Teardown, a live paid Mindmaker engagement. One word cannot mean both a free episode and a purchase on one brand. |

`npm test` fails if any of these appear in the content layer.

## The editorial channel

**Make Your Mind Up** (`https://makeyourmindup.ai`) is the single editorial channel, the
Content branch of Mindmake. It was Mindmaker Live until the 12 August 2026 rename;
Techonomic and The Builder Economy folded into it. The address moved with `DOMAINS_LIVE`
on 11 November 2026.

- Link to `site.links.content`, never the Substack URL, so the address can move again
  without touching anything but `site.ts`.
- **It has paid tiers.** It runs free, plus paid tiers. Never describe it as free. Describe
  it as the channel, link to it, and say nothing about price.

**The two formats:**

- **The Money of AI**: who is actually getting paid in a shift, and by what mechanism.
  Replaces Techonomic. Was called "Paid" until 12 August 2026.
- **Building with AI**: why someone built the thing they built, and the why beneath the
  why. Replaces The Builder Economy. Was called "Built".

**Signal and Noise** stays as its own show. It did not fold into anything.

**The channel's latest posts are on the homepage.** Since the 9 November 2026 rebuild,
the `#live` section shows four recent episodes, fetched by `api/live.js` with a fallback
in `home.ts`. This replaced the 12 August decision to link the channel without listing
its posts.

**techonomic.co and thebuildereconomy.com are being left to lapse.** Decided 12 August
2026. Neither resolves, neither is linked, and neither gets a redirect.

## How Mindmaker is described

A capped advisory practice. A small number of engagements a year, from taking one decision
apart to rebuilding how a business decides.

Not a startup. Not a lab. Not a consultancy.
