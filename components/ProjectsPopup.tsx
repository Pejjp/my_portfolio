"use client"
import { Project } from '@/lib/types/project';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'
import { LuX, LuExternalLink, LuGithub, LuCheck, LuEyeOff, LuEye } from 'react-icons/lu'

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const project_popup = useTranslations('project_popup');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6'>
      {/* Backdrop */}
      <div 
        className='absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200'
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className='relative w-full max-w-5xl max-h-[90vh] bg-surface-light-base dark:bg-surface-dark-base 
                      rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200
                      border border-border-light dark:border-border-dark'>
        
        {/* Header - Sticky */}
        <div className='sticky top-0 z-10 bg-surface-light-base dark:bg-surface-dark-base border-b 
                        border-border-light dark:border-border-dark px-6 md:px-8 py-4 md:py-6'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1 min-w-0'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-text-light-primary 
                            dark:text-text-dark-primary mb-3'>
                {project.title}
              </h2>
              
              {/* Tech Stack Badges */}
              <div className='flex flex-wrap gap-2 mb-2'>
                {project.stack.map((tech, idx) => (
                  <span key={idx} className='px-3 py-1 text-xs md:text-sm rounded-full 
                                           bg-brand-accent/10 text-brand-accent border border-brand-accent/20'>
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Period */}
              <div className='flex items-center gap-2 text-sm text-text-light-secondary dark:text-text-dark-secondary'>
                <div className='w-1.5 h-1.5 rounded-full bg-brand-accent'></div>
                <span>{project.period}</span>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className='flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                        bg-surface-light-elevated dark:bg-surface-dark-elevated border border-border-light 
                        dark:border-border-dark hover:bg-brand-accent hover:border-brand-accent hover:text-white
                        transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 
                        focus:ring-accent-400/50'
              aria-label='Close modal'
            >
              <LuX className='w-5 h-5 md:w-6 md:h-6' strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className='overflow-y-auto max-h-[calc(90vh-180px)] px-6 md:px-8 pb-16 md:pb-10 pt-8 space-y-8 md:space-y-12'>
            
          {/* Project Image */}
          <div className='rounded-xl md:rounded-2xl overflow-hidden border border-border-light 
                        dark:border-border-dark shadow-lg'>
            <div className='aspect-video bg-gradient-to-br from-accent-100 to-accent-200 
                          dark:from-accent-900 dark:to-accent-800 relative'>
              <img 
                src={project.image} 
                alt={project.title}
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* Overview */}
          <section >
            <h3 className='text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary 
                          mb-4 flex items-center gap-2'>
              <div className='w-1 h-6 bg-brand-accent rounded-full'></div>
              {project_popup('overview')}
            </h3>
            <p className='text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary 
                         leading-relaxed'>
              {project.overview}
            </p>
          </section>

          {/* Demo */}
          <section>
            <h3 className='text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary 
                          mb-4 flex items-center gap-2'>
              <div className='w-1 h-6 bg-brand-accent rounded-full'></div>
              {project_popup('links')}
            </h3>
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4'>
              {project.demo.liveUrl && (
                <a
                  href={project.demo.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl 
                           bg-brand-accent text-white font-semibold hover:bg-brand-accent/90 
                           transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-accent/20'
                >                
                  <LuEye className='w-5 h-5' strokeWidth={2.5} />
                  {project_popup('demo')}
                </a>
              )}
              {project.demo.githubUrl && (
                <a
                  href={project.demo.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl 
                           bg-surface-light-elevated dark:bg-surface-dark-elevated 
                           border-2 border-border-light dark:border-border-dark
                           text-text-light-primary dark:text-text-dark-primary font-semibold
                           hover:border-brand-accent hover:bg-brand-accent/5
                           transition-all duration-300 hover:scale-105'
                >
                  <LuGithub className='w-5 h-5' strokeWidth={2.5} />
                  {project_popup('code')}
                </a>
              )}
            </div>
            {project.demo.videoUrl && (
              <div className='mt-4 rounded-xl overflow-hidden border border-border-light dark:border-border-dark'>
                <div className='aspect-video bg-surface-light-elevated dark:bg-surface-dark-elevated'>
                  <iframe
                    src={project.demo.videoUrl}
                    title={`${project.title} demo video`}
                    className='w-full h-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </section>          

          {/* Key Features */}
          <section>
            <h3 className='text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary 
                          mb-4 flex items-center gap-2'>
              <div className='w-1 h-6 bg-brand-accent rounded-full'></div>
              {project_popup('key_features')}
            </h3>
            <div className='grid gap-3 md:gap-4'>
              {project.keyFeatures.map((feature, idx) => (
                <div key={idx} className='flex items-start gap-3 p-4 rounded-xl bg-surface-light-elevated 
                                        dark:bg-surface-dark-elevated border border-border-light 
                                        dark:border-border-dark'>
                  <LuCheck className='w-5 h-5 md:w-6 md:h-6 text-brand-accent flex-shrink-0 mt-0.5' 
                           strokeWidth={2.5} />
                  <span className='text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary'>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies Used */}
          <section >
            <h3 className='text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary 
                          mb-4 flex items-center gap-2'>
              <div className='w-1 h-6 bg-brand-accent rounded-full'></div>
              {project_popup('technologies_used')}
            </h3>
            <div className='grid md:grid-cols-2 gap-4 md:gap-6'>
              {project.technologies.map((tech, idx) => (
                <div key={idx} className='p-5 rounded-xl bg-surface-light-elevated dark:bg-surface-dark-elevated 
                                        border border-border-light dark:border-border-dark'>
                  <h4 className='font-semibold text-text-light-primary dark:text-text-dark-primary mb-3'>
                    {tech.category}
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {tech.items.map((item, itemIdx) => (
                      <span key={itemIdx} className='px-3 py-1 text-xs md:text-sm rounded-full 
                                                   bg-surface-light-base dark:bg-surface-dark-base 
                                                   text-text-light-secondary dark:text-text-dark-secondary
                                                   border border-border-light dark:border-border-dark'>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Learnings */}
          <section >
            <h3 className='text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary 
                          mb-4 flex items-center gap-2'>
              <div className='w-1 h-6 bg-brand-accent rounded-full'></div>
                {project_popup('challenges_solutions')}
            </h3>
            <div className='space-y-4 md:space-y-6'>
              {project.challenges.map((item, idx) => (
                <div key={idx} className='p-5 md:p-6 rounded-xl bg-surface-light-elevated 
                                        dark:bg-surface-dark-elevated border-l-4 border-brand-accent'>
                  <h4 className='font-semibold text-text-light-primary dark:text-text-dark-primary mb-2'>
                    {project_popup('challenge')}
                  </h4>
                  <p className='text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary mb-4'>
                    {item.challenge}
                  </p>
                  <h4 className='font-semibold text-brand-accent mb-2'>
                    {project_popup('solution')}
                  </h4>
                  <p className='text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary'>
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Outcome */}
          <section>
            <h3 className='text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary 
                          mb-4 flex items-center gap-2'>
              <div className='w-1 h-6 bg-brand-accent rounded-full'></div>
                {project_popup('outcome')}
            </h3>
            <div className='p-5 md:p-6 rounded-xl bg-gradient-to-br from-brand-accent/5 to-brand-accent/10 
                          border border-brand-accent/20'>
              <p className='text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary mb-4'>
                {project.outcome.description}
              </p>
              {project.outcome.metrics && project.outcome.metrics.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4'>
                  {project.outcome.metrics.map((metric, idx) => (
                    <div key={idx} className='p-4 rounded-lg bg-surface-light-base dark:bg-surface-dark-base 
                                            border border-border-light dark:border-border-dark text-center'>
                      <span className='text-sm md:text-base font-semibold text-brand-accent'>
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default ProjectPopup