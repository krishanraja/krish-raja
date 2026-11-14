# The enquiry trace: what krishraja.com records, and how to count it

Status: Current
Added: 14 November 2026 (fleet integration audit). Rebuilt server-side the same day.

The North Star is confirmed paid speaking bookings (`docs/NORTH_STAR.md`). An
enquiry used to leave no trace: the form only writes an email in the reader's own
mail app, and the email and Calendly links are plain links. Now each of those
moments becomes one row in a table Control Center can read.

The first version wrote to the database from the browser, which put the database
address and a publishable key in the public script for most of an hour on
14 November 2026. It was removed (#37). The page now knows only `/api/enquiry`,
and the build fails if its script mentions a database, a key prefix, a JWT or a
server variable (`scripts/public-script-guard.ts`, run by `vite.config.ts`).

## The path

1. **The page** (`src/lib/enquiry.ts`) posts a small JSON row, same origin, to
   `/api/enquiry`. Fire and forget, production hosts only, so local builds,
   previews and `npm run mobile:check` post nothing.
2. **The endpoint** (`api/enquiry.js`, a Vercel function beside `api/live.js`)
   accepts POST from `https://www.krishraja.com` and `https://krishraja.com`
   only, validates the kind and every field, keeps `email` and `call` rows
   anonymous, and rate-limits each client IP (20 rows an hour, at most 5
   enquiries, per warm instance).
3. **It forwards** the validated row, as the same JSON, in a POST with an
   `Authorization: Bearer` header to a Control Center route. Control Center
   stores it and puts the enquiry in Krish's Pipeline. No database address or
   key lives in this project.

   **The route** is `POST /api/site/enquiry` on Control Center (control-center
   PR 807), **live since about 13:00 UTC on 14 November 2026**. It accepts this body exactly as
   sent and answers `202 { ok, id, repeat }`, `400` on shape, `401` on the bearer,
   or `503` while Control Center holds no bearer, and keeps only the bearer's
   sha256. Without a `request_id` (an optional field this site does not send),
   the same content within 10 minutes is one row, so a double click is counted
   once. Control Center set both variables below and proved the path with one
   test enquiry (event "TEST Control Center route check"): `204` with
   `x-enquiry-recorded: yes`, the row landed, and it is marked test and spam,
   so it never counts. Status then moves by Krish's presses: Clear sets
   `replied`, Purge sets `declined`, and `booked` is his tap.

The endpoint reads its upstream from two server environment variables, set in
the Vercel project for Production:

| variable | holds |
|---|---|
| `ENQUIRY_FORWARD_URL` | the Control Center route that receives the row |
| `ENQUIRY_FORWARD_BEARER` | a bearer that allows only that one write |

Neither has a `VITE_` prefix, so neither can reach the script. **While either is
unset, the endpoint validates and answers `204` with `x-enquiry-recorded: no`,
and forwards nothing.** Both are set in Production as of 14 November 2026, so a
real enquiry answers `x-enquiry-recorded: yes`. A `502` means the forward was
refused or unreachable; the function logs only the status.

The row it forwards:

| kind | when | personal fields |
|---|---|---|
| `enquiry` | the speaking form is completed and the email written | `name`, `event`, `event_when`, `message`, exactly as typed |
| `email` | a `mailto:` link to the published address is opened, or the address is copied | none |
| `call` | a link to the Calendly booking page is opened | none |

Every row also carries `placement` (the section id the link sat in, `ask-form`,
or `copy`), `landing` (the path the visitor arrived on, e.g. `/lessons`) and
`referrer_host` (the external host only, never a full URL).

`email` and `call` are intents. Someone can open the mail app and never send, so
they are a ceiling, not a count of enquiries. An `enquiry` row is the stronger
signal: the reader wrote the email, though they may still not press send.

## Where rows end up, and how to count

The rows land in `public.site_enquiries` in the fleet Supabase (Mindmaker OS),
written by Control Center. What follows describes that table.

### How Krish marks a booking, and how to count

`status` starts `new`. Krish (or Control Center on his word) moves it through
`replied`, `booked`, `declined` or `spam`, and sets `booked_at` when a booking is
confirmed. A booking that arrived another way can be added as an `enquiry` row
with the service role.

Read with the service role:

```sql
-- the North Star number: confirmed paid speaking bookings
select count(*) from public.site_enquiries where status = 'booked';

-- the funnel, by ISO week
select date_trunc('week', created_at) as week,
       count(*) filter (where kind = 'enquiry') as enquiries,
       count(*) filter (where kind = 'call')    as call_opens,
       count(*) filter (where kind = 'email')   as email_opens,
       count(*) filter (where status = 'booked') as booked
from public.site_enquiries
where status <> 'spam'
group by 1 order by 1 desc;
```

The count is a fresh baseline from 14 November 2026, when the forward was switched on, not a history:
no enquiry before then was recorded.

Three rows are self-tests from the day the table was made (one policy test, two
production clicks), all marked `spam` with a note saying so.

### The table

```sql
create table public.site_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  site text not null default 'krishraja.com' check (site = 'krishraja.com'),
  kind text not null check (kind in ('enquiry', 'email', 'call')),
  placement text check (char_length(placement) <= 40),
  name text check (char_length(name) <= 120),
  event text check (char_length(event) <= 200),
  event_when text check (char_length(event_when) <= 200),
  message text check (char_length(message) <= 4000),
  landing text check (char_length(landing) <= 120),
  referrer_host text check (char_length(referrer_host) <= 200),
  status text not null default 'new' check (status in ('new', 'replied', 'booked', 'declined', 'spam')),
  booked_at timestamptz,
  note text,
  constraint enquiry_has_who check (kind <> 'enquiry' or (name is not null and event is not null)),
  constraint intents_are_anonymous check (kind = 'enquiry' or (name is null and event is null and event_when is null and message is null))
);
alter table public.site_enquiries enable row level security;
create policy site_enquiries_public_insert on public.site_enquiries
  for insert to anon, authenticated
  with check (status = 'new' and booked_at is null and note is null);
revoke all on public.site_enquiries from anon, authenticated;
grant insert on public.site_enquiries to anon, authenticated;
```
