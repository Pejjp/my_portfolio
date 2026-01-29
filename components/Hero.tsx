import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { LuGithub, LuLinkedin, LuArrowRight } from 'react-icons/lu'
import myAvatarCol from '../public/my_avatar_transp_col.png'; 

import Image from 'next/image';

const Hero = () => {
  const hero = useTranslations("hero")
  const common = useTranslations("common")

  const videoAvatar = "../public/my_avatar_anim.mp4";

  return (
    
    <section 
      className='relative w-full'
      id="hero">
      {/* Mobile: Image on top with text overlay */}
      <div className='w-full md:hidden flex flex-col items-center gap-2 justify-center '>
        {/* Top greeting */}
        <div className='w-fit bg-surface-light-elevated dark:bg-surface-dark-elevated px-4 py-2 rounded-full border border-border-light dark:border-border-dark shadow-sm'>
          <p className='text-base text-text-light-secondary dark:text-text-dark-secondary'>{hero("hey")}!</p>
        </div>            
        <div className='flex flex-col items-center'>
          <h1 className='text-5xl lg:text-9xl font-bold'>
             {hero("name")} <span className='text-brand-accent'>Jeff</span>,
          </h1>
          <h2 className='text-xl lg:text-2xl text-text-light-secondary dark:text-text-dark-secondary mt-2'>
            {hero("welcome")}
          </h2>
        </div>  

        <div className='relative w-full flex justify-center'>
          <Image 
            src={myAvatarCol} 
            alt='my_avatar' 
            width={300} 
            height={300} 
            className='w-64 h-auto object-contain'
          />
        </div>
        
        <div className='flex flex-col items-center space-y-3'>
          <div className='flex-1 flex-col items-center space-y-6'>
            {/* CTA Buttons */}
            <div className='flex flex-row gap-4 items-center justify-center pt-4'>
              <Link 
                href="#projects"
                className='group bg-gradient-accent dark:bg-gradient-dark px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-accent-lg dark:hover:shadow-dark-glow hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50 flex items-center gap-2'
              >
                Portfolio
                <LuArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' strokeWidth={2}/>
              </Link>
              <Link 
                href="#contact"
                className='px-6 py-3 rounded-full border-2 border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary font-semibold transition-all duration-300 hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50'
              >
                {common("hire_me")}
              </Link>
            </div>

            {/* Stats */}
            <div className='flex items-start justify-end gap-3'>
              <div className='flex-1 flex flex-col items-end justify-end'>
                <p className='text-2xl font-bold text-brand-accent'>{common("project")}</p>
                <p className='text-sm text-text-light-secondary dark:text-text-dark-secondary'>{hero("impact")}</p>
              </div>
              <div className='w-px h-16 bg-border-light dark:bg-border-dark'></div>
              <div className='flex-1 flex-wrap'>
                <p className='text-2xl font-bold text-brand-accent'>{hero("major")}</p>
                <p className='text-sm text-text-light-secondary dark:text-text-dark-secondary'>{hero("degree")}</p>
              </div>
            </div>              
          </div>            

          {/* - Social links  */}
          <div className='flex flex-row gap-3'>
            <Link 
              href="https://github.com/Pejjp" 
              className='group bg-gradient-accent dark:bg-gradient-dark px-5 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-accent-lg dark:hover:shadow-dark-glow hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50 flex items-center gap-2'
            >
              <LuGithub className='w-5 h-5' strokeWidth={2}/>
            </Link>
            <Link 
              href="http://linkedin.com/in/jeff-pendy-910b502b2" 
              className='px-5 py-2 rounded-full border-2 border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary font-semibold transition-all duration-300 hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50'

            >
              <LuLinkedin className='w-5 h-5' strokeWidth={2}/>
            </Link>
          </div>
        </div>
      </div> 

      {/* Desktop: Professional layout with centered image */}
      <div className='hidden md:flex flex-col items-center justify-center'>
        {/* Top greeting */}
        <div className='w-fit bg-surface-light-elevated dark:bg-surface-dark-elevated px-4 py-2 rounded-full border border-border-light dark:border-border-dark shadow-sm'>
          <p className='text-base text-text-light-secondary dark:text-text-dark-secondary'>{hero("hey")}!</p>
        </div>            
        <div className='flex flex-col items-center'>
          <h1 className='text-5xl lg:text-9xl font-bold'>
             {hero("name")} <span className='text-brand-accent'>Jeff</span>,
          </h1>
          <h2 className='text-xl lg:text-2xl text-text-light-secondary dark:text-text-dark-secondary mt-2'>
            {hero("welcome")}
          </h2>
        </div>        
        <div className='flex flex-row items-start justify-between max-w-7xl'>
          {/* Left side content */}
          <div className='flex-1 flex-col items-center space-y-6 pt-32'>
            {/* Stats */}
            <div className='flex items-center gap-8'>
              <div>
                <p className='text-2xl font-bold text-brand-accent'>{common("project")}</p>
                <p className='text-sm text-text-light-secondary dark:text-text-dark-secondary'>{hero("impact")}</p>
              </div>
              <div className='w-px h-12 bg-border-light dark:bg-border-dark'></div>
              <div className='flex items-center gap-2'>
                <div>
                  <p className='text-2xl font-bold text-brand-accent'>{hero("major")}</p>
                  <p className='text-sm text-text-light-secondary dark:text-text-dark-secondary'>{hero("degree")}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-row gap-4 items-center pt-4'>
              <Link 
                href="#projects"
                className='group bg-gradient-accent dark:bg-gradient-dark px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-accent-lg dark:hover:shadow-dark-glow hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50 flex items-center gap-2'
              >
                Portfolio
                <LuArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' strokeWidth={2}/>
              </Link>
              <Link 
                href="#contact"
                className='px-6 py-3 rounded-full border-2 border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary font-semibold transition-all duration-300 hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50'
              >
                {common("hire_me")}
              </Link>
            </div>
          </div>

          {/* Avatar */} 
          <div className="flex flex-1 justify-center items-center">
              <Image
                src={myAvatarCol}
                alt="my_avatar"
                width={200}
                height={200}
                className="w-auto h-auto object-contain"
              />
          </div>


          {/* Right side */}
          <div className='flex-1 flex flex-col items-end space-y-4 pt-32'>
            {/* Testimonial/Quote */}
            <div className='flex flex-row'>
              <span className='relative top-[-30] text-6xl text-brand-accent'>"</span>                
              <p className='text-lg text-text-light-secondary dark:text-text-dark-secondary font-semibold'>
                {hero("personal")}
              </p>
            </div>


            {/* - Social links  */}
            <div className='flex flex-row gap-3'>
              <Link 
                href="https://github.com/Pejjp" 
                className='group bg-gradient-accent dark:bg-gradient-dark px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-accent-lg dark:hover:shadow-dark-glow hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50 flex items-center gap-2'
              >
                <LuGithub className='w-6 h-6' strokeWidth={2}/>
              </Link>
              <Link 
                href="http://linkedin.com/in/jeff-pendy-910b502b2" 
                className='px-6 py-3 rounded-full border-2 border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary font-semibold transition-all duration-300 hover:bg-surface-light-elevated dark:hover:bg-surface-dark-elevated hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-400/50'

              >
                <LuLinkedin className='w-6 h-6' strokeWidth={2}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero