import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LuArrowLeft, LuArrowUpRight } from 'react-icons/lu'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getProject, getPublishedProjects, site, type Callout, type Locale, type Project } from '@/lib/content'
import { alternatesFor, ogLocale } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import SequenceDiagram from '@/components/SequenceDiagram'
import { ProjectRow } from '@/components/ProjectCard'
import { accentText, ChipList, mutedText, StatusBadge, textLink } from '@/components/ui'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPublishedProjects().map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project || !hasLocale(routing.locales, locale)) return {}
  const l = locale as Locale
  const title = project.title[l]
  const description = project.tagline[l]

  return {
    title,
    description,
    alternates: alternatesFor(l, `/projects/${slug}`),
    openGraph: {
      type: 'article',
      title,
      description,
      locale: ogLocale[l],
      url: `/${l}/projects/${slug}`,
      ...(project.image ? { images: [{ url: project.image.src.src, alt: project.image.alt[l] }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

const calloutTone = {
  // Decisions carry the brand: a soft gold wash and gold-tinted border.
  decision:
    'border-accent-200/80 bg-gradient-to-br from-accent-50 to-white hover:border-accent-300 dark:border-accent-500/25 dark:from-accent-500/[0.10] dark:to-white/[0.02] dark:hover:border-accent-500/45',
  // Tradeoffs stay neutral so the two sections read differently at a glance.
  tradeoff:
    'border-border-light bg-surface-light-muted hover:border-border-light-strong dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-white/[0.16]',
}

/** Decisions and tradeoffs as equal-height cards; colour comes from a tinted surface, not an accent stripe. */
function Callouts({ items, tone }: { items: Callout[]; tone: keyof typeof calloutTone }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((c, i) => (
        <li key={c.title} className={`h-full rounded-2xl border p-6 motion-safe:transition-colors ${calloutTone[tone]}`}>
          {tone === 'decision' && (
            <span aria-hidden="true" className="mb-3 block font-mono text-xs font-semibold text-accent-700 dark:text-brand-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className="text-base font-semibold leading-snug text-text-light-primary dark:text-text-dark-primary">{c.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-light-muted dark:text-text-dark-muted">{c.body}</p>
        </li>
      ))}
    </ul>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="text-2xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
        {title}
      </h2>
      <div className="mt-4 text-base md:text-lg leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">{children}</div>
    </section>
  )
}

function creativeWorkJsonLd(project: Project, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title[locale],
    description: project.tagline[locale],
    url: `${site.url}/${locale}/projects/${project.slug}`,
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    author: { '@type': 'Person', name: site.name, url: site.url },
    keywords: project.stack.join(', '),
    ...(project.links.repo ? { sameAs: [project.links.repo] } : {}),
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const project = getProject(slug)
  if (!project) notFound()

  const l = locale as Locale
  const t = await getTranslations({ locale, namespace: 'caseStudy' })
  const tp = await getTranslations({ locale, namespace: 'projects' })
  const ts = await getTranslations({ locale, namespace: 'status' })
  const a11y = await getTranslations({ locale, namespace: 'a11y' })
  const cs = project.caseStudy
  const others = getPublishedProjects().filter((p) => p.slug !== project.slug)

  const externalLinks = [
    project.links.repo && { href: project.links.repo, label: tp('viewCode') },
    project.links.live && { href: project.links.live, label: tp('viewLive') },
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <article className="mx-auto max-w-4xl px-4 pb-8 pt-10 md:px-6 md:pt-14">
      <JsonLd data={creativeWorkJsonLd(project, l)} />

      <Link href={{ pathname: '/', hash: 'projects' }} className={textLink}>
        <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('backToProjects')}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} label={ts(project.status)} />
          <span className={`font-mono text-xs ${mutedText}`}>{project.period[l]}</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary text-balance">
          {project.title[l]}
        </h1>
        <p className={`mt-4 text-lg md:text-xl leading-relaxed ${mutedText}`}>{project.tagline[l]}</p>

        <dl className="mt-8 grid gap-6 border-y border-border-light dark:border-border-dark py-6 sm:grid-cols-[1fr_2fr]">
          <div>
            <dt className={`font-mono text-xs uppercase tracking-[0.18em] ${accentText}`}>{t('role')}</dt>
            <dd className="mt-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">{project.role[l]}</dd>
          </div>
          <div>
            <dt className={`font-mono text-xs uppercase tracking-[0.18em] ${accentText}`}>{t('stack')}</dt>
            <dd className="mt-2">
              <ChipList items={project.stack} />
            </dd>
          </div>
          {externalLinks.length > 0 && (
            <div className="sm:col-span-2">
              <dt className={`font-mono text-xs uppercase tracking-[0.18em] ${accentText}`}>{t('links')}</dt>
              <dd className="mt-1 flex flex-wrap gap-x-6">
                {externalLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                    {link.label}
                    <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> {a11y('newTab')}</span>
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </header>

      {project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt[l]}
          sizes="(min-width: 896px) 832px, 100vw"
          placeholder="blur"
          preload
          className="mt-10 w-full rounded-2xl border border-border-light dark:border-border-dark"
        />
      )}

      <div className="mt-14 space-y-14">
        {cs ? (
          <>
            <Section id="problem" title={t('problem')}><Paragraphs items={cs.problem[l]} /></Section>
            <Section id="context" title={t('context')}><Paragraphs items={cs.context[l]} /></Section>
            <Section id="role" title={t('myRole')}><Paragraphs items={cs.role[l]} /></Section>
            <Section id="architecture" title={t('architecture')}>
              <Paragraphs items={cs.architecture[l]} />
              {cs.diagrams && (
                <div className="mt-8 space-y-8">
                  {cs.diagrams.map((d) => (
                    <SequenceDiagram key={d.title.en} diagram={d} />
                  ))}
                </div>
              )}
            </Section>
            <Section id="decisions" title={t('decisions')}><Callouts items={cs.decisions[l]} tone="decision" /></Section>
            <Section id="tradeoffs" title={t('tradeoffs')}><Callouts items={cs.tradeoffs[l]} tone="tradeoff" /></Section>
            <Section id="outcome" title={t('outcome')}>
              <ul className="list-disc space-y-3 pl-5 marker:text-accent-600 dark:marker:text-accent-500">
                {cs.outcome[l].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {project.links.evidence && project.links.evidence.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary">{t('evidence')}</h3>
                  <ul className="mt-1">
                    {project.links.evidence.map((e) => (
                      <li key={e.href}>
                        <a href={e.href} target="_blank" rel="noopener noreferrer" className={`${textLink} text-base`}>
                          {e.label[l]}
                          <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only"> {a11y('newTab')}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
            <Section id="next" title={t('next')}>
              <ul className="list-disc space-y-3 pl-5 marker:text-accent-600 dark:marker:text-accent-500">
                {cs.next[l].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          </>
        ) : (
          <Section id="highlights" title={t('highlights')}>
            <p className={`text-base ${mutedText}`}>{t('noCaseStudy')}</p>
            <p className="mt-4">{project.summary[l]}</p>
            {project.highlights && (
              <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-accent-600 dark:marker:text-accent-500">
                {project.highlights[l].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <p className="mt-4">
              <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{tp('outcome')}: </span>
              {project.outcome[l]}
            </p>
          </Section>
        )}
      </div>

      <nav aria-labelledby="other-projects" className="mt-20">
        <h2 id="other-projects" className="text-xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          {t('otherProjects')}
        </h2>
        <ul className="mt-2 border-t border-border-light dark:border-border-dark">
          {others.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
      </nav>
    </article>
  )
}
