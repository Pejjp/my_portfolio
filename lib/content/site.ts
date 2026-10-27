import type { Locale, Localized } from './types';

/**
 * Single source for identity, links and résumé paths.
 * Anything marked REVIEW is listed in docs/CONTENT.md under "Pending approvals".
 */
export const site = {
  name: 'Jeff Pendy',
  url: 'https://www.jeffpendy.com',
  location: {
    en: 'Montréal, Canada',
    fr: 'Montréal, Canada',
  } satisfies Localized,
  // REVIEW: confirm this address should stay public (brief §11).
  email: 'jeffpendy33@gmail.com',
  github: 'https://github.com/Pejjp',
  sourceRepo: 'https://github.com/Pejjp/my_portfolio',
  // REVIEW: URL taken from the existing site and résumé; confirm it is the profile to publish.
  linkedin: 'https://www.linkedin.com/in/jeff-pendy-910b502b2',
  // REVIEW: both PDFs predate SMARDT/Borrow'd and include a phone number. Replace the files, keep the paths.
  resume: {
    en: '/cv/cv_jeff.pdf',
    fr: '/cv/cv_jeff_fr.pdf',
  } satisfies Localized,
} as const;

export function resumeHref(locale: Locale) {
  return site.resume[locale];
}
