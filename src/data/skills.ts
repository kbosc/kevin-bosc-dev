import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Langages & Web',
    skills: ['JavaScript ES6+', 'TypeScript', 'HTML5', 'CSS3', 'Sass (@use/@forward)', 'PostgreSQL'],
  },
  {
    category: 'Frameworks',
    skills: ["React (jusqu'à v19)", 'Redux', 'Zustand', 'Framer Motion', 'i18next', 'Styled Components', 'Axios', 'Storybook'],
  },
  {
    category: 'Testing',
    skills: ['React Testing Library', 'Cypress', 'Jest / Vitest', 'Playwright'],
  },
  {
    category: 'Outils',
    skills: ['VS Code', 'IntelliJ', 'Figma', 'Vite', 'Webpack', 'ESLint', 'Postman', 'Bash', 'Git'],
  },
  {
    category: 'Cloud & CI',
    skills: ['Vercel', 'Heroku', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Renovate'],
  },
  {
    category: 'Méthodo',
    skills: ['Agile Scrum', 'Kanban', 'Pair Programming', 'Code Review'],
  },
];
