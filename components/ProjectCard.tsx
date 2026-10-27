import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { LuArrowRight, LuArrowUpRight, LuLink2 } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import type { Locale, Project } from '@/lib/content'
import { accentText, ChipList, focusRing, mutedText, StatusBadge } from './ui'

const secondaryLink = `relative z-10 inline-flex min-h-11 items-center gap-1 rounded text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-accent ${focusRing}`

/** Featured card, in the original framed style (thick white border, warm shadow, round arrow badge). The title link is stretched over the card; secondary links sit above it. */
export function ProjectCard({ project, index = 0, headingLevel = 'h3' }: { project: Project; index?: number; headingLevel?: 'h2' | 'h3' }) {
  const locale = useLocale() as Locale
  const t = useTranslations('projects')
  const status = useTranslations('status')
  const a11y = useTranslations('a11y')
  const Heading = headingLevel

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border-8 border-white dark:border-border-dark
        bg-surface-light-elevated dark:bg-surface-dark-base shadow-xl shadow-amber-950/5 hover:shadow-xl
        motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-[1.02]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl bg-gradient-light dark:bg-gradient-dark">
        {/* Round arrow badge from the original cards, alternating gold and dark. */}
        <div aria-hidden="true" className="absolute top-4 right-4 z-20">
          <div
            className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 motion-safe:group-hover:scale-110 ${
              index % 2 === 1 ? 'bg-brand-accent text-white' : 'bg-text-dark-primary text-dark-800 dark:bg-text-light-primary dark:text-white'
            }`}
          >
            <LuArrowUpRight className="absolute w-5 h-5 md:w-6 md:h-6 transition-all duration-300 opacity-100 group-hover:opacity-0" strokeWidth={2.5} />
            <LuLink2 className="absolute w-5 h-5 md:w-6 md:h-6 transition-all duration-300 opacity-0 group-hover:opacity-100" strokeWidth={2.5} />
          </div>
        </div>
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
          <div aria-hidden="true" className="flex h-full flex-col justify-end bg-gradient-accent-soft p-6 dark:bg-gradient-dark">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-dark-900 dark:text-brand-accent">
              {project.chips.slice(0, 3).join(' · ')}
            </span>
            <span className="mt-2 text-3xl font-bold text-dark-900 dark:text-text-dark-primary">
              {project.title[locale]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusBadge status={project.status} label={status(project.status)} />
          <span className={`text-xs ${mutedText}`}>{project.period[locale]}</span>
        </div>

        <Heading className="text-lg md:text-xl lg:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
          <Link
            href={`/projects/${project.slug}`}
            className={`rounded after:absolute after:inset-0 after:content-[''] group-hover:text-brand-accent transition-colors ${focusRing}`}
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
            className={`rounded after:absolute after:inset-0 after:content-[''] group-hover:text-brand-accent ${focusRing}`}
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
