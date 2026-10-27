import type { StaticImageData } from 'next/image';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

/** A value provided once per locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Allowed public status labels (brief §11). */
export type ProjectStatus = 'shipped' | 'inProgress' | 'prototype' | 'concept';

export type LinkItem = {
  label: Localized;
  href: string;
};

export type Experience = {
  id: string;
  company: string;
  role: Localized;
  location: Localized;
  /** `YYYY-MM` */
  start: string;
  /** `YYYY-MM`; `null` while the role is ongoing; omitted when unknown (then set `periodLabel`). */
  end?: string | null;
  /** Replaces the computed date range when the exact months are not confirmed. */
  periodLabel?: Localized;
  summary: Localized;
  bullets: Localized<string[]>;
  stack?: string[];
  /** `primary` roles are shown in the main timeline, `earlier` ones in a collapsed group. */
  tier: 'primary' | 'earlier';
  links?: LinkItem[];
  /**
   * Draft bullets waiting for Jeff's approval. Never rendered;
   * move them to `bullets` once approved.
   */
  pendingBullets?: Localized<string[]>;
};

export type Callout = {
  title: string;
  body: string;
};

export type DiagramStep = {
  from: string;
  to: string;
  label: string;
};

export type Diagram = {
  /** `implemented` is read from source; `proposed` is a design that does not exist yet. */
  kind: 'implemented' | 'illustrative' | 'proposed';
  title: Localized;
  participants: string[];
  steps: Localized<DiagramStep[]>;
  note?: Localized;
};

export type CaseStudy = {
  problem: Localized<string[]>;
  context: Localized<string[]>;
  role: Localized<string[]>;
  architecture: Localized<string[]>;
  diagrams?: Diagram[];
  decisions: Localized<Callout[]>;
  tradeoffs: Localized<Callout[]>;
  outcome: Localized<string[]>;
  next: Localized<string[]>;
};

export type Project = {
  slug: string;
  /** Drafts stay in source for later approval but are never rendered, linked or listed in the sitemap. */
  published: boolean;
  featured: boolean;
  /** Lower comes first. */
  order: number;
  title: Localized;
  tagline: Localized;
  status: ProjectStatus;
  period: Localized;
  role: Localized;
  /** Full stack list for the case study. */
  stack: string[];
  /** At most five chips on cards. */
  chips: string[];
  image?: {
    src: StaticImageData;
    alt: Localized;
  };
  /** One-sentence problem statement for cards. */
  summary: Localized;
  /** One-sentence outcome for cards. */
  outcome: Localized;
  links: {
    repo?: string;
    live?: string;
    evidence?: LinkItem[];
  };
  /** Short bullet list used when there is no full case study. */
  highlights?: Localized<string[]>;
  caseStudy?: CaseStudy;
};

export type SkillLevel = 'work' | 'project' | 'exploring';

export type Skill = {
  name: string;
  level: SkillLevel;
  /**
   * `false` keeps a skill in source (so nothing is erased without Jeff confirming it)
   * without showing it on the site.
   */
  display?: boolean;
};

export type SkillGroup = {
  id: string;
  title: Localized;
  skills: Skill[];
};
