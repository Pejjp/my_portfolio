import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getFeaturedProjects, getOtherProjects, type Locale } from '@/lib/content'
import { alternatesFor, ogLocale } from '@/lib/seo'
import { ProjectCard, ProjectRow } from '@/components/ProjectCard'
import { mutedText } from '@/components/ui'

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('projectsTitle'),
    description: t('projectsDescription'),
    alternates: alternatesFor(locale as Locale, '/projects'),
    openGraph: {
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      locale: ogLocale[locale as Locale],
      url: `/${locale}/projects`,
    },
  }
}

export default async function ProjectsIndex({ params }: { params: Params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'projects' })

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:px-6 md:pt-14">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
        {t('allProjects')}
      </h1>
      <p className={`mt-4 max-w-3xl text-lg ${mutedText}`}>{t('indexIntro')}</p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getFeaturedProjects().map((project) => (
          <ProjectCard key={project.slug} project={project} headingLevel="h2" />
        ))}
      </div>

      <h2 className="mt-16 text-xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">{t('more')}</h2>
      <ul className="mt-2 border-t border-border-light dark:border-border-dark">
        {getOtherProjects().map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>
    </div>
  )
}
