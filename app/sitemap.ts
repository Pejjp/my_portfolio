import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getPublishedProjects } from '@/lib/content';
import { absoluteUrl, localizedPath } from '@/lib/seo';

/** Every public page in every locale, with hreflang alternates. Drafts are excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/projects', ...getPublishedProjects().map((p) => `/projects/${p.slug}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/projects' ? 0.8 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(localizedPath(l, path))])),
      },
    })),
  );
}
