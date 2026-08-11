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

/** The three surfaces that render copy. */
export type Surface = 'desktop' | 'mobile' | 'sheet';

/**
 * A string that may still differ by surface.
 *
 * The desktop and mobile trees were written separately and drifted, so a
 * handful of strings exist in two or three variants. Modelling that here
 * keeps the divergence visible in one file instead of hidden across three
 * components, and lets the extraction refactor render byte-identically.
 *
 * Plain `string` is the goal. Reach for the variant form only to record
 * drift that already exists, never to introduce new drift.
 */
export type Copy = string | { desktop: string; mobile: string; sheet?: string };

/** Resolve a Copy value for one surface. Falls back sheet -> mobile. */
export const pick = (copy: Copy, surface: Surface): string => {
  if (typeof copy === 'string') return copy;
  if (surface === 'sheet') return copy.sheet ?? copy.mobile;
  return copy[surface];
};

/** A link that leaves the site. */
export interface ExternalLink {
  readonly label: string;
  readonly href: string;
}

/**
 * Standard section framing.
 *
 * `eyebrow` is rendered by the mobile tree only. `title` and `sub` are the last
 * fields allowed to differ by surface, because mobile pairs an eyebrow with a
 * different title where desktop uses a single h2, and splitting the desktop sub
 * across the two is the point. Card-level copy below must never differ.
 */
export interface SectionHeader {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: Copy;
  readonly sub: Copy;
}

export interface TrustLogo {
  readonly asset: string;
  readonly alt: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly status: string;
  readonly h1: string;
  readonly sub: string;
  readonly channel: ExternalLink;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly secondaryHref: string;
  readonly trustLabel: string;
  readonly trustLogos: readonly TrustLogo[];
}

export interface Pillar {
  readonly icon: string;
  readonly title: string;
  readonly badge?: string;
  readonly body: string;
}

export interface OperateContent extends SectionHeader {
  readonly pillars: readonly Pillar[];
  readonly flywheel: {
    readonly title: string;
    readonly body: string;
    readonly points: readonly string[];
  };
}

/** One screen or clip from the operating system. */
export interface OsEntry {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly date?: string;
  /** Key into src/lib/asset-map.ts. Undefined renders a placeholder tile. */
  readonly asset?: string;
  readonly kind: 'image' | 'video';
  /** Still frame for a video. Shown when prefers-reduced-motion is set. */
  readonly poster?: string;
  readonly alt: string;
}

export interface OsContent extends SectionHeader {
  readonly entries: readonly OsEntry[];
}

export interface PortfolioItem {
  readonly name: string;
  readonly description: string;
  readonly asset: string;
  readonly url: string;
  readonly role: string;
  readonly isBeta?: boolean;
  readonly invertOnDark?: boolean;
}

export interface PortfolioTab {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly note?: string;
  readonly items: readonly PortfolioItem[];
}

export interface PortfolioContent extends SectionHeader {
  readonly betaBadge: string;
  readonly tabs: readonly PortfolioTab[];
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

export type LatestType = 'post' | 'podcast' | 'talk';
/** Mindmaker Live's two formats. See project-documentation/POSITIONING.md. */
export type LatestFormat = 'Built' | 'Paid';

export interface LatestEntry {
  readonly id: string;
  readonly title: string;
  /** Optional. Left unset where no sourced description exists. Never guessed. */
  readonly blurb?: string;
  readonly type: LatestType;
  readonly format?: LatestFormat;
  readonly href: string;
  /** ISO date. Used for sorting and display. */
  readonly date?: string;
  readonly asset?: string;
}

export interface LatestContent extends SectionHeader {
  readonly limit: number;
  readonly archive: ExternalLink;
  readonly typeLabels: Readonly<Record<LatestType, string>>;
  readonly entries: readonly LatestEntry[];
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

export interface LessonsContent extends SectionHeader {
  readonly badge: string;
  readonly lessons: readonly Lesson[];
}

export interface OfferCard {
  readonly icon: string;
  readonly title: string;
  readonly eyebrow?: string;
  readonly body: string;
  readonly cta: string;
  readonly href: string;
  readonly primary?: boolean;
}

export interface OfferContent extends SectionHeader {
  readonly cards: readonly OfferCard[];
}

export interface ContactLink {
  readonly label: string;
  readonly value: string;
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
  readonly jumpItems: readonly NavItem[];
  readonly jumpAria: string;
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
  };
}
