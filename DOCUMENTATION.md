# Krish Raja — Personal Portfolio Site
## Complete Project Documentation

> **Purpose**: Enable precise replication of this project on any platform. Every architecture decision, content choice, design token, and integration is documented below.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & File Structure](#3-architecture--file-structure)
4. [Design System](#4-design-system)
5. [Component Breakdown](#5-component-breakdown)
6. [Content & Copy](#6-content--copy)
7. [SEO & Discoverability](#7-seo--discoverability)
8. [Backend & Integrations](#8-backend--integrations)
9. [Assets & Media](#9-assets--media)
10. [Responsive & Mobile Strategy](#10-responsive--mobile-strategy)
11. [Dark Mode Implementation](#11-dark-mode-implementation)
12. [Performance Optimizations](#12-performance-optimizations)
13. [Deployment & Infrastructure](#13-deployment--infrastructure)
14. [Replication Checklist](#14-replication-checklist)

---

## 1. Project Overview

**What it is**: A single-page personal portfolio website for Krish Raja — an AI product builder, educator, and revenue leader. The site positions him as a high-growth commercial leader for the AI age while showcasing 13 live ventures, educational offerings, writing, and proof points.

**Live URLs**:
- Published: `https://krish-raja.lovable.app`
- Custom domain: `https://www.krishraja.com`

**Core narrative**: "I build with AI and help others to." The site subtly signals enterprise-grade revenue leadership without explicitly stating it, through content framing (AI-Native Revenue, Enterprise GTM engines) and proof points (7x growth, M&A guidance, 18-person teams).

**Single-page sections** (in order):
1. Hero — Profile picture, tagline, CTAs
2. Live Portfolio — 13 ventures across Advisor/Builder/Creator tabs
3. Philosophy — 4 leadership principles
4. Learn With Me — Cohort course + free lightning lessons
5. Writing & Media — Interviews, podcasts, whitepapers
6. Work (ProofPoints) — Achievements, credentials, global journey, company logos
7. Contact — Form with email integration
8. Footer

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^18.3.1 |
| Build tool | Vite | ^5.4.19 |
| Language | TypeScript | ^5.8.3 |
| Styling | Tailwind CSS | ^3.4.17 |
| Component library | shadcn/ui (Radix primitives) | Various |
| Routing | React Router DOM | ^6.30.1 |
| Forms | React Hook Form + Zod | ^7.62.0 / ^4.1.9 |
| State/Data | TanStack React Query | ^5.83.0 |
| Icons | Lucide React | ^0.462.0 |
| Font | Inter (self-hosted via @fontsource) | ^5.2.8 |
| Carousel | Embla Carousel React | ^8.6.0 |
| Backend | Supabase (DB + Edge Functions) | ^2.57.4 |
| Email | Resend (via Edge Function) | 2.0.0 |
| Toast | Sonner + Radix Toast | ^1.7.4 |

### Dev Dependencies
- `@vitejs/plugin-react-swc` — Fast SWC-based React transforms
- `tailwindcss-animate` — Animation utilities for Tailwind
- `lovable-tagger` — Dev-only component tagging (Lovable platform)
- `autoprefixer`, `postcss` — CSS processing

### Path Aliases
```ts
// vite.config.ts
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
```

---

## 3. Architecture & File Structure

```
├── public/
│   ├── favicon.ico, favicon.png, favicon-16x16.png, favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── og-image.png              # 1200x630 Open Graph image
│   ├── site.webmanifest          # PWA manifest
│   ├── robots.txt                # Comprehensive bot allowlist
│   ├── sitemap.xml               # Single-URL sitemap
│   ├── llms.txt                  # AI/LLM-readable profile
│   ├── mindmaker-logo.png
│   └── placeholder.svg
│
├── src/
│   ├── main.tsx                  # Entry: loads Inter font weights + App
│   ├── App.tsx                   # Provider tree: QueryClient → ThemeProvider → Router
│   ├── App.css                   # (empty/minimal)
│   ├── index.css                 # FULL DESIGN SYSTEM (tokens, utilities, animations)
│   │
│   ├── assets/                   # All images (imported as ES6 modules)
│   │   ├── krish_bitmoji.jpg     # Profile cartoon (front of flip)
│   │   ├── krish-headshot.jpg    # Profile photo (back of flip)
│   │   ├── *-icon.png            # Portfolio venture icons
│   │   ├── *-logo.png            # Company/brand logos
│   │   ├── *-optimized.webp      # WebP versions of media images
│   │   └── *.png/jpg             # Course images, writing images
│   │
│   ├── components/
│   │   ├── Navigation.tsx        # Fixed nav with scroll blur, mobile hamburger
│   │   ├── Hero.tsx              # Profile flip, tagline, CTAs, grid background
│   │   ├── LivePortfolio.tsx     # 13 ventures in 3 tabs (Advisor/Builder/Creator)
│   │   ├── Philosophy.tsx        # 4 principle cards
│   │   ├── LearnWithMe.tsx       # Featured cohort + lightning lessons
│   │   ├── Work.tsx              # Writing & media with dialog previews
│   │   ├── ProofPoints.tsx       # Achievements, credentials, journey, logo ticker
│   │   ├── Contact.tsx           # Form → Supabase Edge Function → Resend
│   │   ├── Footer.tsx            # Links, copyright, location
│   │   ├── AnimatedProfilePicture.tsx  # 3D flip card (bitmoji ↔ headshot)
│   │   ├── WorkWithMeMenu.tsx    # CTA popover (desktop) / drawer (mobile)
│   │   ├── ThemeProvider.tsx      # Light/dark/system theme context
│   │   ├── ThemeToggle.tsx        # Sun/moon toggle button
│   │   └── ui/                    # shadcn/ui components (accordion, button, card, etc.)
│   │       └── mobile-carousel.tsx  # Custom: desktop=grid, mobile=embla carousel
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx        # `useIsMobile()` — breakpoint at 768px
│   │   └── use-toast.ts          # Toast hook
│   │
│   ├── integrations/supabase/
│   │   ├── client.ts             # Supabase client init (anon key)
│   │   └── types.ts              # Auto-generated DB types
│   │
│   ├── lib/utils.ts              # `cn()` utility (clsx + tailwind-merge)
│   │
│   └── pages/
│       ├── Index.tsx              # Main page: assembles all sections + scroll observer
│       └── NotFound.tsx           # 404 page
│
├── supabase/
│   ├── config.toml               # Supabase project config
│   └── functions/
│       └── send-contact-email/
│           └── index.ts          # Deno Edge Function: stores in DB + sends emails via Resend
│
├── .env                          # VITE_SUPABASE_* environment variables
├── index.html                    # HTML shell with full SEO meta + JSON-LD
├── tailwind.config.ts            # Extended Tailwind config
├── vite.config.ts                # Vite config with SWC + path alias
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── postcss.config.js
```

### Provider Tree (App.tsx)
```
QueryClientProvider
  └── ThemeProvider (defaultTheme="light", storageKey="krish-raja-theme")
      └── TooltipProvider
          ├── Toaster (Radix)
          ├── Sonner
          └── BrowserRouter
              └── Routes
                  ├── "/" → Index
                  └── "*" → NotFound
```

---

## 4. Design System

### Color Tokens (HSL, defined in `index.css`)

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--background` | `0 0% 98%` | `0 0% 6.7%` |
| `--foreground` | `0 0% 6.7%` | `0 0% 98%` |
| `--card` | `0 0% 100%` | `0 0% 8%` |
| `--primary` | `221 100% 58%` | `221 100% 58%` (same) |
| `--primary-foreground` | `0 0% 100%` | `0 0% 100%` |
| `--secondary` | `0 0% 96%` | `0 0% 12%` |
| `--muted` | `0 0% 96%` | `0 0% 12%` |
| `--muted-foreground` | `0 0% 45%` | `0 0% 60%` |
| `--border` | `0 0% 90%` | `0 0% 15%` |
| `--destructive` | `0 84% 60%` | `0 84% 60%` |
| `--ring` | `221 100% 58%` | `221 100% 58%` |
| `--radius` | `0.5rem` | `0.5rem` |

**Primary color**: Blue (`hsl(221 100% 58%)` ≈ `#1A6AFF`) — consistent across light/dark.

### Typography
- **Font**: Inter (self-hosted via `@fontsource/inter`, weights 400/500/600/700)
- **Display font**: `var(--font-display)` = Inter
- **Body font**: `var(--font-body)` = Inter
- **Headings**: `font-weight: 600`, `letter-spacing: -0.025em`, `line-height: 1.2`
- **Body**: `line-height: 1.6`

### Typography Utility Classes
| Class | Styles |
|-------|--------|
| `.headline-xl` | `text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight` |
| `.headline-lg` | `text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight` |
| `.headline-md` | `text-2xl md:text-3xl font-semibold tracking-tight` |
| `.body-lg` | `text-lg md:text-xl leading-relaxed` |
| `.body-md` | `text-base md:text-lg leading-relaxed` |

### Spacing & Layout
- **Section padding**: `clamp(4rem, 8vw, 8rem)` via `var(--section-padding)`
- **Content width**: `1200px` via `var(--content-width)`
- **Container**: `.container-width` = `max-width: var(--content-width); margin: 0 auto; padding: 0 1.5rem;`

### Shadows
| Token | Value |
|-------|-------|
| `--shadow-subtle` | `0 1px 3px hsl(var(--foreground) / 0.1)` |
| `--shadow-medium` | `0 4px 12px hsl(var(--foreground) / 0.1)` |
| `--shadow-large` | `0 12px 40px hsl(var(--foreground) / 0.15)` |

### Gradients
- `--gradient-primary`: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))`
- `--gradient-subtle`: `linear-gradient(180deg, hsl(var(--background)), hsl(var(--muted)))`

### Animation Tokens
- `--transition-smooth`: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-bounce`: `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Carousel Height System
Fixed heights for mobile carousel uniformity (CSS custom properties):
```
--carousel-xs: 180px    --carousel-lg: 440px    --carousel-3xl: 680px
--carousel-sm: 280px    --carousel-xl: 520px    --carousel-4xl: 760px
--carousel-md: 360px    --carousel-2xl: 600px   --carousel-5xl: 840px
```
Mapped to Tailwind via `h-carousel-*` and `min-h-carousel-*` utilities in `tailwind.config.ts`.

### Custom Animations
| Animation | Definition |
|-----------|-----------|
| `fade-in-up` | `opacity: 0 → 1`, `translateY(20px → 0)`, `0.6s ease-out` |
| `scroll` | `translateX(0 → -50%)` — infinite logo ticker |
| `accordion-down/up` | Radix accordion height transitions |

### Accessibility
- `.skip-link`: Hidden skip-to-main link, visible on focus
- `*:focus-visible`: `ring-2 ring-ring ring-offset-2`
- `prefers-reduced-motion`: All animations reduced to `0.01ms`

---

## 5. Component Breakdown

### 5.1 Navigation (`Navigation.tsx`)
- **Behavior**: Fixed top bar. Transparent on top, blur background (`bg-background/95 backdrop-blur-sm`) after 50px scroll.
- **Desktop** (≥1024px/`lg`): Horizontal links + ThemeToggle + WorkWithMeMenu
- **Mobile** (<1024px): Hamburger menu (X/Menu icons) + ThemeToggle + WorkWithMeMenu inline
- **Nav items**: Portfolio, Philosophy, Learn, Writing, Background, Contact
- **Skip link**: `<a href="#main">Skip to main content</a>`

### 5.2 Hero (`Hero.tsx`)
- **Profile picture**: `AnimatedProfilePicture` — 3D CSS flip card (128×128px)
  - Front: `krish_bitmoji.jpg` (cartoon)
  - Back: `krish-headshot.jpg` (photo)
  - Click to flip. Pulsing ring until first interaction. "Tap me" hint on desktop.
  - CSS: `perspective: 1000px`, `transform: rotateY(180deg)`, `backfaceVisibility: hidden`
- **H1**: `I <span class="text-primary">build with AI</span> and help others to.`
- **Subtitle**: "Builder-in-action running 8 live products. 16 years scaling businesses across 3 continents. My mission: help humans and businesses use data + AI to become self-reliant and value-creating."
- **Location badge**: Pulsing green dot + "Based in Brooklyn, NY"
- **CTAs**: "Explore My Portfolio" (→ `#portfolio`) + "LinkedIn" (external)
- **Background**: Subtle CSS grid pattern (SVG, 5% opacity) + gradient overlay

### 5.3 Live Portfolio (`LivePortfolio.tsx`)
- **3 tabs** using Radix Tabs: Advisor, Builder, Creator
- **Tab styling**: Pill-shaped (`rounded-full`), active state = primary color
- **Tab icons**: Briefcase, Rocket, Mic

#### Advisor Tab (3 ventures)
| Name | Description | Role | URL |
|------|------------|------|-----|
| Mindmaker | Helping leaders create their new personal working style alongside AI | CEO & Founder | themindmaker.ai |
| Meliora | GenAI transformation for telco, media and entertainment businesses | Associate | meliora.company |
| AdFixus | Customer Identity and data infrastructure transformation for media enterprise | Fractional SVP: Enterprise | adfixus.com |

#### Builder Tab (6 ventures)
| Name | Description | Role | Flags |
|------|------------|------|-------|
| WellWell | Ancient Stoic philosophy for the modern workplace | Full-Stack Founder | Mobile-only, Beta |
| Conclusiv | From research to stunning business case in 60 seconds | Full-Stack Founder | Beta |
| Rinoa | Creating AI singers that jam with you to increase creativity | Advisor: GTM | — |
| Ritual | Helping partners to re-love one another with thoughtful weekly moments | Full-Stack Founder | Mobile-only, Beta |
| Swaami | Find neighbourhood locals willing to help you out for free | Full-Stack Founder | Mobile-only, Beta |
| Lockstep | Arrange group events without any anxiety or chasing | Full-Stack Founder | Mobile-only, Beta |

#### Creator Tab (4 ventures)
| Name | Description | Role | URL |
|------|------------|------|-----|
| The Builder Economy | Conversations with leaders building with AI | Host | thebuildereconomy.com |
| Techonomic | Strategic insights on AI, data commercialization, and revenue growth for executives | Writer | techonomic.co |
| Mindmaker Live | Live learnings and real-time insights from my journey as an AI-native builder | Host | live.themindmaker.ai |
| Signal & Noise | Conversations with world-class media operators exploring how AI is reshaping the industry | AI Host | mediaradar.com/signal-and-noise |

**Card behavior**:
- Desktop: 2-col or 3-col grid
- Mobile: Horizontal scroll carousel (280px wide cards, snap)
- Beta badge: Amber pill
- Mobile-only warning: Smartphone icon + tooltip
- **Dark mode logo fix**: Techonomic and Signal & Noise logos get `dark:brightness-200 dark:invert` (the `isLargerLogo` flag identifies them)

### 5.4 Philosophy (`Philosophy.tsx`)
- **Section heading**: "How I Think About Building"
- **Subtitle**: "16 years of scaling revenue across 3 continents — distilled into how I build today"
- **4 cards** (desktop: 4-col grid, mobile: carousel at `carousel-md` height):

| # | Title | Icon | Description | Points |
|---|-------|------|-------------|--------|
| 1 | Build in Public | `Rocket` | Ship fast, learn openly, compound knowledge. Every system failure gets encoded so it never repeats across the next project. | Learnings carry across projects · AI memory webs compound over time · One failure prevents the next · Momentum through iteration |
| 2 | AI as Co-Founder | `Bot` | I don't just use AI — I build with it. Voice clones, video agents, memory webs, autonomous researchers, and API-connected assistants. | Voice & video clones in production · Memory structures across agents · AI ghostwriters & researchers · Human judgment, machine scale |
| 3 | One Flywheel | `RefreshCw` | Building, advising, and creating are parts of one engine. Each venture sharpens commercial instinct and compounds into the next. | Every venture feeds the whole · Advising sharpens go-to-market · Creating attracts enterprise opportunities · Modular ecosystem, singular focus |
| 4 | AI-Native Revenue | `Target` | Enterprise GTM engines powered by AI — automated pipelines, intelligent outreach, and scalable commercial systems that drive high-growth revenue. | AI-native GTM engines at scale · Automated research & outreach pipelines · Revenue systems, not just strategy · Enterprise-grade commercial infrastructure |

**Design intent**: Card 4 ("AI-Native Revenue") is the subtle CRO/commercial leader signal.

### 5.5 Learn With Me (`LearnWithMe.tsx`)
**Featured cohort** (large card with image):
- Title: "AI Literacy-to-Strategy for Leaders"
- Duration: 4 weeks
- Link: Maven course page
- Outcomes: Build personal AI toolkit, Develop org-wide AI strategy, Lead AI transformation, Create measurable business impact

**Lightning Lessons** (3 free cards):
1. "Learn To Program Your AI" — Master prompt engineering
2. "Build In Public" — Use Gen AI as your co-founder
3. "Vibe Code Your Way to Income" — Turn ideas into products

Desktop: 3-col grid. Mobile: carousel at `carousel-lg` height.

### 5.6 Writing & Media (`Work.tsx`)
4 items with Dialog previews:
1. **"Zero to Multi-Million ARR: Scaling APAC"** — Interview (YouTube)
2. **"My Take on AI in Media"** — Podcast (Spotify)
3. **"The Business Case for AI Literacy"** — Whitepaper (DocSend)
4. **"Predicting the Future of Haptic Design"** — Master's Thesis

Cards show image with gradient overlay. Media types (Interview/Podcast) show a play button overlay. Clicking opens a Dialog with full description + action button.

### 5.7 Proof Points (`ProofPoints.tsx`)
**Key Achievements** (4 cards):
- 7x Growth (Revenue Growth) — Major Media Broadcaster
- Zero-to-Millions (Market Creation) — AdTech APAC Launch
- 18-Person Team (Team Building) — Cross-functional org
- M&A Guidance (Strategic Advisory) — Portfolio transformations

**Recognition & Credentials** (badges):
- Former 30-Under-30
- Harvard Business School (Executive Programs)
- Sydney Opera House Keynote Speaker
- Published Author, Speaker & Writer
- Ex-Microsoft Automation Specialist
- First Global Automated Media Campaigns (2010)

**Global Journey** (3 location cards):
- London (2008-2013): Technical Foundation
- Sydney (2013-2024): AdTech Scale & Leadership
- New York (2024-Present): AI Strategy & Advisory

**Company Logo Ticker**: Nine, McCann, Captify, Singtel, BBC, Microsoft — infinite horizontal scroll, grayscale → color on hover.

### 5.8 Contact (`Contact.tsx`)
- Form fields: Name, Email, Service Type (dropdown), Message
- Validation: Zod schema (min lengths, email format)
- Submission: `supabase.functions.invoke('send-contact-email', { body: data })`
- Success state: Green checkmark + "Message Sent!" + "Send Another Message" button
- Service types: AI Strategy & Advisory, Executive Workshop, Strategic Coaching, Speaking Engagement

### 5.9 WorkWithMeMenu (`WorkWithMeMenu.tsx`)
Persistent CTA button in navigation. Desktop: Popover. Mobile: Drawer.

4 options:
1. **Join Cohort** — Maven course (green gradient icon)
2. **Mindmaker** — AI advisor (custom icon image)
3. **Builder Economy** — Content about building with AI (teal gradient icon)
4. **Email Me** — `mailto:hello@krishraja.com` (cyan gradient icon)

### 5.10 Footer (`Footer.tsx`)
- Logo/name link to `#hero`
- Tagline: "Turn AI literacy into AI strategy and revenue."
- Nav links (different set from header)
- LinkedIn icon button
- Copyright + "Brooklyn, New York"

---

## 6. Content & Copy

### Brand Voice
- **Tone**: Confident, concise, action-oriented. Not boastful — let proof points speak.
- **Positioning**: "High-growth revenue leader for the AI age" (never stated explicitly)
- **Key phrase**: "I build with AI and help others to."

### Key Numbers
- 8 live products (mentioned in hero)
- 13 ventures total (mentioned in portfolio section subtitle)
- 16 years experience
- 3 continents
- 7x revenue growth
- 18-person team

### Contact Info
- Email: `hello@krishraja.com`
- Phone: `+1-347-665-8225`
- Location: Brooklyn, NY
- LinkedIn: `linkedin.com/in/krish-raja`
- Newsletter: `techonomic.substack.com`

---

## 7. SEO & Discoverability

### HTML Meta (index.html)
- **Title**: "Krish Raja - AI Product Builder | 8 Live Products, Forbes 30 Under 30"
- **Description**: "Krish Raja builds AI products and teaches AI literacy. Running 8 live products, 16 years scaling businesses. Forbes 30 Under 30. Brooklyn-based entrepreneur."
- **Canonical**: `https://www.krishraja.com/`
- **Robots**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- **Geographic**: geo.region=US-NY, geo.placename=Brooklyn, geo.position=40.6782;-73.9442

### Open Graph
- Type: `profile`
- Image: `og-image.png` (1200×630)
- Profile: first_name=Krish, last_name=Raja

### Twitter Card
- Type: `summary_large_image`
- Creator: `@krishraja`

### JSON-LD Structured Data (3 blocks in index.html)
1. **Person** — Full profile with occupation, alumni, awards, knowsAbout
2. **WebSite** — Site name, publisher reference
3. **ProfessionalService** — Service types, price range

### Additional JSON-LD (Index.tsx, runtime)
- Duplicate Person schema injected via `useEffect` (for SPA compatibility)

### robots.txt
Comprehensive allowlist for: Googlebot, Bingbot, DuckDuckBot, social crawlers (Twitter, Facebook, LinkedIn, Pinterest, Slack, WhatsApp), and AI crawlers (GPTBot, ChatGPT-User, Google-Extended, Claude-Web, Anthropic-AI, PerplexityBot, Applebot, cohere-ai, CCBot).

### sitemap.xml
Single URL: `https://www.krishraja.com/` with image reference to og-image.png.

### llms.txt
Plain-text profile for AI/LLM crawlers with structured information about who Krish is, what he does, expertise areas, and contact info.

### PWA Manifest (site.webmanifest)
- Theme color: `#0066FF`
- Display: standalone
- Icons: 32x32, 180x180, 512x512

---

## 8. Backend & Integrations

### Supabase
- **Project ID**: `bkyuxvschuwngtcdhsyg`
- **URL**: `https://bkyuxvschuwngtcdhsyg.supabase.co`
- **Client**: Initialized in `src/integrations/supabase/client.ts` with anon key

### Edge Function: `send-contact-email`
**Runtime**: Deno (Supabase Edge Functions)
**Dependencies**: `resend@2.0.0`, `@supabase/supabase-js@2.57.4`

**Flow**:
1. Receives POST with `{ name, email, serviceType, message }`
2. Stores in `booking_requests` table (status: pending, priority: medium)
3. Sends confirmation email to visitor via Resend (from `hello@krishraja.com`)
4. Sends notification email to admin (`hello@krishraja.com`)
5. Returns `{ success, bookingId }`

**Required secrets** (Supabase Edge Function environment):
- `RESEND_API_KEY` — Resend API key
- `SUPABASE_URL` — Auto-provided
- `SUPABASE_SERVICE_ROLE_KEY` — Auto-provided

**Email domain**: `krishraja.com` (configured in Resend for sending from `hello@krishraja.com`)

### Database Tables Used
- `booking_requests` — Stores contact form submissions

---

## 9. Assets & Media

### Profile Images
| File | Purpose | Used In |
|------|---------|---------|
| `krish_bitmoji.jpg` | Cartoon avatar (flip front) | AnimatedProfilePicture |
| `krish-headshot.jpg` | Photo (flip back) | AnimatedProfilePicture |

### Portfolio Venture Icons
All PNG, imported as ES6 modules:
`mindmaker-icon.png`, `builder-economy-icon.png`, `wellwell-icon.png`, `conclusiv-icon.png`, `rinoa-icon.png`, `ritual-icon.png`, `swaami-icon.png`, `lockstep-icon.png`, `meliora-icon.png`, `adfixus-icon.png`, `techonomic-logo.png`, `signal-and-noise-logo.png`

### CTA Icon
`mindmaker-cta-icon.png` — Used in WorkWithMeMenu

### Course Images
`literacy-to-strategy.jpg`, `learn-program-ai.png`, `build-in-public.png`, `vibe-code-income.png`

### Writing/Media Images (WebP optimized)
`ai-literacy-whitepaper-optimized.webp`, `masters-thesis-optimized.webp`, `podcast-tile-optimized.webp`, `give-it-a-nudge-optimized.webp`

### Company Logos
`nine_logo.png`, `mccann_logo.png`, `captify_logo.png`, `singtel_logo.png`, `bbc_logo.png`, `microsoft_logo.png`

### Public Assets
`favicon.ico`, `favicon.png`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `og-image.png`, `mindmaker-logo.png`

---

## 10. Responsive & Mobile Strategy

### Breakpoints
- Mobile: `<768px` (detected via `useIsMobile()` hook using `matchMedia`)
- Tablet/Desktop: `≥768px`
- Large desktop nav: `≥1024px` (`lg:` breakpoint for nav layout)

### Mobile Patterns
1. **MobileCarousel** (`src/components/ui/mobile-carousel.tsx`): Universal component that renders as grid on desktop and Embla carousel on mobile. Supports uniform heights, dot indicators, drag-free scrolling.
2. **Horizontal scroll**: Portfolio cards use native horizontal scroll on mobile (280px cards, snap)
3. **Drawer vs Popover**: WorkWithMeMenu uses Vaul Drawer on mobile, Radix Popover on desktop
4. **Responsive typography**: All headline classes scale (`text-3xl md:text-4xl lg:text-5xl`)
5. **Stacked layouts**: Grid columns collapse (`grid-cols-2 lg:grid-cols-3` → single column)

---

## 11. Dark Mode Implementation

### Theme System
- **Provider**: Custom `ThemeProvider` using React Context
- **Storage**: `localStorage` key `"krish-raja-theme"`
- **Default**: `light`
- **Toggle**: `ThemeToggle` button (Sun/Moon icons)
- **Mechanism**: Adds `dark` class to `<html>` element, Tailwind `darkMode: ["class"]`

### Dark Mode Gotchas
- **Logo visibility**: Techonomic and Signal & Noise logos are dark-colored and nearly invisible on dark backgrounds. Fix: `dark:brightness-200 dark:invert` applied when `isLargerLogo === true`.
- **General logo treatment**: All portfolio logos get `dark:brightness-110 dark:contrast-105` by default.
- **Logo containers**: Wrapped in subtle frosted glass (`bg-white/0 dark:bg-white/10 backdrop-blur-[2px]`).
- **Shadow tokens**: Dark mode uses stronger shadow values (`hsl(0 0% 0% / 0.3-0.6)`).

---

## 12. Performance Optimizations

### Image Preloading
Every section with images preloads them on mount using `new Image()`:
- `AnimatedProfilePicture`: Profile images
- `LivePortfolio`: All 12 venture icons
- `LearnWithMe`: All 4 course images
- `Work`: All 4 media images
- `ProofPoints`: All 6 company logos
- `WorkWithMeMenu`: CTA icon

### Image Attributes
All images use: `loading="eager"`, `decoding="async"`, `fetchPriority="high"`

### Font Loading
Inter is self-hosted via `@fontsource/inter` (not Google Fonts CDN) for:
- No external network dependency
- Faster loading on restrictive networks
- Weights loaded: 400, 500, 600, 700

### Scroll Animation
- `IntersectionObserver` in `Index.tsx` adds `.animate` class to `.fade-in-up` elements
- Threshold: 0.1, rootMargin: `0px 0px -50px 0px`

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13. Deployment & Infrastructure

### Lovable Platform
- Built and deployed via Lovable
- Preview URL: `https://id-preview--eb53690d-c2b6-480e-a3fd-776edca05e82.lovable.app`
- Published URL: `https://krish-raja.lovable.app`
- Custom domain: `https://www.krishraja.com`

### Environment Variables
```env
VITE_SUPABASE_PROJECT_ID="bkyuxvschuwngtcdhsyg"
VITE_SUPABASE_PUBLISHABLE_KEY="<anon key>"
VITE_SUPABASE_URL="https://bkyuxvschuwngtcdhsyg.supabase.co"
```

### Supabase Edge Function Secrets
- `RESEND_API_KEY` — Must be set in Supabase dashboard

### To Self-Host
1. Clone repo
2. `npm install` or `bun install`
3. Set `.env` with your own Supabase credentials
4. Deploy Edge Function: `supabase functions deploy send-contact-email`
5. Set `RESEND_API_KEY` secret: `supabase secrets set RESEND_API_KEY=<key>`
6. Configure Resend domain for your email
7. `npm run build` → deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages)

---

## 14. Replication Checklist

### Prerequisites
- [ ] Node.js ≥18 or Bun
- [ ] Supabase project (for contact form)
- [ ] Resend account (for transactional email)
- [ ] Custom domain (optional)

### Setup Steps
1. [ ] Initialize project: `npm create vite@latest -- --template react-ts`
2. [ ] Install all dependencies from `package.json`
3. [ ] Configure Tailwind CSS with the exact `tailwind.config.ts`
4. [ ] Copy `index.css` design system tokens verbatim
5. [ ] Set up path alias (`@` → `src/`) in `vite.config.ts` and `tsconfig.json`
6. [ ] Install shadcn/ui components (button, card, tabs, dialog, badge, tooltip, popover, drawer, carousel, toast, form, etc.)
7. [ ] Copy all asset files to `src/assets/`
8. [ ] Copy all public files (favicons, og-image, robots.txt, sitemap.xml, llms.txt, site.webmanifest)
9. [ ] Create all components following the structure above
10. [ ] Set up Supabase project with `booking_requests` table
11. [ ] Deploy `send-contact-email` Edge Function
12. [ ] Configure Resend with sending domain
13. [ ] Set environment variables
14. [ ] Update all URLs in SEO meta, sitemap, canonical tags
15. [ ] Update all personal content (name, bio, ventures, images)
16. [ ] Test light/dark mode
17. [ ] Test mobile responsive layout
18. [ ] Test contact form end-to-end
19. [ ] Deploy

### Content to Customize
- All text copy (hero, philosophy, proof points, etc.)
- All venture/business data in LivePortfolio
- Course links and descriptions in LearnWithMe
- Writing/media items in Work
- Achievement metrics and credentials in ProofPoints
- Contact email addresses
- Social links
- SEO meta tags, JSON-LD data
- Favicon and OG image
- Profile pictures

---

*Documentation generated March 2026. Reflects the current state of the krishraja.com codebase.*
