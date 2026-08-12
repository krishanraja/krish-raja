/**
 * Shared shapes for the content layer.
 *
 * Everything in src/content/ is pure data. No React, no lucide, no asset
 * imports. That is deliberate: scripts/generate-static.mts and the Vitest
 * suite both import these modules under plain Node, where a .png import
 * would throw.
 *
 * Icons and images are referenced by key. Components resolve them through
 * src/lib/icon-map.ts and src/lib/asset-map.ts.
 */

/*
 * There is no Copy type any more, and no pick(). One section, one set of words.
 *
 * It existed to record drift the extraction refactor inherited: the desktop and
 * mobile trees had been written separately and a handful of headings disagreed.
 * Recording that was the right first move. Keeping the capability was not.
 * A field that can hold a different string per surface is a field that invites
 * one, and by 12 August 2026 the mobile tree carried headings and eyebrows that
 * existed nowhere else and that Krish had never written: "The operating stack",
 * "60-minute Maven sessions", "How I operate", "The OS", "The thinking".
 *
 * They were not a copy decision. They were a layout pattern, eyebrow above
 * title, filled in because the slot existed. Deleting the variant form is what
 * stops that recurring; a rule in a document would not have.
 */

/** A link that leaves the site. */
export interface ExternalLink {
  readonly label: string;
  readonly href: string;
}

/**
 * Standard section framing. Two strings, both plain, both rendered by both
 * trees.
 *
 * No `eyebrow`. It was a mobile-only label above the heading, and because no
 * desktop copy existed to fill it, all eight were invented to fill the slot.
 * A section that needs a word above its title needs a better title.
 */
export interface SectionHeader {
  readonly id: string;
  readonly title: string;
  readonly sub: string;
}

export interface TrustLogo {
  readonly asset: string;
  readonly alt: string;
}

export interface HeroContent {
  readonly status: string;
  readonly h1: string;
  readonly sub: string;
  readonly channel: ExternalLink;
  readonly primaryCta: string;
  readonly primaryHref: string;
  readonly secondaryCta: string;
  readonly secondaryHref: string;
  readonly trustLabel: string;
  readonly trustLogos: readonly TrustLogo[];
}

/**
 * One card in "How I operate".
 *
 * No badge field. The Operating System card used to carry a count chip that
 * no other card had, which made one of four look like a different component.
 * The counts live in the hero status line and the OS section instead.
 */
export interface Pillar {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}

export interface OperateContent extends SectionHeader {
  readonly pillars: readonly Pillar[];
  /** Title and steps only. The explanatory sentence was cut on 12 Aug 2026. */
  readonly flywheel: {
    readonly title: string;
    readonly points: readonly string[];
  };
}

/**
 * One recording from the operating system.
 *
 * `source` is the file under public/files/, which scripts/generate-media.mts
 * transcodes. The player reads the derivatives by convention:
 * /media/os/<id>.mp4 and /media/os/<id>.jpg. All four are portrait phone
 * captures, so they render inside a device frame.
 */
export interface OsEntry {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly source: string;
  readonly alt: string;
}

export interface OsContent extends SectionHeader {
  readonly entries: readonly OsEntry[];
}

/** One slide from a talk. Sources live in public/files/slides/. */
export interface DeckSlide {
  readonly id: string;
  readonly deck: string;
  readonly source: string;
  readonly alt: string;
}

export interface DeckSource {
  readonly id: string;
  readonly title: string;
  /** The Maven session this deck comes from, where one exists. */
  readonly href?: string;
}

export interface DeckContent extends SectionHeader {
  readonly decks: readonly DeckSource[];
  readonly slides: readonly DeckSlide[];
  readonly readerHint: string;
  readonly sessionLabel: string;
}

export type AppearanceKind = 'podcast' | 'talk' | 'press' | 'research';

/**
 * One third-party appearance, drawn from the content index at
 * public/files/content index/krish-raja-content-index.md.
 *
 * `appearanceId` ties the entry back to its record in that manifest. The test
 * suite uses it to check that the image is approved and that `href` is one of
 * the record's own source_urls, so a link cannot drift from its evidence.
 */
export interface Appearance {
  readonly appearanceId?: string;
  readonly title: string;
  readonly outlet: string;
  readonly kind: AppearanceKind;
  readonly year?: string;
  readonly href?: string;
  /** Path under public/media/. Preferred. */
  readonly media?: string;
  /** Key into src/lib/asset-map.ts, for items with no content-index record. */
  readonly asset?: string;
  readonly note?: string;
  /** True for the curated set shown before the full index is opened. */
  readonly flagship?: boolean;
}

export interface AppearancesContent extends SectionHeader {
  readonly filters: readonly { readonly id: AppearanceKind | 'all'; readonly label: string }[];
  readonly moreLabel: string;
  readonly lessLabel: string;
  readonly items: readonly Appearance[];
}

export interface PortfolioItem {
  readonly name: string;
  readonly description: string;
  readonly asset: string;
  readonly url: string;
  readonly role: string;
  readonly isBeta?: boolean;
  readonly invertOnDark?: boolean;
  /** Needs a light plate behind it in dark mode, for a dark-to-light gradient mark. */
  readonly plateOnDark?: boolean;
  /**
   * The mirror of `plateOnDark`: a dark plate in light mode, for a mark drawn
   * light on transparency. The CTRL wordmark fades from mint to near-white, so
   * on the light card its last two letters are not there.
   */
  readonly plateOnLight?: boolean;
}

/**
 * One flat list, no tabs.
 *
 * Advise, Build and Write were three tabs holding three cards each, which hid
 * two thirds of the section behind a click to save no space. Collapsed
 * 12 Aug 2026. `isBeta` is what the generator reads to name the build work in
 * llms.txt, so it is load-bearing rather than decoration.
 */
export interface PortfolioContent extends SectionHeader {
  readonly betaBadge: string;
  readonly items: readonly PortfolioItem[];
}

export interface Achievement {
  readonly icon: string;
  readonly category: string;
  readonly metric: string;
  readonly context: string;
  readonly description: string;
}

export interface Engagement {
  readonly name: string;
  readonly role: string;
  readonly description: string;
}

export interface JourneyStop {
  readonly city: string;
  readonly period: string;
  readonly role: string;
  readonly story: string;
}

export interface ReceiptsContent extends SectionHeader {
  readonly tabs: {
    readonly receipts: string;
    readonly journey: string;
    readonly credentials: string;
  };
  readonly credentialsHeading: string;
  readonly journeyHeading: string;
  readonly engagementsHeading: string;
  readonly achievements: readonly Achievement[];
  readonly engagements: readonly Engagement[];
  readonly credentials: readonly string[];
  readonly journey: readonly JourneyStop[];
  /** The commercial track record as prose, for llms.txt. */
  readonly roles: readonly Role[];
}

export interface WorkItem {
  readonly title: string;
  readonly type: string;
  readonly summary: string;
  readonly description: string;
  readonly link?: string;
  readonly actionLabel?: string;
  readonly asset: string;
  readonly icon: string;
}

export interface WorkContent extends SectionHeader {
  readonly items: readonly WorkItem[];
  readonly publishRow: readonly { readonly prefix: string; readonly link: ExternalLink }[];
}

export interface Lesson {
  readonly title: string;
  readonly description: string;
  readonly asset: string;
  readonly link: string;
}

/**
 * One employer that has sent someone to a Lightning Lesson.
 *
 * `domain` is the brand's own domain, which is both how the mark was sourced
 * and the record of which company is meant. It is not always the domain the
 * attendee's email came from: BMW registered on bmwna.com, American Express on
 * aexp.com, Goldman Sachs on gs.com, LEGO on consultant.lego.com. See FACTS.md.
 */
export interface AttendeeBrand {
  readonly slug: string;
  readonly name: string;
  readonly domain: string;
}

/**
 * No badge field. Every card carried a "Free" chip, which is a price, and
 * pricing lives on themindmaker.ai only. Removed 12 Aug 2026.
 */
export interface LessonsContent extends SectionHeader {
  readonly lessons: readonly Lesson[];
  readonly attendeesLabel: string;
  readonly attendees: readonly AttendeeBrand[];
}

/**
 * One way to reach Krish.
 *
 * `action` is what the visitor is about to do and is the line they read.
 * `detail` is where it lands, set underneath in small type so the destination
 * is never a surprise. There is no OfferContent any more: "Work with me" was a
 * section explaining one card that linked here anyway, so it folded into these
 * four rows on 12 Aug 2026.
 */
export interface ContactLink {
  readonly action: string;
  readonly detail: string;
  readonly href: string;
  readonly icon: string;
  readonly sheetIcon?: string;
  readonly external: boolean;
  readonly copyable?: boolean;
}

export interface ContactContent extends SectionHeader {
  readonly links: readonly ContactLink[];
  readonly copySuccess: string;
  readonly copyError: string;
  readonly copyLabel: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface DockItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

export interface NavContent {
  readonly skipLink: string;
  readonly brand: string;
  readonly brandAria: string;
  readonly navAria: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly items: readonly NavItem[];
  readonly footerItems: readonly NavItem[];
  readonly footerTagline: string;
  readonly footerRights: string;
  readonly sitemapLabel: string;
  readonly linkedInAria: string;
  readonly dockAria: string;
  readonly dockItems: readonly DockItem[];
  readonly contactAria: string;
}

/** One employer or engagement, as prose for llms.txt. */
export interface Role {
  readonly org: string;
  readonly title: string;
  readonly detail: string;
}

/** A named thing Krish runs now, as prose for llms.txt. */
export interface CurrentWork {
  readonly name: string;
  readonly qualifier?: string;
  readonly detail: string;
}

export interface SiteContent {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  /** The spine sentence. Must not drift. See POSITIONING.md. */
  readonly spine: string;
  /** The market cluster, word for word. Must appear on every surface. */
  readonly cluster: string;
  readonly title: string;
  readonly description: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly canonical: string;
  readonly email: string;
  readonly ogImage: string;
  readonly ogImageAlt: string;
  readonly twitterHandle: string;
  readonly locale: string;
  readonly language: string;
  readonly websiteDescription: string;
  /** ISO date used for sitemap lastmod. Bump when the page changes materially. */
  readonly updated: string;
  /** Browser and manifest theme colour. One value, used everywhere. */
  readonly themeColor: string;
  /** Opening paragraph of llms.txt. Must agree with `description`. */
  readonly bio: string;
  readonly nowHeading: string;
  readonly now: readonly CurrentWork[];
  readonly writingHeading: string;
  readonly writing: readonly CurrentWork[];
  readonly buildWorkNote: string;
  readonly education: string;
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly string[];
  readonly alumniOf: readonly string[];
  readonly links: {
    readonly linkedin: string;
    readonly mindmaker: string;
    readonly mindmakerLive: string;
    readonly signalAndNoise: string;
    readonly calendly: string;
  };
}
