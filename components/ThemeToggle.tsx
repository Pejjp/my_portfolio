'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { focusRing } from './ui';

const noopSubscribe = () => () => {};

export default function ThemeToggle() {
  // True on the client, false during SSR, without a setState-in-effect.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const a11y = useTranslations('a11y');

  const base = `inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted transition-colors ${focusRing}`;

  if (!mounted) {
    return <span className={base} aria-hidden="true" />;
  }

  // Use the resolved theme so "system" shows the right icon.
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={base}
      aria-label={isDark ? a11y('themeToLight') : a11y('themeToDark')}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
