import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages & Web
  { name: 'JavaScript (ES6+)', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'HTML5', category: 'languages' },
  { name: 'CSS3', category: 'languages' },
  { name: 'SASS (Modules @use/@forward)', category: 'languages' },
  { name: 'PostgreSQL', category: 'languages' },

  // Frameworks & Libraries
  { name: 'React (jusqu\'à v19)', category: 'frameworks' },
  { name: 'Redux / Zustand', category: 'frameworks' },
  { name: 'Framer Motion', category: 'frameworks' },
  { name: 'i18next', category: 'frameworks' },
  { name: 'Styled Components', category: 'frameworks' },
  { name: 'Axios', category: 'frameworks' },
  { name: 'Storybook', category: 'frameworks' },

  // Testing
  { name: 'React Testing Library', category: 'testing' },
  { name: 'Cypress', category: 'testing' },
  { name: 'Jest / Vitest', category: 'testing' },

  // Tools & Environments
  { name: 'IntelliJ / VS Code', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Vite / Webpack / Rollup', category: 'tools' },
  { name: 'ESLint', category: 'tools' },
  { name: 'npm', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Bash', category: 'tools' },
  { name: 'Git / GitHub / GitLab', category: 'tools' },
  { name: 'Renovate BOT', category: 'tools' },

  // Cloud & Infra
  { name: 'Vercel', category: 'cloud' },
  { name: 'Heroku', category: 'cloud' },
  { name: 'Jenkins', category: 'cloud' },
  { name: 'GitLab CI', category: 'cloud' },

  // Methodologies
  { name: 'Agile Scrum', category: 'methodologies' },
  { name: 'Kanban', category: 'methodologies' },
  { name: 'Pair Programming', category: 'methodologies' },
  { name: 'Code Review', category: 'methodologies' },
];

export const skillCategoryLabels: Record<string, string> = {
  languages: 'Langages & Web',
  frameworks: 'Frameworks & Librairies',
  testing: 'Testing',
  tools: 'Outils & Environnements',
  cloud: 'Cloud & Infra',
  methodologies: 'Méthodologies',
};

