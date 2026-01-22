"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import { useState, useTransition } from "react";

export type Lang = "en" | "fr"

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  
  const currentLang = pathname.startsWith("/fr") ? "fr" : "en";
  const [displayLang, setDisplayLang] = useState<Lang>(currentLang);

  const toggleLanguage = () => {
    const newLang: Lang = currentLang === 'en' ? 'fr' : 'en';
    
    // Update the display state immediately for animation
    setDisplayLang(newLang);
    
    // Delay the actual route change to let animation complete
    setTimeout(() => {
      if (newLang !== locale) {
        const newPath = pathname.replace(/^\/(en|fr)/, `/${newLang}`);
        startTransition(() => {
          router.push(newPath);
        });
      }
    }, 300);
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="relative w-20 h-10 md:w-25 md:h-12 bg-gradient-accent dark:bg-gradient-dark rounded-full p-2 md:p-1 transition-all duration-300 hover:shadow-accent dark:hover:shadow-dark-glow hover:scale-105 focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-accent-400/50 dark:focus:ring-accent-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Toggle language"
    >
      <div className="relative w-full h-full flex items-center gap-3 md:gap-5 justify-between px-2 md:px-2 text-white font-semibold text-xs md:text-sm">
        <span className={`z-10 transition-opacity duration-300 ${displayLang === 'en' ? 'opacity-100' : 'opacity-50'}`}>
          EN
        </span>
        <span className={`z-10 transition-opacity duration-300 ${displayLang === 'fr' ? 'opacity-100' : 'opacity-50'}`}>
          FR
        </span>
      </div>
      
      <div
        className={`z-20 absolute top-0.5 left-0.5 md:top-1 md:left-1 w-9 h-9 md:w-10 md:h-10 bg-surface-light-base dark:bg-surface-dark-elevated rounded-full shadow-md md:shadow-accent transition-transform duration-300 ease-in-out ${
          displayLang === 'fr' ? 'translate-x-10 md:translate-x-8' : 'translate-x-0'
        }`}
      >
        <div className="flex items-center justify-center h-full text-brand-accent font-bold text-xs md:text-sm">
          {displayLang.toUpperCase()}
        </div>
      </div>
    </button>
  );
}