import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { resumeHref, site, type Locale } from '@/lib/content';

const sections = [
  { key: 'work', hash: 'work-experience' },
  { key: 'projects', hash: 'projects' },
  { key: 'about', hash: 'about' },
  { key: 'contact', hash: 'contact' },
] as const;

// Footer is always dark, so it uses the light-on-dark text tokens in both themes.
const footerLink =
  'inline-flex min-h-11 items-center rounded text-text-dark-secondary hover:text-accent-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const a11y = useTranslations('a11y');
  const locale = useLocale() as Locale;

  return (
    <footer className="mt-24 rounded-t-4xl bg-brand-dark text-text-dark-primary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[2fr_1fr_1fr] md:px-6">
        <div>
          <p className="text-xl font-bold">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-dark-muted">{t('tagline')}</p>
        </div>

        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-500">
            {t('navigation')}
          </h2>
          <ul className="mt-3 text-sm">
            {sections.map((s) => (
              <li key={s.key}>
                <Link href={{ pathname: '/', hash: s.hash }} className={footerLink}>
                  {nav(s.key)}
                </Link>
              </li>
            ))}
            <li>
              <a href={resumeHref(locale)} className={footerLink}>
                {nav('resume')}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-500">{t('elsewhere')}</h2>
          <ul className="mt-3 text-sm">
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={footerLink}>
                github.com/Pejjp<span className="sr-only"> {a11y('newTab')}</span>
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={footerLink}>
                LinkedIn<span className="sr-only"> {a11y('newTab')}</span>
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

      <div className="border-t border-border-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-text-dark-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. {t('rights')}
          </p>
          <a href={site.sourceRepo} target="_blank" rel="noopener noreferrer" className={footerLink}>
            {t('source')}<span className="sr-only"> {a11y('newTab')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
