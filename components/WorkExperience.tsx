import { useLocale, useTranslations } from 'next-intl'
import { LuArrowUpRight, LuChevronDown } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import { education, experiences, formatPeriod, type Experience, type Locale } from '@/lib/content'
import { brandText, card, ChipList, focusRing, mutedText, SectionHeader, textLink } from './ui'

/**
 * Original alternating timeline: company and dates on one side, the role card on the other,
 * with a center line on desktop. Each entry is rendered once (the previous version rendered
 * a mobile copy and a desktop copy of every entry).
 */
function ExperienceItem({ exp, index, locale }: { exp: Experience; index: number; locale: Locale }) {
  const t = useTranslations('experience')
  const a11y = useTranslations('a11y')
  const current = exp.end === null
  const flipped = index % 2 === 1

  return (
    <li className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
      {/* Timeline dot: left on mobile, centered on desktop */}
      <span
        aria-hidden="true"
        className={`absolute left-0 md:left-1/2 -translate-x-1/2 top-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full border-4 ${
          current
            ? 'bg-brand-accent border-brand-accent shadow-accent'
            : 'bg-surface-light-muted dark:bg-surface-dark-muted border-border-light dark:border-border-dark'
        }`}
      />

      {/* Company and dates */}
      <div className={`mb-3 md:mb-0 ${flipped ? 'md:order-2 md:pl-8 lg:pl-12' : 'md:text-right md:pr-8 lg:pr-12'}`}>
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">{exp.company}</h3>
        <p className={`mt-1 md:mt-2 text-sm lg:text-base ${mutedText}`}>{formatPeriod(exp, locale, t('present'))}</p>
        <p className={`text-sm ${mutedText}`}>{exp.location[locale]}</p>
      </div>

      {/* Role card */}
      <div className={flipped ? 'md:order-1 md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}>
        <div className={`${card} p-4 md:p-6 rounded-xl hover:shadow-lg transition-shadow duration-300`}>
          <h4 className={`text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3 ${brandText}`}>{exp.role[locale]}</h4>
          <p className={`text-sm lg:text-base italic ${mutedText}`}>{exp.summary[locale]}</p>

          {exp.bullets[locale].length > 0 && (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm lg:text-base text-text-light-secondary dark:text-text-dark-secondary marker:text-brand-accent">
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
        </div>
      </div>
    </li>
  )
}

function Timeline({ items, locale }: { items: Experience[]; locale: Locale }) {
  return (
    <div className="relative">
      {/* Line: left on mobile, center on desktop */}
      <div aria-hidden="true" className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border-light dark:bg-border-dark" />
      <ol className="space-y-10 md:space-y-12">
        {items.map((exp, index) => (
          <ExperienceItem key={exp.id} exp={exp} index={index} locale={locale} />
        ))}
      </ol>
    </div>
  )
}

const WorkExperience = () => {
  const t = useTranslations('experience')
  const locale = useLocale() as Locale
  const primary = experiences.filter((e) => e.tier === 'primary')
  const earlier = experiences.filter((e) => e.tier === 'earlier')

  return (
    <section id="work-experience" aria-labelledby="work-title" className="w-full max-w-7xl mx-auto">
      <SectionHeader id="work-title" title={t('title')} highlight={t('titleHighlight')} />

      <Timeline items={primary} locale={locale} />

      {earlier.length > 0 && (
        <details className={`${card} group mt-12 max-w-3xl mx-auto`}>
          <summary
            className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-3 font-semibold text-text-light-primary dark:text-text-dark-primary [&::-webkit-details-marker]:hidden ${focusRing}`}
          >
            {t('earlier')}
            <LuChevronDown className="h-5 w-5 motion-safe:transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="px-6 pb-6 pt-2">
            <ol className="ml-2">
              {earlier.map((exp) => (
                <li key={exp.id} className="relative border-l-2 border-border-light dark:border-border-dark pl-6">
                  <h4 className={`text-lg font-semibold ${brandText}`}>{exp.role[locale]}</h4>
                  <p className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
                    {exp.company} <span className={`font-normal ${mutedText}`}>· {exp.location[locale]} · {formatPeriod(exp, locale, t('present'))}</span>
                  </p>
                  <p className={`mt-2 text-sm italic ${mutedText}`}>{exp.summary[locale]}</p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-light-secondary dark:text-text-dark-secondary marker:text-brand-accent">
                    {exp.bullets[locale].map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </details>
      )}

      <div className="mt-12 text-center">
        <h3 className={`text-sm font-semibold uppercase tracking-[0.18em] ${mutedText}`}>{t('education')}</h3>
        <p className="mt-2 text-lg md:text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{education.degree[locale]}</p>
        <p className={mutedText}>
          {education.school} · {education.period[locale]}
        </p>
      </div>
    </section>
  )
}

export default WorkExperience
