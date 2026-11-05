import { useLocale, useTranslations } from 'next-intl'
import { LuBrainCircuit, LuLayers, LuServerCog } from 'react-icons/lu'
import { getVisibleSkillGroups, practices, type Locale, type SkillLevel } from '@/lib/content'
import { accentText, card, mutedText, SectionHeader } from './ui'

const pillars = [
  { key: 'product', Icon: LuLayers },
  { key: 'backend', Icon: LuServerCog },
  { key: 'ai', Icon: LuBrainCircuit },
] as const

const levelMarker: Record<SkillLevel, string> = {
  work: 'bg-accent-600 dark:bg-accent-500 border-accent-600 dark:border-accent-500',
  project: 'bg-transparent border-accent-600 dark:border-accent-500',
  exploring: 'bg-transparent border-dashed border-text-light-muted dark:border-text-dark-muted',
}

function LevelMarker({ level }: { level: SkillLevel }) {
  return <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2 ${levelMarker[level]}`} />
}

const EngineeringFocus = () => {
  const t = useTranslations('focus')
  const locale = useLocale() as Locale
  const groups = getVisibleSkillGroups()
  const levels: SkillLevel[] = ['work', 'project', 'exploring']

  return (
    <section id="skills" aria-labelledby="focus-title" className="w-full max-w-7xl mx-auto">
      <SectionHeader id="focus-title" title={t('title')} highlight={t('titleHighlight')} />

      <ul className="grid gap-6 md:grid-cols-3">
        {pillars.map(({ key, Icon }) => (
          <li key={key} className={`${card} p-6`}>
            <Icon className={`h-7 w-7 ${accentText}`} aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
              {t(`pillars.${key}.title`)}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>{t(`pillars.${key}.body`)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h3 className="text-xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">{t('skillsTitle')}</h3>
        <div>
          <p className={`text-xs font-semibold ${mutedText}`} id="skill-legend">
            {t('legend')}
          </p>
          <ul aria-labelledby="skill-legend" className={`mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs ${mutedText}`}>
            {levels.map((level) => (
              <li key={level} className="flex items-center gap-2">
                <LevelMarker level={level} />
                {t(`levels.${level}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.id}>
            <h4 className={`font-mono text-xs uppercase tracking-[0.18em] ${accentText}`}>{group.title[locale]}</h4>
            <ul className="mt-3 space-y-2">
              {group.skills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-2.5 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  <LevelMarker level={skill.level} />
                  <span>
                    {skill.name}
                    <span className="sr-only"> ({t(`levels.${skill.level}`)})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className={`font-mono text-xs uppercase tracking-[0.18em] ${accentText}`}>{t('practices')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
            {practices[locale].map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default EngineeringFocus
