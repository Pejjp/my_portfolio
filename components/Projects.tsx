"use client"
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { LuArrowUpRight, LuChevronLeft, LuChevronRight, LuLink2 } from 'react-icons/lu'
import ProjectPopup from './ProjectsPopup'
import { Project } from '@/lib/types/project'

const PortfolioShowcase = () => {
  const t = useTranslations("projects");
  const projects = t.raw("projectsList") as Project[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const canNavigate = projects.length > visibleCount; 
  const [isPopupOpen, setIsPopupOpen] = React.useState(false); 
  const [selectedProject, setSelectedProject] = React.useState<number | null>(null);

  const openPopup = (id: number) => {
    setSelectedProject(id);
    setIsPopupOpen(true);
  }

  // For the sliding mechanism
  // Simplified sliding mechanism
  const nextProject = () => {
    if (!canNavigate) return;
    
    const remainingRight = projects.length - (currentIndex + visibleCount);
    
    if (remainingRight <= 0) return;
    
    // Slide by the minimum of visibleCount or remaining cards
    const slideAmount = Math.min(visibleCount, remainingRight);
    setCurrentIndex((prev) => prev + slideAmount);
  };

  const prevProject = () => {
    if (!canNavigate) return;
    
    const remainingLeft = currentIndex;
    
    if (remainingLeft <= 0) return;
    
    // Slide by the minimum of visibleCount or remaining cards
    const slideAmount = Math.min(visibleCount, remainingLeft);
    setCurrentIndex((prev) => prev - slideAmount);
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 468) return 2;  // md
    return 1;                                // mobile
  };

  useEffect(() => {
    const update = () => {
      const count = getVisibleCount();
      setVisibleCount(count);
      setCurrentIndex(0); // Reset to first slide on resize
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);


  return (
    <section 
      className='w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8'
      id="projects">
       {/* Header */}
        <div className='flex flex-row items-center justify-center md:items-center mb-8 md:mb-12 gap-4 text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
            <span className='text-text-light-primary dark:text-text-dark-primary'>{t("sectionTitle.prefix")}{" "} </span>
            <span className='text-brand-accent'> {t("sectionTitle.highlight")}</span>
          </h2>
        </div>      
        
        {/* Projects Carousel */}
        <div className='relative'>
          {/* Navigation Buttons */}
          {canNavigate && (
            <>
              <button
                onClick={prevProject}
                disabled={currentIndex === 0}
                className='absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 
                        bg-surface-light-base dark:bg-surface-dark-base border-2 border-border-light 
                        dark:border-border-dark rounded-full flex items-center justify-center transition-all 
                        duration-300 hover:bg-brand-accent hover:border-brand-accent hover:text-white hover:shadow-accent 
                        hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent-400/50
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-surface-light-base disabled:dark:hover:bg-surface-dark-base'
                aria-label='Previous project'
              >
                <LuChevronLeft className='w-6 h-6 md:w-7 md:h-7' strokeWidth={2.5}/>
              </button>

              <button
                onClick={nextProject}
                disabled={currentIndex >= projects.length - visibleCount}
                className='absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14
                        bg-surface-light-base dark:bg-surface-dark-base border-2 border-border-light 
                        dark:border-border-dark rounded-full flex items-center justify-center transition-all 
                        duration-300 hover:bg-brand-accent hover:border-brand-accent hover:text-white 
                        hover:shadow-accent hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent-400/50
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-surface-light-base disabled:dark:hover:bg-surface-dark-base'
                aria-label='Next project'
              >
                <LuChevronRight className='w-6 h-6 md:w-7 md:h-7' strokeWidth={2.5}/>
              </button>
            </>
          )}


          {/* Projects Grid */}
          <div className='overflow-hidden pb-8'>
            <div
              className='flex transition-transform duration-500 ease-in-out gap-6 px-5'
              style={{
                transform: `translateX(calc(-${currentIndex * (90 / visibleCount)}% - ${currentIndex * 24}px))`
              }}
            >
              {projects.map((project,index) => (
                <div 
                  key={project.id}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  onClick={() => openPopup(index)}
                >
                  <Link 
                    href="#projects"
                    className='group block relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4]
                      transition-all duration-300 shadow-xl shadow-amber-950/5 hover:scale-[1.02]
                      border-8 border-white bg-surface-light-elevated dark:bg-surface-dark-base 
                      dark:border-border-dark hover:shadow-xl'
                  >
                    {/* Arrow Button DeskTop*/}
                    <div className='absolute hidden md:flex top-4 right-4 md:top-6 md:right-6 z-20'>
                      <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index % 2 === 1
                          ? 'bg-brand-accent text-white' 
                          : 'dark:bg-text-light-primary bg-text-dark-primary dark:text-white text-dark-800'
                      } group-hover:scale-110`}>
                        
                        {/* Closed Eye - Default State */}
                        <LuArrowUpRight
                          className='absolute w-4 h-4 md:w-6 md:h-6 transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75' 
                          strokeWidth={2.5}
                        />
                        
                        {/* Open Eye - Hover State */}
                        <LuLink2
                          className='absolute w-4 h-4 md:w-6 md:h-6 transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100' 
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                   {/* Arrow Button Mobile */}
                    <div className='absolute top-4 right-4 flex md:hidden z-20'>
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index % 2 === 1
                          ? 'bg-brand-accent text-white' 
                          : 'bg-text-light-primary dark:bg-text-dark-primary text-white dark:text-dark-800'
                      } group-hover:scale-110 group-hover:rotate-45`}>
                        <LuLink2 className='w-5 h-5 md:w-7 md:h-7' strokeWidth={2.5}/>
                      </div>
                    </div>
                 

                    {/* Background Image */}
                    <div className='absolute inset-0 bg-gradient-light dark:bg-gradient-dark'>
                      <div className='w-full h-full flex items-center justify-center overflow-hidden'>
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover object-center dark:fill-white transition-transform duration-500 ease-in-out"
                        />
                      </div>

                    </div>

                    {/* Gradient Overlay with Content */}
                    <div
                      className='absolute inset-x-0 bottom-0 overflow-y-scroll [&::-webkit-scrollbar]:hidden bg-gradient-to-t from-surface-light-base via-surface-light-base/95 
                                to-transparent dark:from-surface-dark-base dark:via-surface-dark-base/95 dark:to-transparent 
                                p-5 md:px-6 transition-all duration-500 ease-in-out group-hover:pt-48 group-hover:pb-16'
                      onMouseLeave={(component)=>component.currentTarget.scrollTo({
                                                                              top: 0,
                                                                              behavior: "smooth",
                                                                            })}                                
                    >
                      {/* RELATIVE WRAPPER */}
                      <div className="relative">

                        {/* Category Badge */}
                        <div className='mb-3 md:mb-4 flex flex-wrap gap-2'>
                          {
                            project.stack.map((language,idx)=>(
                            <span key={idx} className='inline-block px-3 py-1 text-xs md:text-sm rounded-full bg-surface-light-elevated dark:bg-surface-dark-elevated text-text-light-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark'>
                              {language}
                            </span>
                            ))
                          }

                        </div>

                        {/* Title */}
                        <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3 md:mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300'>
                          {project.title}
                        </h3>

                        {/* Meta info */}
                        <div className='flex items-center gap-3 text-xs md:text-sm text-text-light-secondary dark:text-text-dark-secondary'>
                          <div className='flex items-center gap-1.5'>
                            <div className='w-1.5 h-1.5 rounded-full bg-brand-accent'></div>
                            <span>Jeff Pendy</span>
                          </div>
                          <div className='flex items-center gap-1.5'>
                            <div className='w-1.5 h-1.5 rounded-full bg-brand-accent'></div>
                            <span>{project.period}</span>
                          </div>
                        </div>

                        {/* Additional content visible on hover */}
                        <ul
                          className='
                            absolute left-0 top-full mt-2
                            md:opacity-0 translate-y-2
                            pointer-events-none
                            transition-all duration-200 ease-out
                            group-hover:opacity-100
                            group-hover:translate-y-0
                            group-hover:pointer-events-auto
                            space-y-2 list-inside
                            pb-5
                            pt-3

                          '
                        >
                            {
                            project.keyFeatures.map((bullet,idx)=>(
                              <li key={idx} className='text-sm md:text-base text-text-light-secondary 
                                                    dark:text-text-dark-secondary list-disc list-item line-clamp-3'>
                                {bullet}
                              </li>
                            ))
                            }  
                        </ul>

                      </div>
                    </div>  
                  </Link>
                </div>
              ))}
            </div>
          
          </div>
         
        </div>    
        {
          isPopupOpen && selectedProject !== null && (
            <ProjectPopup 
              project={projects[selectedProject ?? 0]}
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
            />                  
          )
        }                   
    </section>
  )
}

export default PortfolioShowcase
