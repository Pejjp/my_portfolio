import type { ReactNode } from 'react';
import type { ProjectStatus } from '@/lib/content';

/**
 * Shared visual primitives, matching the original site's look: gold gradient buttons,
 * brand-accent highlights and warm elevated surfaces.
 * Small accent text uses accent-700 in light mode for contrast; large text uses the brand gold.
 */

export const accentText = 'text-accent-700 dark:text-brand-accent';
export const brandText = 'text-brand-accent';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-400/60 dark:focus-visible:ring-accent-500/60';

/** Legacy primary button: gold gradient in light mode, dark gradient in dark mode. */
export const buttonPrimary = `group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white
  bg-gradient-accent dark:bg-gradient-dark dark:ring-1 dark:ring-accent-500/40
  shadow-accent-sm hover:shadow-accent-lg
  motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105 ${focusRing}`;

/** Legacy outlined button. */
export const buttonSecondary = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold
  border-2 border-border-light dark:border-border-dark
  text-text-light-primary dark:text-text-dark-primary
  hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated
  motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105 ${focusRing}`;

/** Legacy outlined gold button (the old "Hire me" style). */
export const buttonAccentOutline = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold
  border-2 border-brand-accent text-accent-700 dark:text-brand-accent
  hover:bg-brand-accent hover:text-white dark:hover:text-white hover:shadow-accent-lg
  motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105 ${focusRing}`;

/** Round icon button used for social links (GitHub, LinkedIn). */
export const iconButtonPrimary = `inline-flex h-12 w-12 items-center justify-center rounded-full text-white
  bg-gradient-accent dark:bg-gradient-dark dark:ring-1 dark:ring-accent-500/40 hover:shadow-accent-lg
  motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105 ${focusRing}`;
export const iconButtonSecondary = `inline-flex h-12 w-12 items-center justify-center rounded-full
  border-2 border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary
  hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated
  motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105 ${focusRing}`;

export const textLink = `inline-flex min-h-11 items-center gap-1.5 font-semibold underline-offset-4 hover:underline ${accentText} ${focusRing} rounded`;

/** Legacy elevated card surface. */
export const card =
  'rounded-2xl border border-border-light dark:border-border-dark bg-surface-light-elevated dark:bg-surface-dark-elevated';

export const mutedText = 'text-text-light-secondary dark:text-text-dark-secondary';

/** Centered, two-tone section title like the original site ("Let's have a look at my **Portfolio**"). */
export function SectionHeader({
  id,
  title,
  highlight,
  intro,
}: {
  id: string;
  title: string;
  highlight?: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto mb-10 md:mb-14 max-w-3xl text-center">
      <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary text-balance">
        {title}
        {highlight && <span className={brandText}> {highlight}</span>}
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
