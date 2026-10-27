import { useTranslations } from 'next-intl'
import { getFeaturedProjects, getOtherProjects } from '@/lib/content'
import { ProjectCard, ProjectRow } from './ProjectCard'
import { SectionHeader } from './ui'

const Projects = () => {
  const t = useTranslations('projects')
  const featured = getFeaturedProjects()
  const others = getOtherProjects()

  return (
    <section id="projects" aria-labelledby="projects-title" className="w-full">
      <SectionHeader id="projects-title" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">{t('more')}</h3>
          <ul className="mt-2 border-t border-border-light dark:border-border-dark">
            {others.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Projects
