import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { LuArrowUpRight } from 'react-icons/lu'

interface CurvedCardProps {
  image: string;
  link: string;
  buttonColor?: 'accent' | 'dark';
}

const CurvedImageCard: React.FC<CurvedCardProps> = ({ 
  image, 
  link, 
  buttonColor = 'accent' 
}) => {
  return (
    <Link 
      href={link}
      className='group block relative overflow-hidden rounded-3xl aspect-square transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]'
    >
      {/* Background Image */}
      <div className='absolute inset-0 bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-9xl text-brand-accent/20'>📱</div>
        </div>
      </div>

      {/* SVG Curved Cutout Mask */}
      <svg 
        className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none z-10"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="curvedCutout">
            <path d="M 0 160 L 160 160 L 160 0 Q 100 40, 0 100 Z" />
          </clipPath>
        </defs>
        <rect 
          width="160" 
          height="160" 
          className="fill-surface-light-base dark:fill-surface-dark-base"
          clipPath="url(#curvedCutout)"
        />
      </svg>

      {/* Arrow Button */}
      <div className='absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20'>
        <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          buttonColor === 'accent'
            ? 'bg-brand-accent text-white hover:shadow-accent-lg' 
            : 'bg-text-light-primary dark:bg-text-dark-primary text-white hover:shadow-xl'
        } group-hover:scale-110 group-hover:rotate-45`}>
          <LuArrowUpRight className='w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10' strokeWidth={2}/>
        </div>
      </div>
    </Link>
  )
}

// Example usage component
const CurvedCardExample = () => {
  return (
    <div className='w-full p-8 bg-surface-light-elevated dark:bg-surface-dark-elevated min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-text-light-primary dark:text-text-dark-primary'>
          Curved Image Cards
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <CurvedImageCard 
            image="/project1.jpg"
            link="/project/1"
            buttonColor="accent"
          />
          <CurvedImageCard 
            image="/project2.jpg"
            link="/project/2"
            buttonColor="dark"
          />
          <CurvedImageCard 
            image="/project3.jpg"
            link="/project/3"
            buttonColor="accent"
          />
        </div>
      </div>
    </div>
  )
}

export default CurvedCardExample