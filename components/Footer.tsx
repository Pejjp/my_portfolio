import { useLocale, useTranslations } from 'next-intl';
import { LuFileText, LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { Link } from '@/i18n/navigation';
import { resumeHref, site, type Locale } from '@/lib/content';

const sections = [
  { key: 'work', hash: 'work-experience' },
  { key: 'projects', hash: 'projects' },
  { key: 'about', hash: 'about' },
  { key: 'contact', hash: 'contact' },
] as const;

// The footer is dark in both themes, so it uses light-on-dark tokens.
const footerLink =
  'inline-flex min-h-11 items-center rounded text-text-dark-secondary hover:text-brand-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400';
const socialButton =
  'w-11 h-11 bg-dark-700 hover:bg-brand-accent rounded-full flex items-center justify-center transition-all duration-300 motion-safe:hover:scale-110 hover:shadow-glow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400';

/** Original dark, rounded footer with the gold "J" mark. Phone number and personal social accounts removed. */
export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const a11y = useTranslations('a11y');
  const locale = useLocale() as Locale;

  return (
    <footer className="relative bg-brand-dark dark:bg-gradient-dark text-text-dark-primary overflow-hidden rounded-t-5xl">
      <div className="relative pt-12 pb-8 px-6 md:px-12 lg:px-20">
        <p className="mb-12 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">{t('title')}</p>

        <div className="border-t border-border-dark pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center shadow-accent">
                  <span className="text-2xl font-bold text-brand-light">J</span>
                </div>
                <p className="text-2xl font-semibold">{site.name}</p>
              </div>
              <p className="text-text-dark-muted leading-relaxed text-sm max-w-sm">{t('tagline')}</p>
              <div className="flex gap-4">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className={socialButton} aria-label={`${a11y('github')} ${a11y('newTab')}`}>
                  <LuGithub className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={socialButton} aria-label={`${a11y('linkedin')} ${a11y('newTab')}`}>
                  <LuLinkedin className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={`mailto:${site.email}`} className={socialButton} aria-label={a11y('email')}>
                  <LuMail className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={resumeHref(locale)} className={socialButton} aria-label={nav('resume')}>
                  <LuFileText className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <nav aria-labelledby="footer-nav" className="flex flex-col items-start md:items-center">
              <h2 id="footer-nav" className="text-brand-accent text-lg font-semibold mb-4">
                {t('navigation')}
              </h2>
              <ul className="text-start md:text-center">
                {sections.map((s) => (
                  <li key={s.key}>
                    <Link href={{ pathname: '/', hash: s.hash }} className={footerLink}>
                      {nav(s.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="flex flex-col items-start md:items-end">
              <h2 className="text-brand-accent text-lg font-semibold mb-4">{nav('contact')}</h2>
              <ul className="text-start md:text-end">
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className={footerLink}>
                    github.com/Pejjp<span className="sr-only"> {a11y('newTab')}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className={`${footerLink} break-all`}>
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-dark mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-dark-muted text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-brand-accent font-medium">{site.name}</span>. {t('rights')}
          </p>
          <a href={site.sourceRepo} target="_blank" rel="noopener noreferrer" className={`${footerLink} text-sm`}>
            {t('source')}<span className="sr-only"> {a11y('newTab')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
