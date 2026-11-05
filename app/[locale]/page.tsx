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
    <div className='relative flex flex-col items-center justify-center md:p-10 p-5 w-full overflow-hidden'>
      {/* Original gold gradient glows: centred on the top edge (just under the nav bar) and at the bottom. */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[90vw] h-[40rem] w-[96vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-300 via-accent-200/40 to-transparent dark:from-accent-500 dark:via-accent-500/30 pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[90vw] h-[40rem] w-[96vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-300 via-accent-200/40 to-transparent dark:from-accent-500 dark:via-accent-500/30 pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 md:w-[90vw] h-[40rem] w-[96vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-300 via-accent-200/40 to-transparent dark:from-accent-500 dark:via-accent-500/30 pointer-events-none -z-10" />
      <JsonLd data={personJsonLd(locale)} />
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-16 md:gap-28'>
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
