'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';

const noopSubscribe = () => () => {};

/** Original gradient theme toggle, with the resolved-theme and hydration fixes. */
export default function ThemeToggle() {
  // True on the client, false during SSR, without a setState-in-effect.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const a11y = useTranslations('a11y');

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="block w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface-light-muted dark:bg-surface-dark-muted motion-safe:animate-pulse"
      />
    );
  }

  // Use the resolved theme so "system" shows the right icon.
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full transition-all duration-500 transform motion-safe:hover:scale-110 focus:outline-none focus-visible:ring-2 md:focus-visible:ring-4 ${
        isDark
          ? 'bg-gradient-dark focus-visible:ring-accent-600/50 shadow-md md:shadow-lg'
          : 'bg-gradient-accent focus-visible:ring-accent-400/50 shadow-md md:shadow-lg'
      }`}
      aria-label={isDark ? a11y('themeToLight') : a11y('themeToDark')}
    >
      {/* Icons container */}
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <Sun
          className={`absolute w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          strokeWidth={2.5}
        />
        <Moon
          className={`absolute w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          strokeWidth={2.5}
        />
      </span>

      {/* Inner glow effect for dark mode */}
      <span
        aria-hidden="true"
        className={`absolute inset-1.5 md:inset-2 rounded-full bg-white/20 transition-all duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Subtle border */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full border transition-colors duration-300 ${isDark ? 'border-accent-500/30' : 'border-accent-400/30'}`}
      />
    </button>
  );
}
