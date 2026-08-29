# Positioning

Settled 10 and 11 August 2026. Spine and meta revised 29 August 2026. This is the spine. Changing anything here means changing
LinkedIn and themindmaker.ai in the same pass.

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

**Spelling is US throughout, decided 12 August 2026.** The rule survives the change of
spine and still governs every other string in the content layer.

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
themindmaker.ai describes Krish.

**2. Every number in `FACTS.md`.** A figure that differs across two surfaces is a defect.

**3. What Mindmaker is:** a capped advisory practice. Not a startup, not a lab, not a
consultancy. The cap is real and it matters, because it is what makes the site honest to
a buyer and to a hirer at the same time.

Everything else varies by surface:

| Surface | What it runs |
|---|---|
| krishraja.com | The spine as the H1, identical to the LinkedIn headline |
| LinkedIn | The headline, which is the source of the spine |
| themindmaker.ai | Barely describes Krish at all. It sells the practice, not the person. |

## What he sells

Mindmaker, and nothing else. Everything else on krishraja.com is build work, writing or
receipts.

**No prices on this site.** Pricing lives on themindmaker.ai only, so there is exactly one
place to keep current.

**No geographic market claim on this site.** Krish's advisory market is the UK, but that
fact belongs on his LinkedIn profile and nowhere else. This site is international and says
nothing about where clients are. The journey section (London, Sydney, New York) is
biography, not a market claim.

## Approved meta

Applied identically to `<title>`, `meta[name=title]`, `meta[name=description]`,
`og:title`, `og:description`, `twitter:title`, `twitter:description`. Generated from
`src/content/site.ts`, never hand-edited.

Updated 29 August 2026 with the spine.

**Title**

```
Krish Raja: AI-Native Commercial Strategy Leader
```

**Description**

```
Sixteen years scaling commercial businesses across Microsoft, Nine Entertainment, SingTel
and Captify. $9M to $61M at Nine, $0 to $12M ARR at Captify, $4M to $38M at SingTel. Now
running Mindmake OS, a 14-agent AI operating system in production.
```

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

**Mindmaker Live** is the single editorial channel. Techonomic and The Builder Economy
have folded into it.

- Link to `https://live.themindmaker.ai`, never the Substack URL, so the redirect can be
  repointed later without touching this repo.
- **It has paid tiers.** It runs free, plus paid tiers. Never describe it as free. Describe
  it as the channel, link to it, and say nothing about price.

**The two formats:**

- **Built**: why someone built the thing they built, and the why beneath the why.
  Replaces The Builder Economy.
- **Paid**: who is actually getting paid in a shift, and by what mechanism.
  Replaces Techonomic.

**Signal and Noise** stays as its own show and remains in the portfolio. It did not fold
into anything.

**The channel is linked, its posts are not listed.** Decided 12 August 2026. The site links
to Mindmaker Live from the hero and the portfolio, and that is all. There is no feed of
posts, because the site already carries enough content and Krish is relaunching the
channel. Do not add one back.

**techonomic.co and thebuildereconomy.com are being left to lapse.** Decided 12 August
2026. Neither resolves, neither is linked, and neither gets a redirect.

## How Mindmaker is described

A capped advisory practice. A small number of engagements a year, from taking one decision
apart to rebuilding how a business decides.

Not a startup. Not a lab. Not a consultancy.
