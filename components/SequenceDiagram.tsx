import { useLocale, useTranslations } from 'next-intl'
import type { Diagram, Locale } from '@/lib/content'
import { card, mutedText } from './ui'

const kindStyle: Record<Diagram['kind'], string> = {
  implemented: 'border-success-dark/40 text-success-dark dark:border-success/40 dark:text-success',
  illustrative: 'border-info-dark/40 text-info-dark dark:border-info/50 dark:text-[#93c5fd]',
  proposed: 'border-warning-dark/50 text-warning-dark dark:border-warning/50 dark:text-warning',
}

/**
 * Sequence diagram rendered as an ordered list, so it reads correctly with a screen reader,
 * reflows on narrow screens and never pretends to be more precise than the source.
 */
export default function SequenceDiagram({ diagram }: { diagram: Diagram }) {
  const locale = useLocale() as Locale
  const t = useTranslations('caseStudy')

  return (
    <figure className={`${card} overflow-hidden ${diagram.kind === 'proposed' ? 'border-dashed' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light dark:border-border-dark px-5 py-4">
        <figcaption className="font-semibold text-text-light-primary dark:text-text-dark-primary">{diagram.title[locale]}</figcaption>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${kindStyle[diagram.kind]}`}>
          {t(`diagram_${diagram.kind}`)}
        </span>
      </div>

      <ul className="flex flex-wrap gap-2 border-b border-border-light dark:border-border-dark bg-surface-light-muted dark:bg-surface-dark-muted px-5 py-3" aria-hidden="true">
        {diagram.participants.map((p) => (
          <li key={p} className="rounded-md border border-border-light-strong dark:border-border-dark-strong bg-surface-light-base dark:bg-surface-dark-base px-2 py-1 font-mono text-xs text-text-light-secondary dark:text-text-dark-secondary">
            {p}
          </li>
        ))}
      </ul>

      {/*
        Each step stacks the route ("A → B") above its description. The route wraps as a flex row,
        so long participant names never spill into the description column (previous layout bug).
      */}
      <ol className="divide-y divide-border-light dark:divide-border-dark">
        {diagram.steps[locale].map((step, i) => (
          <li key={i} className="flex gap-3 px-5 py-3">
            <span className={`w-6 shrink-0 font-mono text-xs leading-6 ${mutedText}`}>{String(i + 1).padStart(2, '0')}</span>
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
        <p className={`border-t border-border-light dark:border-border-dark px-5 py-3 text-xs ${mutedText}`}>{diagram.note[locale]}</p>
      )}
    </figure>
  )
}
