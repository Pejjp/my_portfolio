import { projects } from './projects';
import { experiences, education } from './experience';
import { skillGroups, practices } from './skills';
import type { Experience, Locale, Project } from './types';

export { site, resumeHref } from './site';
export { experiences, education, skillGroups, practices };
export * from './types';

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured);
}

export function getOtherProjects(): Project[] {
  return getPublishedProjects().filter((p) => !p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getVisibleSkillGroups() {
  return skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((s) => s.display !== false) }))
    .filter((group) => group.skills.length > 0);
}

const dateLocales: Record<Locale, string> = { en: 'en-CA', fr: 'fr-CA' };

/** Formats `YYYY-MM` as e.g. "Aug 2026" / "août 2026". */
export function formatMonth(ym: string, locale: Locale): string {
  const [year, month] = ym.split('-').map(Number);
  return new Intl.DateTimeFormat(dateLocales[locale], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatPeriod(exp: Experience, locale: Locale, presentLabel: string): string {
  if (exp.periodLabel) return exp.periodLabel[locale];
  const start = formatMonth(exp.start, locale);
  if (exp.end === null) return `${start} – ${presentLabel}`;
  if (exp.end) return `${start} – ${formatMonth(exp.end, locale)}`;
  return start;
}

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'fr';
}
