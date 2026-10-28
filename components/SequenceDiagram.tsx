import { useLocale, useTranslations } from 'next-intl'
import type { Diagram, Locale } from '@/lib/content'
import { mutedText } from './ui'

/**
 * Two palettes that mirror the decision/tradeoff cards: implemented diagrams carry the brand gold,
 * illustrative and proposed ones stay neutral (proposed also keeps a dashed border).
 */
const palette = {
  gold: {
    frame: 'border-accent-200/80 bg-white dark:border-accent-500/25 dark:bg-white/[0.02]',
    header: 'bg-gradient-to-br from-accent-50 to-white dark:from-accent-500/[0.10] dark:to-transparent',
    badge: 'border-accent-300 bg-accent-100/60 text-accent-800 dark:border-accent-500/40 dark:bg-accent-500/10 dark:text-brand-accent',
    strip: 'bg-accent-50/50 dark:bg-accent-500/[0.04]',
    chip: 'border-accent-200 bg-white dark:border-accent-500/25 dark:bg-white/[0.03]',
    rule: 'border-accent-100 dark:border-accent-500/15',
    divide: 'divide-accent-100 dark:divide-accent-500/15',
    row: 'hover:bg-accent-50/60 dark:hover:bg-accent-500/[0.05]',
    index: 'text-accent-700 dark:text-brand-accent',
  },
  neutral: {
    frame: 'border-border-light-strong bg-white dark:border-white/[0.12] dark:bg-white/[0.02]',
    header: 'bg-surface-light-muted dark:bg-white/[0.03]',
    badge: 'border-border-light-strong bg-white text-text-light-muted dark:border-white/[0.16] dark:bg-transparent dark:text-text-dark-muted',
    strip: 'bg-surface-light-muted/60 dark:bg-white/[0.02]',
    chip: 'border-border-light-strong bg-white dark:border-white/[0.12] dark:bg-white/[0.03]',
    rule: 'border-border-light dark:border-white/[0.08]',
    divide: 'divide-border-light dark:divide-white/[0.08]',
    row: 'hover:bg-surface-light-muted dark:hover:bg-white/[0.03]',
    index: 'text-text-light-muted dark:text-text-dark-muted',
  },
} as const

/**
 * Sequence diagram rendered as an ordered list, so it reads correctly with a screen reader,
 * reflows on narrow screens and never pretends to be more precise than the source.
 */
export default function SequenceDiagram({ diagram }: { diagram: Diagram }) {
  const locale = useLocale() as Locale
  const t = useTranslations('caseStudy')
  const c = palette[diagram.kind === 'implemented' ? 'gold' : 'neutral']

  return (
    <figure className={`overflow-hidden rounded-2xl border ${c.frame} ${diagram.kind === 'proposed' ? 'border-dashed' : ''}`}>
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 ${c.rule} ${c.header}`}>
        <figcaption className="font-semibold text-text-light-primary dark:text-text-dark-primary">{diagram.title[locale]}</figcaption>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
          {t(`diagram_${diagram.kind}`)}
        </span>
      </div>

      <ul className={`flex flex-wrap gap-2 border-b px-5 py-3 ${c.rule} ${c.strip}`} aria-hidden="true">
        {diagram.participants.map((p) => (
          <li key={p} className={`rounded-md border px-2 py-1 font-mono text-xs text-text-light-secondary dark:text-text-dark-secondary ${c.chip}`}>
            {p}
          </li>
        ))}
      </ul>

      {/*
        Each step stacks the route ("A → B") above its description. The route wraps as a flex row,
        so long participant names never spill into the description column (previous layout bug).
      */}
      <ol className={`divide-y ${c.divide}`}>
        {diagram.steps[locale].map((step, i) => (
          <li key={i} className={`flex gap-3 px-5 py-3 motion-safe:transition-colors ${c.row}`}>
            <span className={`w-6 shrink-0 font-mono text-xs font-semibold leading-6 ${c.index}`}>{String(i + 1).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-x-1.5 font-mono text-xs leading-6 text-text-light-primary dark:text-text-dark-primary">
                <span className="min-w-0 break-words">{step.from}</span>
                <span aria-hidden="true" className="text-brand-accent">→</span>
                <span className="sr-only">{t('stepTo')}</span>
                <span className="min-w-0 break-words">{step.to}</span>
              </p>
              <p className={`text-sm leading-6 break-words ${mutedText}`}>{step.label}</p>
            </div>
          </li>
        ))}
      </ol>

      {diagram.note && (
        <p className={`border-t px-5 py-3 text-xs ${mutedText} ${c.rule} ${c.strip}`}>{diagram.note[locale]}</p>
      )}
    </figure>
  )
}
