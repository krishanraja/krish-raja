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
  // No status field. The mobile hero carried a "14 agents, 45 workflows" line
  // beside the headshot and the desktop hero never had one, so it was the last
  // mobile-only string on the site. It came off on 20 Aug 2026 and the field
  // went with it: a slot only one tree can fill is how the invented mobile
  // headings got there. The counts are still on the page, in the operating
  // system section, and in the meta and llms.txt prose.
  readonly h1: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly secondaryHref: string;
  readonly trustLabel: string;
  readonly trustLogos: readonly TrustLogo[];
}

/**
 * One pillar of the brain graphic.
 *
 * No badge field. The Operating System pillar used to carry a count chip that
 * no other had, which made one of four look like a different component. The
 * counts live in llms.txt.
 */
export interface Pillar {
  readonly icon: string;
  readonly title: string;
  /** The same part, named in two or three words, for the brain's buttons on a phone. */
  readonly short: string;
  readonly body: string;
}

/** The hero's "who I work with" copy, set as a lead, a short list and a closing line. */
export interface HeroFit {
  readonly lead: string;
  readonly traits: readonly string[];
  readonly close: string;
}

export interface OperateContent extends SectionHeader {
  /** `sub` is this, joined into one sentence, for surfaces that want prose. */
  readonly fit: HeroFit;
  readonly pillars: readonly Pillar[];
}

/**
 * Pixels to cut off a master before scaling, in SOURCE pixels.
 *
 * The appearance captures arrive with a page of navigation and a
 * recommendation sidebar baked in. Naming the offset here means a usable
 * master does not have to be recaptured to ship.
 */
export interface MediaCrop {
  readonly top?: number;
  readonly bottom?: number;
  readonly left?: number;
  readonly right?: number;
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
  /**
   * What part of the master to keep, in source pixels.
   *
   * The captures are 1280x720 photographs of a browser: the thing worth looking
   * at is a fraction of the frame, and the rest is navigation, a scrollbar and
   * YouTube's recommendation rail. Scaled whole into a 96px thumbnail, a face
   * that fills a third of the frame lands about twenty pixels across, which is
   * why every card used to read as grey chrome.
   *
   * Cropped here rather than by object-position in the card, because the
   * captures are already 16:9: object-position has nothing to move. The crop is
   * what changes the picture, and doing it in the pipeline means the thumbnail
   * is a real image of that region rather than a scaled-down page.
   */
  readonly crop?: MediaCrop;
  readonly note?: string;
  /**
   * A designed 16:9 card for the "In public" wall, at /media/thumbs/<thumb>.webp.
   * Built from real photographs only (episode artwork and video frames), never
   * generated faces. Items without one fall back to `media`.
   */
  readonly thumb?: string;
}

export interface AppearancesContent extends SectionHeader {
  readonly moreLabel: string;
  readonly lessLabel: string;
  /**
   * How many to show before the disclosure. Six, which is three rows on the
   * desktop two-column list.
   *
   * This replaced a per-item `flagship` flag. Once the list sorts newest-first
   * the preview is a recency question, not a curation one, and keeping a
   * hand-picked twelve alongside it meant two different ideas of "the good ones"
   * that could disagree.
   */
  readonly previewCount: number;
  readonly items: readonly Appearance[];
}

export interface PortfolioItem {
  readonly name: string;
  readonly description: string;
  /** Omitted when there is nothing public to point at yet. */
  readonly url?: string;
  readonly role: string;
  readonly isBeta?: boolean;
}

/**
 * One arm of Mindmake. Advisory, the product, the channel. No longer rendered
 * on the page (the portfolio shelf came off on 9 Nov 2026); kept because
 * llms.txt and the hero's Mindmake card read from it.
 */
export interface PortfolioBranch {
  readonly name: string;
  readonly role: string;
  readonly description: string;
  readonly url?: string;
  /** Named formats, for the Content branch. */
  readonly formats?: readonly { readonly name: string }[];
}

/**
 * One primary block and a secondary shelf, not five peers.
 *
 * Until 12 Aug 2026 this was a flat list of five: Mindmaker, Fractionl Pulse,
 * CTRL, Mindmaker Live and Signal & Noise, all the same size. That layout said
 * the five things were equally weighted, which is the opposite of what Krish is
 * doing. Mindmake is the focus and CTRL and Content are arms of it, so they are
 * nested inside it rather than standing beside it. The rest are real work and
 * stay on the page, one tier down, which is the only place they are shown.
 */
export interface PortfolioContent extends SectionHeader {
  readonly primary: {
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly branches: readonly PortfolioBranch[];
  };
  readonly secondary: readonly PortfolioItem[];
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

export interface Lesson {
  readonly title: string;
  readonly description: string;
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
/**
 * The next live session, before it happens. It shows at the top of the list
 * only once Krish has created it in Maven and pasted its link and title, and it
 * hides itself when its start time passes, so it can never advertise a session
 * that is over. Its date replaces the running number on the row.
 */
export interface UpcomingLesson extends Lesson {
  /** ISO 8601 with the offset of the city it is announced in, e.g. 2026-12-03T12:00:00-05:00. */
  readonly startDate: string;
  /** IANA zone the date is shown in, e.g. America/New_York. */
  readonly timeZone: string;
}

export interface LessonsContent extends SectionHeader {
  /** Empty link or title means not announced yet: nothing renders. */
  readonly upcoming: UpcomingLesson;
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
  /** A photograph, for the structured data. The cards use the bitmoji. */
  readonly personImage: string;
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
  readonly awards: readonly string[];
  /**
   * Addresses that are announced but not live yet. They still ship as links where
   * the product is named, and links:check reports them as pending rather than dead.
   * Take one out the day it resolves.
   */
  readonly comingSoon: readonly string[];
  readonly links: {
    readonly linkedin: string;
    readonly mindmake: string;
    readonly content: string;
    readonly ctrl: string;
    readonly signalAndNoise: string;
    readonly calendly: string;
  };
}

/**
 * A short address for one section: krishraja.com/<path> opens the homepage and
 * lands on that section. The link preview takes the section's own title and
 * sub, so no new copy is written for it.
 */
export interface SectionLink {
  /** Lowercase, no slashes. The address is `${site.url}/${path}`. */
  readonly path: string;
  readonly section: SectionHeader;
}

/* ---------------------------------------------------------------------------
 * The homepage built on 9 Nov 2026: loader, the three ways in, the live
 * channel and the enquiry form. Section framing stays SectionHeader.
 * ------------------------------------------------------------------------ */

/** One of the three ways in. The card anatomy is fixed: label, title, one line, one button. */
export interface HomeOption {
  readonly id: 'speaking' | 'mindmake' | 'channel';
  /** Small line above the card title. A card label, not a section eyebrow. */
  readonly label: string;
  readonly title: string;
  /** One line of plain text, optional. */
  readonly line?: string;
  readonly cta: string;
  /** Opens the enquiry form when absent. */
  readonly href?: string;
  /** Header image or poster under /media/home/. */
  readonly image: string;
  /** Optional looping video under /media/home/, played only while on screen. */
  readonly video?: string;
  /** Wordmark under /media/home/, sat in the faded top of the header. */
  readonly wordmark?: string;
  readonly wordmarkAlt?: string;
  readonly tone: 'light' | 'dark';
}

export interface ChannelSeries {
  readonly name: string;
  readonly day: string;
}

/** One published piece from the channel. The live list comes from /api/live; this is the fallback. */
export interface ChannelItem {
  readonly title: string;
  readonly link: string;
  /** ISO date. */
  readonly date: string;
  readonly series?: string;
  /** e.g. "Watch now (5 mins)". */
  readonly format?: string;
  readonly sub?: string;
  /** YouTube video id, for the thumbnail. */
  readonly video?: string;
  /** The post's own lead image, used when there is no video still. */
  readonly image?: string;
}

export interface ChannelContent extends SectionHeader {
  readonly wordmark: string;
  readonly series: readonly ChannelSeries[];
  readonly subscribe: ExternalLink;
  readonly youtube: ExternalLink;
  readonly feedUrl: string;
  readonly youtubeChannelId: string;
  readonly snapshotLabel: string;
  readonly snapshot: readonly ChannelItem[];
}

export interface AskContent {
  readonly title: string;
  readonly fields: {
    readonly name: string;
    readonly namePlaceholder: string;
    readonly event: string;
    readonly eventPlaceholder: string;
    readonly when: string;
    readonly whenPlaceholder: string;
    readonly message: string;
    readonly messagePlaceholder: string;
  };
  readonly subjectPrefix: string;
  readonly note: string;
  readonly submit: string;
  readonly sentTitle: string;
  readonly sentBody: string;
  readonly sentOr: string;
  readonly sentCall: string;
  readonly close: string;
}

export interface HomeContent {
  readonly loader: { readonly tagline: string; readonly label: string };
  readonly bitmoji: string;
  readonly practice: SectionHeader & { readonly options: readonly HomeOption[] };
  readonly channel: ChannelContent;
  readonly ask: AskContent;
  readonly swipeHint: string;
  readonly brainAria: string;
  /** Under the name on the brain card. */
  readonly brainCaption: string;
  readonly brainPartsAria: string;
  /** Which appearances get the wall's filters, in order. */
  readonly wallFilters: readonly { readonly id: AppearanceKind | 'all'; readonly label: string }[];
}
