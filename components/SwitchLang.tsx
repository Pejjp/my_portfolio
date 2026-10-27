"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { focusRing } from "./ui";

/**
 * Plain link to the same page in the other locale, so it works without JavaScript,
 * keeps the current path (including project pages) and is crawlable.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const a11y = useTranslations("a11y");
  const target = locale === "en" ? "fr" : "en";

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      lang={target}
      aria-label={a11y("switchLanguage")}
      className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-border-light dark:border-border-dark px-3 font-mono text-sm font-semibold text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted transition-colors ${focusRing}`}
    >
      {target.toUpperCase()}
    </Link>
  );
}
