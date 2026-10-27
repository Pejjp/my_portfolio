import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/content/site';
import type { Locale } from '@/lib/content/types';

export const ogLocale: Record<Locale, string> = { en: 'en_CA', fr: 'fr_CA' };

/** `path` is locale-less and starts with `/` (use `''` for the home page). */
export function localizedPath(locale: Locale, path: string) {
  return `/${locale}${path}`;
}

/** Canonical + hreflang alternates for a page that exists in every locale. */
export function alternatesFor(locale: Locale, path: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedPath(l, path);
  languages['x-default'] = localizedPath(routing.defaultLocale, path);
  return {
    canonical: localizedPath(locale, path),
    languages,
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
