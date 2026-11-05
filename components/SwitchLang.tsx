"use client";

import { useState, useTransition, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export type Lang = "en" | "fr";

/**
 * Original sliding EN/FR pill. It is a real link to the same page in the other locale,
 * so it works without JavaScript and keeps the current path (including project pages).
 * With JavaScript, the knob slides first, then the route changes.
 */
export function LanguageSwitcher() {
  const locale = useLocale() as Lang;
  const pathname = usePathname();
  const router = useRouter();
  const a11y = useTranslations("a11y");
  const [isPending, startTransition] = useTransition();
  const target: Lang = locale === "en" ? "fr" : "en";
  const [displayLang, setDisplayLang] = useState<Lang>(locale);
  // Reset the knob if the locale changed through another route.
  const [shownFor, setShownFor] = useState<Lang>(locale);
  if (shownFor !== locale) {
    setShownFor(locale);
    setDisplayLang(locale);
  }

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setDisplayLang(target);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Let the slide animation finish before navigating.
    setTimeout(() => {
      startTransition(() => router.replace(pathname, { locale: target }));
    }, reduceMotion ? 0 : 300);
  };

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      lang={target}
      onClick={onClick}
      aria-label={a11y("switchLanguage")}
      aria-disabled={isPending || undefined}
      className="relative block w-20 h-11 md:w-[6.25rem] md:h-12 bg-gradient-accent dark:bg-gradient-dark rounded-full p-2 md:p-1 transition-all duration-300 hover:shadow-accent motion-safe:hover:scale-105 focus:outline-none focus-visible:ring-2 md:focus-visible:ring-4 focus-visible:ring-accent-400/50 dark:focus-visible:ring-accent-600/50"
    >
      <span aria-hidden="true" className="relative w-full h-full flex items-center gap-3 md:gap-5 justify-between px-2 md:px-2 text-white font-semibold text-xs md:text-sm">
        <span className={`z-10 transition-opacity duration-300 ${displayLang === "en" ? "opacity-100" : "opacity-50"}`}>EN</span>
        <span className={`z-10 transition-opacity duration-300 ${displayLang === "fr" ? "opacity-100" : "opacity-50"}`}>FR</span>
      </span>

      <span
        aria-hidden="true"
        className={`z-20 absolute top-1 left-1 w-9 h-9 md:w-10 md:h-10 bg-surface-light-base dark:bg-surface-dark-elevated rounded-full shadow-md md:shadow-accent transition-transform duration-300 ease-in-out ${
          displayLang === "fr" ? "translate-x-9 md:translate-x-[3.25rem]" : "translate-x-0"
        }`}
      >
        <span className="flex items-center justify-center h-full text-brand-accent font-bold text-xs md:text-sm">
          {displayLang.toUpperCase()}
        </span>
      </span>
    </Link>
  );
}
