import type { ReactNode } from 'react';
import type { ProjectStatus } from '@/lib/content';

/**
 * Shared visual primitives. Accent text uses accent-700 on light backgrounds
 * (the brand gold #c08301 is below 4.5:1 on white) and accent-500 on dark ones.
 */

export const accentText = 'text-accent-700 dark:text-accent-500';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light-base dark:focus-visible:ring-accent-500 dark:focus-visible:ring-offset-surface-dark-base';

export const buttonPrimary = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-semibold
  bg-accent-700 text-white hover:bg-accent-800
  dark:bg-accent-500 dark:text-dark-950 dark:hover:bg-accent-400
  transition-colors ${focusRing}`;

export const buttonSecondary = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-semibold
  border border-border-light-strong dark:border-border-dark-strong
  text-text-light-primary dark:text-text-dark-primary
  hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated
  transition-colors ${focusRing}`;

export const textLink = `inline-flex min-h-11 items-center gap-1.5 font-semibold underline-offset-4 hover:underline ${accentText} ${focusRing} rounded`;

export const card =
  'rounded-2xl border border-border-light dark:border-border-dark bg-surface-light-base dark:bg-surface-dark-elevated';

export const mutedText = 'text-text-light-muted dark:text-text-dark-muted';

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-10 md:mb-14 max-w-3xl">
      {eyebrow && (
        <p className={`font-mono text-xs md:text-sm uppercase tracking-[0.18em] mb-3 ${accentText}`}>{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl md:text-4xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
        {title}
      </h2>
      {intro && <p className={`mt-4 text-base md:text-lg ${mutedText}`}>{intro}</p>}
    </header>
  );
}

const statusStyles: Record<ProjectStatus, string> = {
  shipped: 'border-success-dark/40 text-success-dark dark:border-success/40 dark:text-success',
  inProgress: 'border-accent-700/40 text-accent-700 dark:border-accent-500/40 dark:text-accent-500',
  prototype: 'border-info-dark/40 text-info-dark dark:border-info/50 dark:text-[#93c5fd]',
  concept: 'border-border-light-strong text-text-light-muted dark:border-border-dark-strong dark:text-text-dark-muted',
};

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-border-light dark:border-border-dark bg-surface-light-muted dark:bg-surface-dark-muted px-2.5 py-1 font-mono text-xs text-text-light-secondary dark:text-text-dark-secondary">
      {children}
    </li>
  );
}

export function ChipList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  );
}
