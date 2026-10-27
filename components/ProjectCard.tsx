import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import type { Locale, Project } from '@/lib/content'
import { accentText, card, ChipList, focusRing, mutedText, StatusBadge } from './ui'

const secondaryLink = `relative z-10 inline-flex min-h-11 items-center gap-1 rounded text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary hover:text-accent-700 dark:hover:text-accent-500 ${focusRing}`

/** Featured card. The title link is stretched over the card; secondary links sit above it. */
export function ProjectCard({ project, headingLevel = 'h3' }: { project: Project; headingLevel?: 'h2' | 'h3' }) {
  const locale = useLocale() as Locale
  const t = useTranslations('projects')
  const status = useTranslations('status')
  const a11y = useTranslations('a11y')
  const Heading = headingLevel

  return (
    <article className={`${card} group relative flex flex-col overflow-hidden transition-shadow hover:shadow-dark-lg dark:hover:shadow-accent`}>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border-light dark:border-border-dark bg-surface-light-muted dark:bg-surface-dark-muted">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt[locale]}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          // No approved screenshot: a plain typographic panel rather than an invented visual.
          <div aria-hidden="true" className="flex h-full flex-col justify-end bg-gradient-to-br from-accent-100 to-light-100 p-6 dark:from-dark-800 dark:to-dark-950">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-800 dark:text-accent-500">
              {project.chips.slice(0, 3).join(' · ')}
            </span>
            <span className="mt-2 text-3xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
              {project.title[locale]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusBadge status={project.status} label={status(project.status)} />
          <span className={`text-xs ${mutedText}`}>{project.period[locale]}</span>
        </div>

        <Heading className="text-xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          <Link
            href={`/projects/${project.slug}`}
            className={`rounded after:absolute after:inset-0 after:content-[''] ${focusRing}`}
          >
            {project.title[locale]}
          </Link>
        </Heading>

        <p className={`text-sm leading-relaxed ${mutedText}`}>{project.summary[locale]}</p>

        <p className="text-sm leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
          <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{t('outcome')}: </span>
          {project.outcome[locale]}
        </p>

        <p className={`text-xs ${mutedText}`}>
          <span className="font-semibold">{t('role')}: </span>
          {project.role[locale]}
        </p>

        <ChipList items={project.chips.slice(0, 5)} />

        <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-2">
          <span className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold ${accentText}`} aria-hidden="true">
            {t('readCaseStudy')}
            <LuArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
          </span>
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
              {t('viewCode')}
              <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> {a11y('newTab')}</span>
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
              {t('viewLive')}
              <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> {a11y('newTab')}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/** Compact row for non-featured projects. */
export function ProjectRow({ project }: { project: Project }) {
  const locale = useLocale() as Locale
  const status = useTranslations('status')

  return (
    <li className="group relative flex flex-col gap-2 border-b border-border-light dark:border-border-dark py-5 md:flex-row md:items-baseline md:gap-6">
      <div className="flex shrink-0 items-center gap-3 md:w-40">
        <StatusBadge status={project.status} label={status(project.status)} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
          <Link
            href={`/projects/${project.slug}`}
            className={`rounded after:absolute after:inset-0 after:content-[''] group-hover:text-accent-700 dark:group-hover:text-accent-500 ${focusRing}`}
          >
            {project.title[locale]}
          </Link>
        </h3>
        <p className={`mt-1 text-sm ${mutedText}`}>{project.tagline[locale]}</p>
      </div>
      <p className={`font-mono text-xs ${mutedText} md:w-56 md:text-right`}>{project.chips.slice(0, 3).join(' · ')}</p>
    </li>
  )
}
