import type { SkillGroup } from './types';

/**
 * Levels:
 * - `work`: used in paid or team work (SMARDT, Borrow'd, teaching).
 * - `project`: used hands-on in projects.
 * - `exploring`: current interest, not a claimed proficiency.
 *
 * `display: false` keeps an item in source without showing it, until Jeff confirms real use.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: { en: 'Languages', fr: 'Langages' },
    skills: [
      { name: 'TypeScript', level: 'work' },
      { name: 'JavaScript', level: 'work' },
      { name: 'Python', level: 'work' },
      { name: 'Java', level: 'project' },
      { name: 'SQL', level: 'project' },
      { name: 'C', level: 'project', display: false },
      { name: 'C++', level: 'project', display: false },
    ],
  },
  {
    id: 'frontend',
    title: { en: 'Frontend', fr: 'Frontend' },
    skills: [
      { name: 'React', level: 'project' },
      { name: 'Next.js', level: 'project' },
      { name: 'HTML/CSS', level: 'work' },
      { name: 'Tailwind CSS', level: 'work' },
      { name: 'HTMX & Alpine.js', level: 'work' },
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', fr: 'Backend' },
    skills: [
      { name: 'Django', level: 'work' },
      { name: 'Node.js', level: 'project' },
      { name: 'Fastify', level: 'project' },
      { name: 'REST API design', level: 'project' },
      { name: 'Express', level: 'project', display: false },
      { name: 'FastAPI', level: 'project', display: false },
      { name: 'Spring Boot', level: 'project', display: false },
    ],
  },
  {
    id: 'data',
    title: { en: 'Data', fr: 'Données' },
    skills: [
      { name: 'PostgreSQL', level: 'work' },
      { name: 'MongoDB', level: 'project' },
      { name: 'pandas & NumPy', level: 'work' },
      { name: 'scikit-learn', level: 'project', display: false },
      { name: 'Snowflake', level: 'project', display: false },
    ],
  },
  {
    id: 'cloud',
    title: { en: 'Cloud & DevOps', fr: 'Infonuagique et DevOps' },
    skills: [
      { name: 'Git', level: 'work' },
      { name: 'GitHub Actions', level: 'work' },
      { name: 'Docker', level: 'project' },
      { name: 'Google Cloud', level: 'project' },
      { name: 'Linux', level: 'project' },
      { name: 'Cloud Run', level: 'project', display: false },
      { name: 'AWS', level: 'project', display: false },
    ],
  },
  {
    id: 'testing',
    title: { en: 'Testing', fr: 'Tests' },
    skills: [
      { name: 'Django test framework', level: 'work' },
      { name: 'End-to-end tests in CI', level: 'work' },
      { name: 'Jest', level: 'project' },
      { name: 'JUnit', level: 'project' },
    ],
  },
  {
    id: 'ml',
    title: { en: 'ML & AI', fr: 'Apprentissage automatique et IA' },
    skills: [
      { name: 'Containerized model inference', level: 'project' },
      { name: 'RAG & agents', level: 'exploring' },
      { name: 'PyTorch / transformers', level: 'project', display: false },
    ],
  },
];

/** Practices shown as plain text, without a level. */
export const practices = {
  en: ['Debugging', 'Testing', 'Code review', 'Asynchronous collaboration', 'Documentation', 'System design'],
  fr: ['Débogage', 'Tests', 'Revue de code', 'Collaboration asynchrone', 'Documentation', 'Conception de systèmes'],
};

/** Tools listed on earlier versions of the site, kept for reference but not displayed. */
export const hiddenTools = ['Jira', 'Postman', 'IntelliJ', 'VS Code'];
