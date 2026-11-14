# The enquiry trace: what krishraja.com writes, and how to count it

> Status, 14 Nov 2026: the browser-side write described below was removed the same day. It put the database address and a publishable key in the public script. It is being rebuilt as a server-side endpoint; until then nothing on the site writes an enquiry row.

Status: Current
Added: 14 November 2026 (fleet integration audit)

The North Star is confirmed paid speaking bookings (`docs/NORTH_STAR.md`). Before
this, an enquiry left no trace: the form only writes an email in the reader's own
mail app, and the email and Calendly links are plain links. Now each of those
moments adds one row to a table Control Center can read.

## Where

Supabase project **Mindmaker OS** (`<project-ref>`), table
`public.site_enquiries`. Created by migration `site_enquiries_krishraja_com`. The
SQL is reproduced at the end of this file.

## What the page writes

`src/lib/enquiry.ts`, fire and forget, production hosts only
(`www.krishraja.com`, `krishraja.com`). Local builds, Vercel previews and
`npm run mobile:check` write nothing.

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

## The boundary

The page uses the publishable key. Row-level security allows **insert only**:
the page cannot read a row back, cannot set `status`, `booked_at` or `note`, and
cannot update or delete anything. Check constraints cap every text field and keep
`email` and `call` rows anonymous.

## How Krish marks a booking, and how to count

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

The first count is a fresh baseline from 14 November 2026, not a history: no
enquiry before that date was recorded.

Three rows are self-tests from the day the table was made (one policy test, two
production clicks), all marked `spam` with a note saying so.

## The table

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
