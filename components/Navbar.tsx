"use client"
import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { HiMenuAlt2, HiX } from "react-icons/hi"
import { Link } from "@/i18n/navigation"
import ThemeToggle from "./ThemeToggle"
import { LanguageSwitcher } from "./SwitchLang"
import { focusRing } from "./ui"
import { resumeHref, type Locale } from "@/lib/content"

/** Section anchors on the home page. Links work from any page because they target `/#id`. */
const sections = [
  { key: "home", hash: "hero" },
  { key: "work", hash: "work-experience" },
  { key: "projects", hash: "projects" },
  { key: "about", hash: "about" },
  { key: "contact", hash: "contact" },
] as const

const linkBase = `rounded-md transition-colors hover:text-accent-700 dark:hover:text-accent-500 ${focusRing}`

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const nav = useTranslations("nav")
  const a11y = useTranslations("a11y")
  const locale = useLocale() as Locale
  const menuId = useId()

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!isMobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileNavOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isMobileNavOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light/80 dark:border-border-dark/80 bg-surface-light-base/85 dark:bg-surface-dark-base/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href={{ pathname: "/", hash: "hero" }}
          className={`flex min-h-11 items-center gap-2.5 rounded-lg ${focusRing}`}
          aria-label={a11y("homeLink")}
        >
          <span className="rounded-lg bg-gradient-accent p-0.5 shadow-accent-sm">
            <Image src="/logo_white.png" alt="" width={32} height={32} className="h-8 w-8 rounded-md" />
          </span>
          <span className="text-lg font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            Jeff Pendy
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={a11y("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
            {sections.map((s) => (
              <li key={s.key}>
                <Link href={{ pathname: "/", hash: s.hash }} className={`inline-flex min-h-11 items-center px-3 ${linkBase}`}>
                  {nav(s.key)}
                </Link>
              </li>
            ))}
            <li>
              <a href={resumeHref(locale)} className={`inline-flex min-h-11 items-center px-3 ${linkBase}`}>
                {nav("resume")}
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((open) => !open)}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted ${focusRing}`}
            aria-expanded={isMobileNavOpen}
            aria-controls={menuId}
            aria-label={isMobileNavOpen ? a11y("closeMenu") : a11y("openMenu")}
          >
            {isMobileNavOpen ? <HiX className="h-6 w-6" aria-hidden="true" /> : <HiMenuAlt2 className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation: only rendered when open, so hidden links are never focusable. */}
      {isMobileNavOpen && (
        <nav
          id={menuId}
          aria-label={a11y("mainNav")}
          className="lg:hidden border-t border-border-light dark:border-border-dark bg-surface-light-base dark:bg-surface-dark-base"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 text-base font-semibold text-text-light-secondary dark:text-text-dark-secondary">
            {sections.map((s) => (
              <li key={s.key}>
                <Link
                  href={{ pathname: "/", hash: s.hash }}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`flex min-h-12 items-center px-2 ${linkBase}`}
                >
                  {nav(s.key)}
                </Link>
              </li>
            ))}
            <li>
              <a href={resumeHref(locale)} className={`flex min-h-12 items-center px-2 ${linkBase}`}>
                {nav("resume")}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
