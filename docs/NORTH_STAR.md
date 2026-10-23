# North Star

Status: Current
Owner: Krish Raja
Last verified: 2026-10-18

> By February 2027, krishraja.com is the reason event organisers book Krish: they find the talks, the rooms that changed their minds, and one way to ask.

Set by Krish on 18 October 2026. It is not reached yet. It is what every session in this repository works toward.

## The number

**Confirmed paid speaking bookings**: 12 by 22 February 2027, on a linear weekly ladder. Checkpoints: 16 Nov 2026: 3; 14 Dec 2026: 6; 11 Jan 2027: 8; 8 Feb 2027: 11; 22 Feb 2027: 12.

```yaml north-star-metric
metric: "Confirmed paid speaking bookings"
unit: count
direction: up
target: 12
deadline: 2027-02-22
ladder_shape: linear
source: "Bookings Krish confirms"
status: active
ladder:
  - [2026-10-26, 1]
  - [2026-11-02, 2]
  - [2026-11-09, 2]
  - [2026-11-16, 3]
  - [2026-11-23, 4]
  - [2026-11-30, 4]
  - [2026-12-07, 5]
  - [2026-12-14, 6]
  - [2026-12-21, 6]
  - [2026-12-28, 7]
  - [2027-01-04, 8]
  - [2027-01-11, 8]
  - [2027-01-18, 9]
  - [2027-01-25, 10]
  - [2027-02-01, 10]
  - [2027-02-08, 11]
  - [2027-02-15, 11]
  - [2027-02-22, 12]
```

Urgency (U1 to U5) is worked out every week from where the number stands against that week's target, by [the harness contract](https://github.com/krishanraja/ai-harness/blob/main/contract/north-star-metric.md). Set by Krish on 23 October 2026.

## How to use it

- Read it before any work, every session.
- Before you start, say which part of it the task moves. If the task moves nothing toward it, say so first and let Krish decide.
- Prefer the work that moves it furthest, and close each session by noting what moved.
- Only Krish changes this file. Record his ruling in the commit body as `Ruling (Krish, YYYY-MM-DD): ...`.
- When it is reached, say so and ask Krish for the next one.
