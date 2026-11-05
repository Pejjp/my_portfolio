import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import portrait from '../public/personal_image3.jpeg'
import { buttonAccentOutline, mutedText, SectionHeader } from './ui'

/** Original "Why hire me" layout (centered title, rounded portrait, gold outlined CTA) with the new copy. */
const AboutMe = () => {
  const about = useTranslations('about')
  const hero = useTranslations('hero')

  return (
    <section id="about" aria-labelledby="about-title" className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <SectionHeader id="about-title" title={about('title')} highlight={about('titleHighlight')} />

      <div className="flex w-full flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Image */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
            <Image
              src={portrait}
              alt={about('portraitAlt')}
              sizes="(min-width: 1024px) 450px, (min-width: 768px) 384px, 288px"
              placeholder="blur"
              className="w-full h-full object-cover object-center rounded-5xl"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-text-light-secondary dark:text-text-dark-secondary max-w-xl">
            {about('body')}
          </p>
          <h3 className="mt-8 text-lg md:text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{about('approachTitle')}</h3>
          <p className={`mt-2 mb-8 md:mb-10 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl ${mutedText}`}>{about('approach')}</p>
          <Link href={{ pathname: '/', hash: 'contact' }} className={buttonAccentOutline}>
            {hero('ctaTertiary')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
