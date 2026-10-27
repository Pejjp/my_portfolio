import { describe, expect, it } from 'vitest';
import { projects } from '@/lib/content/projects';
import {
  experiences,
  formatMonth,
  formatPeriod,
  getFeaturedProjects,
  getProject,
  getPublishedProjects,
  getVisibleSkillGroups,
  locales,
  type Localized,
} from '@/lib/content';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

const statuses = ['shipped', 'inProgress', 'prototype', 'concept'];

function expectFilled(value: Localized<string>, label: string) {
  for (const l of locales) expect(value[l]?.trim(), `${label} [${l}]`).toBeTruthy();
}

function expectParallel<T>(value: Localized<T[]>, label: string) {
  expect(value.en.length, `${label} en/fr length`).toBe(value.fr.length);
  expect(value.en.length, `${label} is empty`).toBeGreaterThan(0);
}

describe('projects', () => {
  const published = getPublishedProjects();

  it('has unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('features at least three published projects', () => {
    expect(getFeaturedProjects().length).toBeGreaterThanOrEqual(3);
  });

  it('never exposes drafts', () => {
    for (const draft of projects.filter((p) => !p.published)) {
      expect(getProject(draft.slug)).toBeUndefined();
      expect(published).not.toContain(draft);
    }
  });

  it.each(published.map((p) => [p.slug, p] as const))('%s is complete in both languages', (_slug, p) => {
    for (const field of ['title', 'tagline', 'summary', 'outcome', 'period', 'role'] as const) {
      expectFilled(p[field], `${p.slug}.${field}`);
    }
    expect(statuses).toContain(p.status);
    expect(p.chips.length).toBeLessThanOrEqual(5);
    if (p.image) expectFilled(p.image.alt, `${p.slug}.image.alt`);
    expect(p.caseStudy || p.highlights, `${p.slug} needs a case study or highlights`).toBeTruthy();
    if (p.highlights) expectParallel(p.highlights, `${p.slug}.highlights`);

    const cs = p.caseStudy;
    if (cs) {
      for (const key of ['problem', 'context', 'role', 'architecture', 'decisions', 'tradeoffs', 'outcome', 'next'] as const) {
        expectParallel(cs[key] as Localized<unknown[]>, `${p.slug}.caseStudy.${key}`);
      }
      for (const d of cs.diagrams ?? []) {
        expectParallel(d.steps, `${p.slug} diagram steps`);
        for (const l of locales) {
          for (const step of d.steps[l]) {
            expect(d.participants).toContain(step.from);
            expect(d.participants).toContain(step.to);
          }
        }
      }
    }
    for (const url of [p.links.repo, p.links.live, ...(p.links.evidence ?? []).map((e) => e.href)]) {
      if (url) expect(url).toMatch(/^https:\/\//);
    }
  });
});

describe('experience', () => {
  it('lists SMARDT first and keeps earlier roles after primary ones', () => {
    expect(experiences[0].id).toBe('smardt');
    const firstEarlier = experiences.findIndex((e) => e.tier === 'earlier');
    expect(experiences.slice(firstEarlier).every((e) => e.tier === 'earlier')).toBe(true);
  });

  it.each(experiences.map((e) => [e.id, e] as const))('%s has valid dates and parallel copy', (_id, e) => {
    expect(e.start).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
    if (typeof e.end === 'string') expect(e.end > e.start).toBe(true);
    if (e.end === undefined) expect(e.periodLabel, `${e.id} needs periodLabel when end is unknown`).toBeTruthy();
    expectFilled(e.role, `${e.id}.role`);
    expectFilled(e.summary, `${e.id}.summary`);
    expect(e.bullets.en.length).toBe(e.bullets.fr.length);
  });

  it('formats dates per locale', () => {
    expect(formatMonth('2026-08', 'en')).toMatch(/Aug.*2026/);
    expect(formatMonth('2026-08', 'fr')).toMatch(/août.*2026/);
    expect(formatPeriod(experiences[0], 'en', 'Present')).toMatch(/– Present$/);
  });
});

describe('skills', () => {
  it('shows only displayed skills and keeps hidden ones in source', () => {
    const visible = getVisibleSkillGroups().flatMap((g) => g.skills.map((s) => s.name));
    expect(visible).not.toContain('Snowflake');
    expect(visible).toContain('TypeScript');
  });
});

describe('accuracy and privacy guardrails', () => {
  const rendered = JSON.stringify({ published: getPublishedProjects(), experiences: experiences.map((e) => ({ ...e, pendingBullets: undefined })), en, fr });

  it('contains no phone number', () => {
    expect(rendered).not.toMatch(/438[\s.)-]*855|855[\s.-]*1291/);
  });

  it('drops unverified metrics and student positioning', () => {
    expect(rendered).not.toMatch(/30\s?%/);
    expect(rendered).not.toMatch(/15\+|over 15|plus de 15 audits/i);
    expect(JSON.stringify(en)).not.toMatch(/Computer Science student/i);
    expect(JSON.stringify(fr)).not.toMatch(/étudiant en informatique/i);
  });

  it('never renders pending SMARDT bullets', () => {
    const smardt = experiences.find((e) => e.id === 'smardt')!;
    expect(smardt.bullets.en).toHaveLength(0);
  });
});
