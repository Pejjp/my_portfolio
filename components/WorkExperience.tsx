import { useLocale, useTranslations } from 'next-intl'
import { LuArrowUpRight, LuChevronDown } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import { education, experiences, formatPeriod, type Experience, type Locale } from '@/lib/content'
import { card, ChipList, focusRing, mutedText, SectionHeader, textLink } from './ui'

/** One DOM node per entry (the previous version rendered every entry twice for mobile and desktop). */
function ExperienceItem({ exp, locale }: { exp: Experience; locale: Locale }) {
  const t = useTranslations('experience')
  const a11y = useTranslations('a11y')
  const current = exp.end === null

  return (
    <li className="relative pl-8 md:pl-10">
      <span
        aria-hidden="true"
        className={`absolute left-[-7px] top-2 h-3.5 w-3.5 rounded-full border-2 ${
          current
            ? 'border-accent-600 bg-accent-600 dark:border-accent-500 dark:bg-accent-500'
            : 'border-border-light-strong bg-surface-light-base dark:border-border-dark-strong dark:bg-surface-dark-base'
        }`}
      />
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <h3 className="text-lg md:text-xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          {exp.role[locale]}
        </h3>
        <p className={`shrink-0 font-mono text-xs md:text-sm ${mutedText}`}>{formatPeriod(exp, locale, t('present'))}</p>
      </div>
      <p className="mt-1 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
        {exp.company} <span className={`font-normal ${mutedText}`}>· {exp.location[locale]}</span>
      </p>
      <p className={`mt-3 max-w-3xl ${mutedText}`}>{exp.summary[locale]}</p>

      {exp.bullets[locale].length > 0 && (
        <ul className="mt-3 max-w-3xl list-disc space-y-1.5 pl-5 text-text-light-secondary dark:text-text-dark-secondary marker:text-accent-600 dark:marker:text-accent-500">
          {exp.bullets[locale].map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {exp.stack && exp.stack.length > 0 && (
        <div className="mt-4">
          <ChipList items={exp.stack} label={t('stack')} />
        </div>
      )}

      {exp.links && exp.links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-5">
          {exp.links.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.href} href={link.href} className={textLink}>
                {link.label[locale]}
              </Link>
            ) : (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                {link.label[locale]}
                <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> {a11y('newTab')}</span>
              </a>
            ),
          )}
        </div>
      )}
    </li>
  )
}

const WorkExperience = () => {
  const t = useTranslations('experience')
  const locale = useLocale() as Locale
  const primary = experiences.filter((e) => e.tier === 'primary')
  const earlier = experiences.filter((e) => e.tier === 'earlier')

  return (
    <section id="work-experience" aria-labelledby="work-title" className="w-full">
      <SectionHeader id="work-title" eyebrow={t('eyebrow')} title={t('title')} />

      <ol className="space-y-12 border-l border-border-light dark:border-border-dark">
        {primary.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} locale={locale} />
        ))}
      </ol>

      {earlier.length > 0 && (
        <details className={`${card} group mt-12 p-0`}>
          <summary
            className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-3 font-semibold text-text-light-primary dark:text-text-dark-primary [&::-webkit-details-marker]:hidden ${focusRing}`}
          >
            {t('earlier')}
            <LuChevronDown className="h-5 w-5 motion-safe:transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ol className="mx-6 mb-6 mt-2 space-y-10 border-l border-border-light dark:border-border-dark">
            {earlier.map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} locale={locale} />
            ))}
          </ol>
        </details>
      )}

      <div className="mt-12">
        <h3 className={`font-mono text-xs uppercase tracking-[0.18em] ${mutedText}`}>{t('education')}</h3>
        <p className="mt-2 text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
          {education.degree[locale]}
        </p>
        <p className={mutedText}>
          {education.school} · {education.period[locale]}
        </p>
      </div>
    </section>
  )
}

export default WorkExperience
