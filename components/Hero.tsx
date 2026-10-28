import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { LuArrowRight, LuDownload, LuGithub, LuLinkedin } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import myAvatarCol from '../public/my_avatar_transp_col.png'
import { resumeHref, site, type Locale } from '@/lib/content'
import { brandText, buttonPrimary, buttonSecondary, iconButtonPrimary, iconButtonSecondary, mutedText, textLink } from './ui'

/**
 * Original hero layout (greeting pill, large centered title, avatar in the middle,
 * stats and CTAs on one side, statement and social links on the other) with the new copy.
 * Rendered once; the order changes with CSS instead of duplicating mobile and desktop markup.
 */
const Hero = () => {
  const hero = useTranslations('hero')
  const trust = useTranslations('trust')
  const a11y = useTranslations('a11y')
  const locale = useLocale() as Locale

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative w-full">
      <div className="flex flex-col items-center text-center">
        {/* Top greeting pill */}
        <p className="w-fit bg-surface-light-elevated dark:bg-surface-dark-elevated px-4 py-2 rounded-full border border-border-light dark:border-border-dark shadow-sm text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary">
          {hero('greeting')}
        </p>
        <h1
          id="hero-title"
          className="mt-5 text-5xl sm:text-6xl lg:text-9xl font-bold leading-[1.05] text-text-light-primary dark:text-text-dark-primary"
        >
          {hero.rich('title', { hl: (chunks) => <span className={brandText}>{chunks}</span> })}
        </h1>
        <p className="mt-3 max-w-3xl text-xl lg:text-2xl font-medium text-text-light-secondary dark:text-text-dark-secondary text-balance">
          {hero.rich('headline', { hl: (chunks) => <span className={brandText}>{chunks}</span> })}
        </p>
      </div>

      <div className="mt-8 grid items-start gap-8 md:mt-4 md:grid-cols-[1fr_minmax(0,300px)_1fr] md:gap-8 max-w-7xl mx-auto">
        {/* Avatar: center column on desktop, first on mobile */}
        <div className="order-1 md:order-2 flex justify-center">
          <Image
            src={myAvatarCol}
            alt={hero('avatarAlt')}
            sizes="(min-width: 768px) 300px, 176px"
            className="w-44 md:w-full md:max-w-[300px] h-auto object-contain"
            preload
          />
        </div>

        {/* Left: stats and CTAs */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-6 md:pt-24">
          <div className="flex items-start gap-6">
            <div className="text-right md:text-left">
              <p className={`text-xl md:text-2xl font-bold ${brandText}`}>{trust('degreeValue')}</p>
              <p className={`text-sm ${mutedText}`}>{trust('degreeLabel')}</p>
            </div>
            <div className="w-px self-stretch bg-border-light dark:bg-border-dark" aria-hidden="true" />
            <div className="text-left">
              <p className={`text-xl md:text-2xl font-bold ${brandText}`}>{trust('roleValue')}</p>
              <p className={`text-sm ${mutedText}`}>{trust('roleLabel')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Link href={{ pathname: '/', hash: 'projects' }} className={buttonPrimary}>
              {hero('ctaPrimary')}
              <LuArrowRight className="w-5 h-5 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform" aria-hidden="true" strokeWidth={2} />
            </Link>
            <a href={resumeHref(locale)} className={buttonSecondary}>
              <LuDownload className="w-5 h-5" aria-hidden="true" strokeWidth={2} />
              {hero('ctaSecondary')}
            </a>
          </div>
        </div>

        {/* Right: statement and social links */}
        <div className="order-3 flex flex-col items-center md:items-end gap-5 md:pt-24 text-center md:text-right">
          <p className={`text-base md:text-lg font-medium leading-relaxed ${mutedText}`}>{hero('intro')}</p>
          <div className="flex flex-row items-center gap-3">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={iconButtonPrimary} aria-label={`${a11y('github')} ${a11y('newTab')}`}>
              <LuGithub className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={iconButtonSecondary} aria-label={`${a11y('linkedin')} ${a11y('newTab')}`}>
              <LuLinkedin className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </a>
            <Link href={{ pathname: '/', hash: 'contact' }} className={`${textLink} px-2`}>
              {hero('ctaTertiary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
