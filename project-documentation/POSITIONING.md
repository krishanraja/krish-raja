# Positioning

Settled 10 and 11 August 2026. This is the spine. Changing anything here means changing
LinkedIn and themindmaker.ai in the same pass.

## The market

> Krish operates in content, audience and IP businesses, plus the data and identity layer
> underneath them. Media, entertainment, creator economy, publishing, adtech, telco data,
> search data.

## The spine sentence

This exact sentence also appears on his LinkedIn and must not drift:

> Sixteen years commercializing content, media and IP businesses. Now I build the AI
> systems that run them.

**Spelling is US throughout, decided 12 August 2026.** That includes this sentence, which
changed from `commercialising`. **LinkedIn must carry the US spelling too**, or the one
string that is supposed to be identical across surfaces is not.

Defined once, in `src/content/site.ts` as `spine`. The hero H1 is this sentence.

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
| krishraja.com | The full spine sentence as the H1 |
| LinkedIn | A compressed variant, because the headline is 220 characters |
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

**Title**

```
Krish Raja: commercial leader for content, media and IP businesses
```

**Description**

```
Sixteen years commercializing content, media and IP businesses. $9M to $61M at Nine, $0
to $12M ARR at Captify, $4M to $38M at SingTel. Now running Mindmaker OS, a 14-agent AI
operating system in production.
```

**JSON-LD `jobTitle`**

```
Commercial leader and founder of Mindmaker
```

**JSON-LD `description`:** the meta description above, verbatim.

## Retired names. These must never return.

| Name | Why it is retired |
|---|---|
| **AI Decision Cohort** | Offer retired. The route it linked to is orphaned. |
| **Signal Session** | Offer retired, and it carried a price this site must not show. |
| **Revenue Architecture** | Offer retired, same reason. |
| **Techonomic** (as a standalone channel) | Folded into Mindmaker Live. techonomic.co no longer resolves. |
| **The Builder Economy** (as a standalone channel) | Folded into Mindmaker Live. thebuildereconomy.com returns 404. |
| **"Operator-advisor"** (as the primary self-description) | Superseded by the spine sentence. |
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

## How Mindmaker is described

A capped advisory practice. A small number of engagements a year, from taking one decision
apart to rebuilding how a business decides.

Not a startup. Not a lab. Not a consultancy.
