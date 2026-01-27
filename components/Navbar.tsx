"use client"
import Link from "next/link"
import { useState } from "react"
import { HiBriefcase, HiCursorClick, HiFolderOpen, HiMenuAlt2, HiPhone, HiX } from "react-icons/hi";
import Image from "next/image"
import ThemeToggle from "./ThemeToggle";
import { LanguageSwitcher } from "./SwitchLang";
import { useTranslations } from "next-intl";
import { LuArrowRight, LuChevronRight } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";


export type Lang = "en" | "fr";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [language, setLanguage] = useState<Lang>("en");
  const router = useRouter();

  const ScrollTo = (id: string) => {
      router.push(`#${id}`);
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
  }
  const contact = useTranslations("contact")
  const common = useTranslations("common")
  const nav = useTranslations("nav")
  const work_exp = useTranslations("work_exp")

  return (
    <>
      <nav className="sticky top-0 w-full bg-surface-light-base/80 dark:bg-surface-dark-base/80 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm z-50 transition-colors duration-300">
        <div className="mx-auto max-w-8xl px-3 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex flex-row items-center gap-2 md:gap-3 group">
            <div className="bg-gradient-accent rounded-lg md:rounded-xl p-0.5 md:p-1 shadow-accent-sm 
                  group-hover:shadow-accent transition-all duration-300 group-hover:scale-105
                  shrink-0">
              <Image
                src="/logo_white.png"
                alt="my logo"
                width={32}
                height={32}
                className="md:w-10 md:h-10 rounded-md md:rounded-lg"
              />
            </div>
            <h2 className="text-lg md:text-xl font-bold bg-gradient-accent-to-r bg-clip-text text-transparent">
              JeffPendy
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-row gap-6 lg:gap-8 text-sm lg:text-base text-text-light-secondary dark:text-text-dark-secondary font-semibold">
            <Link 
              href="#hero" 
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200 relative group"
            >
              {nav("home")}
            </Link>   
            <Link 
              href="#about" 
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200 relative group"
            >
              {common("about")}
            </Link>                     
            <Link 
              href="#projects" 
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200 relative group"
            >
              {common("project")}
            </Link>
            <Link 
              href="#work-experience" 
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200 relative group"
            >
              {work_exp("my_exp")}
            </Link>            
            <Link 
              href="#contact" 
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-200 relative group"
            >
              {contact("contact_me")}
            </Link>            
          </div>

          {/* Actions */}
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center scale-90 md:scale-100">
              <ThemeToggle />
            </div>
            <div className="flex items-center scale-90 md:scale-100">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-1.5 md:p-2 rounded-lg hover:bg-surface-light-muted dark:hover:bg-surface-dark-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileNavOpen ? (
                <HiX className="w-5 h-5 md:w-6 md:h-6 text-text-light-primary dark:text-text-dark-primary" />
              ) : (
                <HiMenuAlt2 className="w-5 h-5 md:w-6 md:h-6 text-text-light-primary dark:text-text-dark-primary" />
              )}
            </button>            
          </div>      

        </div>
      </nav>

      {/* Mobile Menu Overlay - Blurs the entire page including navbar */}
      <div
        className={`lg:hidden fixed inset-0 bg-surface-dark-base/10 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isMobileNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Mobile Menu - Full height sidebar */}
      <div
        className={`lg:hidden fixed top-16 bottom-0 right-0 w-4/6 max-w-sm h-fit transition-transform duration-300 ease-in-out z-50 ${
          isMobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Content */}
        <div className="flex flex-col flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Mobile Navigation Links */}
          <nav className="space-y-2 sm:space-y-3" 
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Link href="#hero"
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="block text-base sm:text-lg font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-accent transition-colors
              bg-light-100 p-3 rounded-full bg-opacity-75
              bg-light-100/60 dark:bg-white/10
              dark:backdrop-blur-1xl
              border-white/30 dark:border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              duration-300
             dark:hover:bg-white/15              
              border-2 "
            >
              <div className="flex flex-row items-center justify-between gap-3">
                <HiFolderOpen className="w-4 h-4 sm:w-5 sm:h-5 " />
                <span>{nav("home")}</span>
                <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8"/>
              </div>
            </Link>

            <Link href="#about" 
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="block text-base sm:text-lg font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-accent transition-colors
              bg-light-100 p-3 rounded-full bg-opacity-75
              bg-light-100/60 dark:bg-white/10
              dark:backdrop-blur-1xl
              border-white/30 dark:border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              duration-300
             dark:hover:bg-white/15              
              border-2 "
            >
              <div className="flex flex-row items-center justify-between gap-3">
                <HiCursorClick className="w-4 h-4 sm:w-5 sm:h-5 " />
                <span>{common("about")}</span>
                <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8"/>
              </div>
            </Link> 
            <Link href="#projects"
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="block text-base sm:text-lg font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-accent transition-colors
              bg-light-100 p-3 rounded-full bg-opacity-75
              bg-light-100/60 dark:bg-white/10
              dark:backdrop-blur-1xl
              border-white/30 dark:border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              duration-300
             dark:hover:bg-white/15              
              border-2 "
            >
              <div className="flex flex-row items-center justify-between gap-3">
                <HiFolderOpen className="w-4 h-4 sm:w-5 sm:h-5 " />
                <span>{common("project")}</span>
                <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8"/>
              </div>
            </Link>                          
            <Link href="#work-experience"
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="block text-base sm:text-lg font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-accent transition-colors
              bg-light-100 p-3 rounded-full bg-opacity-75
              bg-light-100/60 dark:bg-white/10
              dark:backdrop-blur-1xl
              border-white/30 dark:border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              duration-300
             dark:hover:bg-white/15              
              border-2 "
            >
              <div className="flex flex-row items-center justify-between gap-3">
                <HiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 " />
                <span className="line-clamp-1">{work_exp("my_exp")}</span>
                <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8"/>
              </div>
            </Link>     

            <Link href="#contact"
              onClick={(event)=>ScrollTo(event.currentTarget.id)}
              className="block text-base sm:text-lg font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-accent transition-colors
              bg-light-100 p-3 rounded-full bg-opacity-75
              bg-light-100/60 dark:bg-white/10
              dark:backdrop-blur-1xl
              border-white/30 dark:border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              duration-300
             dark:hover:bg-white/15              
              border-2 "
            >
              <div className="flex flex-row items-center justify-between gap-3">
                <HiPhone className="w-4 h-4 sm:w-5 sm:h-5 " />
                <span>{contact("contact_me")}</span>
                <LuChevronRight className="w-5 h-5 sm:w-8 sm:h-8"/>
              </div>
            </Link>                     
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar