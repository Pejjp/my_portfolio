"use client"
import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { HiBriefcase, HiCursorClick, HiDocumentText, HiFolderOpen, HiHome, HiMenuAlt2, HiPhone, HiX } from "react-icons/hi"
import { LuChevronRight } from "react-icons/lu"
import { Link } from "@/i18n/navigation"
import ThemeToggle from "./ThemeToggle"
import { LanguageSwitcher } from "./SwitchLang"
import { focusRing } from "./ui"
import { resumeHref, type Locale } from "@/lib/content"

/** Section anchors on the home page. Links target `/#id`, so they also work from project pages. */
const sections = [
  { key: "home", hash: "hero", Icon: HiHome },
  { key: "work", hash: "work-experience", Icon: HiBriefcase },
  { key: "projects", hash: "projects", Icon: HiFolderOpen },
  { key: "about", hash: "about", Icon: HiCursorClick },
  { key: "contact", hash: "contact", Icon: HiPhone },
] as const

const desktopLink = `inline-flex min-h-11 items-center rounded-md hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200 ${focusRing}`

// Glassy pill links from the original mobile menu.
const mobileLink = `block text-base sm:text-lg font-medium text-text-light-secondary dark:text-text-dark-secondary
  hover:text-brand-accent dark:hover:text-brand-accent transition-colors
  p-3 rounded-full bg-light-100/60 dark:bg-white/10 border-2 border-white/30 dark:border-white/10
  shadow-[0_8px_30px_rgba(0,0,0,0.12)] duration-300 dark:hover:bg-white/15 ${focusRing}`

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

  const close = () => setIsMobileNavOpen(false)

  return (
    <>
      <header className="sticky top-0 w-full bg-surface-light-base/80 dark:bg-surface-dark-base/80 backdrop-blur-md border-b
       border-border-light dark:border-border-dark shadow-sm z-50 transition-colors duration-300">
        <div className="mx-auto max-w-8xl px-3 lg:px-8 py-3 md:py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href={{ pathname: "/", hash: "hero" }}
            className={`flex flex-row items-center gap-2 md:gap-3 group rounded-xl ${focusRing}`}
            aria-label={a11y("homeLink")}
          >
            <span className="bg-gradient-accent rounded-lg md:rounded-xl p-0.5 md:p-1 shadow-accent-sm
                  group-hover:shadow-accent transition-all duration-300 motion-safe:group-hover:scale-105 shrink-0">
              <Image
                src="/logo_white.png"
                alt=""
                width={40}
                height={40}
                className="h-8 w-8 md:w-10 md:h-10 rounded-md md:rounded-lg"
              />
            </span>
            <span className="max-[359px]:sr-only text-lg md:text-xl font-bold bg-gradient-accent-to-r bg-clip-text text-transparent">
              JeffPendy
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label={a11y("mainNav")} className="hidden lg:block">
            <ul className="flex flex-row gap-6 lg:gap-8 text-sm lg:text-base text-text-light-secondary dark:text-text-dark-secondary font-semibold">
              {sections.map((s) => (
                <li key={s.key}>
                  <Link href={{ pathname: "/", hash: s.hash }} className={desktopLink}>
                    {nav(s.key)}
                  </Link>
                </li>
              ))}
              <li>
                <a href={resumeHref(locale)} className={desktopLink}>
                  {nav("resume")}
                </a>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted transition-colors ${focusRing}`}
              aria-expanded={isMobileNavOpen}
              aria-controls={menuId}
              aria-label={isMobileNavOpen ? a11y("closeMenu") : a11y("openMenu")}
            >
              {isMobileNavOpen ? (
                <HiX className="w-6 h-6 text-text-light-primary dark:text-text-dark-primary" aria-hidden="true" />
              ) : (
                <HiMenuAlt2 className="w-6 h-6 text-text-light-primary dark:text-text-dark-primary" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay: blurs the page behind the menu */}
      <div
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 bg-surface-dark-base/10 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isMobileNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Mobile menu: slides in from the right. `inert` keeps hidden links out of the tab order. */}
      <nav
        id={menuId}
        aria-label={a11y("mainNav")}
        inert={!isMobileNavOpen}
        className={`lg:hidden fixed top-16 md:top-[4.75rem] right-0 w-4/6 max-w-sm h-fit transition-transform duration-300 ease-in-out z-50 ${
          isMobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-3">
          {sections.map(({ key, hash, Icon }) => (
            <li key={key}>
              <Link href={{ pathname: "/", hash }} onClick={close} className={mobileLink}>
                <span className="flex flex-row items-center justify-between gap-3">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span>{nav(key)}</span>
                  <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <a href={resumeHref(locale)} onClick={close} className={mobileLink}>
              <span className="flex flex-row items-center justify-between gap-3">
                <HiDocumentText className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span>{nav("resume")}</span>
                <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8" aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
