import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import WorkExperience from '@/components/WorkExperience';
import AboutMe from '@/components/About';
import PortfolioShowcase from '@/components/Projects';
import CurvedCardExample from '@/components/TestComponent';
import Contact  from '@/components/Contact';
import TechStack from '@/components/TechStack';


export default function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('contact');

  return (
    <div className='relative flex flex-col items-center justify-center md:p-10 p-5 gap-16 md:gap-28 w-full overflow-hidden'>

      {/* Top blob */}
      <div className="absolute top-[-350] left-1/2 -translate-x-1/2 md:w-[90vw] h-[40rem] w-[96vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-300 via-accent-200/40 to-transparent dark:from-accent-500 dark:via-accent-500/30 pointer-events-none" />

      <div className="absolute top-[600] left-1/2 -translate-x-1/2 md:w-[90vw] h-[40rem] w-[96vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-300 via-accent-200/40 to-transparent dark:from-accent-500 dark:via-accent-500/30 pointer-events-none" />

      {/* Bottom blob */}
      <div className="absolute bottom-[0] left-1/2 -translate-x-1/2 md:w-[90vw] h-[40rem] w-[96vw] rounded-full blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-300 via-accent-200/40 to-transparent dark:from-accent-500 dark:via-accent-500/30 pointer-events-none" />

      <Hero/>
      <TechStack/>
      <AboutMe/>
      <PortfolioShowcase/>
      <WorkExperience/>
      <Contact/>
    </div>

  );
}