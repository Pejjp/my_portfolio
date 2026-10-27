import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { LuArrowRight, LuFileText } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import myAvatarCol from '../public/my_avatar_transp_col.png'
import { resumeHref, type Locale } from '@/lib/content'
import { accentText, buttonPrimary, buttonSecondary, mutedText, textLink } from './ui'

const Hero = () => {
  const hero = useTranslations('hero')
  const trust = useTranslations('trust')
  const locale = useLocale() as Locale

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative w-full pt-10 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <p className={`font-mono text-xs md:text-sm uppercase tracking-[0.18em] ${accentText}`}>{hero('eyebrow')}</p>
          <h1
            id="hero-title"
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-text-light-primary dark:text-text-dark-primary text-balance"
          >
            {hero('headline')}
          </h1>
          <p className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed ${mutedText}`}>{hero('intro')}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={{ pathname: '/', hash: 'projects' }} className={buttonPrimary}>
              {hero('ctaPrimary')}
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a href={resumeHref(locale)} className={buttonSecondary}>
              <LuFileText className="h-5 w-5" aria-hidden="true" />
              {hero('ctaSecondary')}
            </a>
            <Link href={{ pathname: '/', hash: 'contact' }} className={`${textLink} px-2`}>
              {hero('ctaTertiary')}
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            src={myAvatarCol}
            alt={hero('avatarAlt')}
            sizes="(min-width: 1024px) 260px, 200px"
            className="h-auto w-[200px] lg:w-[260px] object-contain"
            preload
          />
        </div>
      </div>

      {/* Compact trust strip: facts only, no counters. */}
      <ul
        aria-label={trust('label')}
        className="mt-12 flex flex-col gap-3 border-y border-border-light dark:border-border-dark py-5 text-sm md:flex-row md:flex-wrap md:items-center md:gap-x-8 text-text-light-secondary dark:text-text-dark-secondary"
      >
        {(['degree', 'current', 'focus'] as const).map((key) => (
          <li key={key} className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-500" />
            {trust(key)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Hero
