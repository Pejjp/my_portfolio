import { useTranslations } from 'next-intl'
import Image from 'next/image'
import portrait from '../public/personal_image3.jpeg'
import { mutedText, SectionHeader } from './ui'

const AboutMe = () => {
  const about = useTranslations('about')

  return (
    <section id="about" aria-labelledby="about-title" className="w-full">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <Image
            src={portrait}
            alt={about('portraitAlt')}
            sizes="(min-width: 768px) 40vw, 384px"
            placeholder="blur"
            className="aspect-[4/5] w-full rounded-3xl object-cover object-center"
          />
        </div>

        <div>
          <SectionHeader id="about-title" eyebrow={about('eyebrow')} title={about('title')} />
          <p className="-mt-4 text-base md:text-lg leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
            {about('body')}
          </p>
          <h3 className="mt-10 text-lg font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            {about('approachTitle')}
          </h3>
          <p className={`mt-2 text-base leading-relaxed ${mutedText}`}>{about('approach')}</p>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
