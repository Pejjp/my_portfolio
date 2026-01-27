import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import myImageDaylight from '../public/my_image_daylight.png'

const AboutMe = () => {
  const about = useTranslations("about")
  const common = useTranslations("common")

  return (
    <section id="about"
      className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center gap-8'
    >
      {/* Heading */}
      <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center'>
        {about("why")}  <span className='text-brand-accent'> {common("hire_me")} </span> ?
      </h2>

      <div className='flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16'>
  
        {/* Image */}
        <div className='relative w-full md:w-1/2 flex justify-center md:justify-start'>
            <div className='w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] flex items-end justify-center'>
              <Image 
                src={myImageDaylight} 
                alt='Jeff Pendy' 
                width={400} 
                height={400} 
                className='w-full h-full object-cover object-center rounded-5xl '
              />
            </div>
        </div>

        {/* Right side - Content */}
        <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left'>
          {/* Description */}
          <p className='text-sm md:text-base lg:text-lg text-text-light-secondary dark:text-text-dark-secondary mb-8 md:mb-10 max-w-xl'>
          {about("about_me")}  
          </p>
          {/* CTA Button */}
          <Link 
            href="#contact"
            className='px-8 md:px-10 py-3 md:py-4 rounded-full border-2 border-brand-accent text-brand-accent font-semibold text-base md:text-lg transition-all duration-300 hover:bg-brand-accent hover:text-white hover:shadow-accent-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50'
          >
            {common("hire_me")}
          </Link>
        </div>
      </div>
    </section>

  )
}

export default AboutMe