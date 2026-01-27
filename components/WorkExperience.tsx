import { useTranslations } from 'next-intl'
import React from 'react'

type Experience = {
  company: string;
  period: string;
  role: string;
  bullets:string[],
  description?: string;
  isActive?: boolean;
}

const WorkExperience = () => {
    const t = useTranslations();
    const experiences = t.raw("experiences") as Experience[];  
    const work_exp = useTranslations("work_exp")

  return (
      <section 
        className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'
        id="work-experience">
        {/* Section Title */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-text-light-primary dark:text-text-dark-primary'>
          {work_exp("my_exp")}
        </h2>

        {/* Timeline */}
        <div className='relative'>
          {/* Center line - hidden on mobile */}
          <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border-light dark:bg-border-dark'></div>

          {/* Experience items */}
          <div className='space-y-8 md:space-y-12'>
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className='relative'
              >
                {/* Mobile layout */}
                <div className='md:hidden flex gap-4'>
                  {/* Left side - Timeline dot and line */}
                  <div className='flex flex-col items-center'>
                    <div className={`w-4 h-4 rounded-full border-4 ${
                      exp.isActive 
                        ? 'bg-brand-accent border-brand-accent shadow-accent' 
                        : 'bg-surface-light-muted dark:bg-surface-dark-muted border-border-light dark:border-border-dark'
                    }`}></div>
                    {index !== experiences.length && (
                      <div className='w-0.5 flex-1 bg-border-light dark:bg-border-dark mt-2'></div>
                    )}
                  </div>

                  {/* Right side - Content */}
                  <div className='flex-1 pb-8'>
                    <div className='mb-3'>
                      <h3 className='text-lg font-bold text-text-light-primary dark:text-text-dark-primary'>
                        {exp.company}
                      </h3>
                      <p className='text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1'>
                        {exp.period}
                      </p>
                    </div>
                    <div className='bg-surface-light-elevated dark:bg-surface-dark-elevated p-4 rounded-xl border border-border-light dark:border-border-dark'>
                      <h4 className='text-base font-semibold text-brand-accent mb-2'>
                        {exp.role}
                      </h4>
                      <p 
                      className='text-sm italic text-text-light-secondary dark:text-text-dark-secondary'
                      >
                        {exp.description}
                      </p>                      
                      <ul
                        className="space-y-2 list-disc list-inside"
                      >
                        {exp.bullets.map((bullet,index)=>(
                            <li key={index}
                                className='text-sm text-text-light-secondary dark:text-text-dark-secondary'
                            >
                                {bullet}
                            </li>
                        ))}
                      </ul>

                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className='hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12'>
                  {/* Alternate sides */}
                  {index % 2 === 0 ? (
                    <>
                      {/* Left side - Company info */}
                      <div className='text-right pr-8 lg:pr-12'>
                        <h3 className='text-xl lg:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary'>
                          {exp.company}
                        </h3>
                        <p className='text-sm lg:text-base text-text-light-secondary dark:text-text-dark-secondary mt-2'>
                          {exp.period}
                        </p>
                      </div>

                      {/* Right side - Role & description */}
                      <div className='pl-8 lg:pl-12'>
                        <div className='bg-surface-light-elevated dark:bg-surface-dark-elevated p-6 rounded-xl border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow duration-300'>
                          <h4 className='text-lg lg:text-xl font-semibold text-brand-accent mb-3'>
                            {exp.role}
                          </h4>
                          <p className='text-sm lg:text-base italic text-text-light-secondary dark:text-text-dark-secondary'>
                            {exp.description}
                          </p>
                            <ul
                                className="space-y-2 list-disc list-inside"
                            >
                                {exp.bullets.map((bullet,index)=>(
                                    <li key={index}
                                        className='text-text-light-secondary dark:text-text-dark-secondary'
                                    >
                                        {bullet}
                                    </li>
                                ))}
                            </ul>                          
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left side - Role & description */}
                      <div className='text-right pr-8 lg:pr-12'>
                        <div className='bg-surface-light-elevated dark:bg-surface-dark-elevated p-6 rounded-xl border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow duration-300'>
                          <h4 className='text-lg lg:text-xl font-semibold text-brand-accent mb-3'>
                            {exp.role}
                          </h4>
                          <p className='text-sm lg:text-base italic text-text-light-secondary dark:text-text-dark-secondary'>
                            {exp.description}
                          </p>
                            <ul className="mt-4 space-y-3">
                            {exp.bullets.map((bullet, i) => (
                                <li
                                    key={i}
                                    className="flex items-start justify-between gap-4"
                                >
                                {/* Text */}
                                <span className="text-text-light-secondary dark:text-text-dark-secondary">
                                    {bullet}
                                </span>

                                {/* Right bullet */}
                                <span className="mt-2 w-[5px] h-[5px] rounded-full bg-text-light-secondary dark:bg-text-dark-secondary shrink-0" />
                                </li>
                            ))}
                            </ul>                         
                        </div>
                      </div>

                      {/* Right side - Company info */}
                      <div className='pl-8 lg:pl-12'>
                        <h3 className='text-xl lg:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary'>
                          {exp.company}
                        </h3>
                        <p className='text-sm lg:text-base text-text-light-secondary dark:text-text-dark-secondary mt-2'>
                          {exp.period}
                        </p>
                      </div>
                    </>
                  )}

                {/* Center dot */}
                <div className='absolute left-1/2 transform -translate-x-1/2 top-0'>
                <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full border-4 ${
                    exp.isActive 
                    ? 'bg-brand-accent border-brand-accent shadow-accent' 
                    : 'bg-surface-light-muted dark:bg-surface-dark-muted border-border-light dark:border-border-dark'
                }`}></div>
                </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default WorkExperience