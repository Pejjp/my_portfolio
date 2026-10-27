import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import WorkExperience from '@/components/WorkExperience';
import AboutMe from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import EngineeringFocus from '@/components/EngineeringFocus';
import JsonLd from '@/components/JsonLd';
import { education, getVisibleSkillGroups, site } from '@/lib/content';

/** Accurate Person data only: no ratings, no invented employer details. */
function personJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: `${site.url}/${locale}`,
    jobTitle: locale === 'fr' ? 'Développeur logiciel' : 'Software Developer',
    address: { '@type': 'PostalAddress', addressLocality: 'Montréal', addressRegion: 'QC', addressCountry: 'CA' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
    sameAs: [site.github, site.linkedin],
    knowsAbout: getVisibleSkillGroups()
      .flatMap((g) => g.skills)
      .filter((s) => s.level !== 'exploring')
      .map((s) => s.name),
  };
}

export default function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className='relative w-full overflow-x-clip'>
      {/* Single, subtle decorative glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 h-[36rem] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-200/50 via-accent-100/20 to-transparent blur-3xl dark:from-accent-500/15 dark:via-accent-500/5"
      />
      <JsonLd data={personJsonLd(locale)} />
      <div className='mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-8 md:gap-32 md:px-6'>
        <Hero/>
        <Projects/>
        <WorkExperience/>
        <EngineeringFocus/>
        <AboutMe/>
        <Contact/>
      </div>
    </div>
  );
}
