import type { Experience, Localized } from './types';

/**
 * Work history, newest first. Dates are `YYYY-MM` and formatted per locale at render time.
 * Sources: latest résumé (Oct 2026), the previous site, and public pull requests for Borrow'd.
 */
export const experiences: Experience[] = [
  {
    id: 'smardt',
    company: 'SMARDT Inc.',
    // REVIEW: the brief says "Software Developer Intern"; the Oct 2026 résumé says "Full Stack Developer".
    role: {
      en: 'Software Developer Intern',
      fr: 'Stagiaire en développement logiciel',
    },
    location: {
      en: 'Montréal area, QC',
      fr: 'Région de Montréal, QC',
    },
    start: '2026-08',
    end: null,
    // Safe temporary copy from the brief, until Jeff approves public bullets.
    summary: {
      en: 'Contributing to software development and engineering workflows in an industrial technology environment.',
      fr: "Contribution au développement logiciel et aux processus d'ingénierie dans un environnement de technologie industrielle.",
    },
    bullets: { en: [], fr: [] },
    tier: 'primary',
    // REVIEW: drafted from the Oct 2026 résumé with internal figures removed. Not rendered until approved.
    pendingBullets: {
      en: [
        'Contributing to an internal sales and engineering platform, turning business and engineering workflows into software features.',
        'Developing and debugging JavaScript/TypeScript features and backend services in a large existing codebase, with automated tests before integration.',
        'Investigating gaps between software outputs and engineering expectations by analyzing simulation data with Python (pandas, NumPy, Matplotlib).',
        'Working with engineers and stakeholders through code reviews and technical discussions.',
      ],
      fr: [
        "Contribution à une plateforme interne de ventes et d'ingénierie, en traduisant des processus d'affaires et d'ingénierie en fonctionnalités logicielles.",
        'Développement et débogage de fonctionnalités JavaScript/TypeScript et de services backend dans une base de code existante de grande taille, validés par des tests automatisés avant intégration.',
        "Analyse d'écarts entre les résultats logiciels et les attentes d'ingénierie à partir de données de simulation, avec Python (pandas, NumPy, Matplotlib).",
        "Collaboration avec les ingénieurs et les parties prenantes par des revues de code et des discussions techniques.",
      ],
    },
  },
  {
    id: 'borrowd',
    company: "Borrow'd",
    // REVIEW: résumé title; the previous site said "Full Stack Developer" starting Jan 2026.
    role: {
      en: 'Software Developer (open source)',
      fr: 'Développeur logiciel (projet à code source ouvert)',
    },
    location: {
      en: 'Remote',
      fr: 'À distance',
    },
    start: '2026-02',
    end: null,
    summary: {
      en: 'Backend and product work on an open-source, community lending platform built with Django.',
      fr: "Développement backend et produit pour une plateforme communautaire de prêt d'objets, à code source ouvert, bâtie avec Django.",
    },
    bullets: {
      en: [
        'Designed and shipped the notification system: signal-driven events, deduplication, per-user channel preferences, and in-app, email and web-push delivery.',
        'Fixed a race in availability alerts by deferring notifications until the database transaction commits.',
        'Removed N+1 query patterns on group and inventory pages; one measured path dropped from 9,000 to 187 queries.',
        'Worked in a remote, asynchronous team through weekly sprints, pull-request reviews and documented decisions.',
      ],
      fr: [
        "Conception et mise en production du système de notifications : événements déclenchés par signaux, déduplication, préférences par canal et envoi dans l'application, par courriel et par notification push.",
        "Correction d'une situation de concurrence dans les alertes de disponibilité en reportant l'envoi après la validation de la transaction en base de données.",
        "Élimination de requêtes N+1 sur les pages de groupes et d'inventaire; un parcours mesuré est passé de 9 000 à 187 requêtes.",
        "Travail au sein d'une équipe asynchrone à distance : sprints hebdomadaires, revues de demandes de tirage et décisions documentées.",
      ],
    },
    stack: ['Python', 'Django', 'PostgreSQL', 'HTMX', 'Alpine.js'],
    tier: 'primary',
    links: [
      {
        label: { en: 'Case study', fr: 'Étude de cas' },
        href: '/projects/borrowd',
      },
      {
        label: { en: 'Repository', fr: 'Dépôt' },
        href: 'https://github.com/borrowd/borrowd',
      },
    ],
  },
  {
    id: 'udem-ta',
    company: 'Université de Montréal',
    role: {
      en: 'Teaching Assistant, Operating Systems (IFT2245)',
      fr: "Auxiliaire d'enseignement, Systèmes d'exploitation (IFT2245)",
    },
    location: {
      en: 'Montréal, QC',
      fr: 'Montréal, QC',
    },
    start: '2026-01',
    // REVIEW: end date not confirmed; shown as the Winter 2026 term.
    periodLabel: {
      en: 'Winter 2026',
      fr: 'Hiver 2026',
    },
    summary: {
      en: 'Helped students through operating-systems labs and kept the course autograding running.',
      fr: "Accompagnement des étudiants dans les laboratoires de systèmes d'exploitation et soutien à la correction automatisée du cours.",
    },
    bullets: {
      en: [
        // REVIEW: student count from the résumé; brief asks to verify.
        'Supported more than 150 students with operating-systems concepts, labs and technical questions.',
        'Helped run GitHub Classroom and GitHub Actions autograding: test scripts, submission checks and troubleshooting failing pipelines.',
        'Graded assignments and gave actionable feedback.',
      ],
      fr: [
        "Soutien à plus de 150 étudiants sur les notions de systèmes d'exploitation, les laboratoires et les questions techniques.",
        'Participation à la correction automatisée avec GitHub Classroom et GitHub Actions : scripts de test, validation des remises et dépannage des pipelines en échec.',
        'Correction des travaux et rétroaction concrète aux étudiants.',
      ],
    },
    stack: ['GitHub Actions', 'GitHub Classroom'],
    tier: 'primary',
  },
  {
    id: 'iga',
    company: 'Voilà by IGA',
    role: {
      en: 'Inventory Clerk',
      fr: "Commis à l'inventaire",
    },
    location: {
      en: 'Pointe-Claire, QC',
      fr: 'Pointe-Claire, QC',
    },
    start: '2023-08',
    end: '2025-08',
    summary: {
      en: 'Operations role where accuracy and follow-through mattered every shift.',
      fr: 'Poste opérationnel où la précision et la rigueur comptaient à chaque quart de travail.',
    },
    // The "15+ audits daily" claim from the previous site is removed until verified.
    bullets: {
      en: [
        'Performed accuracy-critical inventory audits and used inventory data to support inbound and outbound deliveries.',
        'Worked across warehouse teams in English and French.',
      ],
      fr: [
        "Réalisation d'audits d'inventaire où la précision est critique et utilisation des données d'inventaire pour appuyer les réceptions et les expéditions.",
        "Collaboration avec les équipes de l'entrepôt en français et en anglais.",
      ],
    },
    tier: 'earlier',
  },
];

export const education: {
  school: string;
  degree: Localized;
  period: Localized;
} = {
  school: 'Université de Montréal',
  // REVIEW: confirm the official credential title and completion month (résumé says Jan 2023 – Aug 2026).
  degree: {
    en: 'B.Sc. in Computer Science',
    fr: 'Baccalauréat en informatique',
  },
  period: {
    en: '2023 – 2026',
    fr: '2023 – 2026',
  },
};
