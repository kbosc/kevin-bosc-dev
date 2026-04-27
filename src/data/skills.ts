import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Langages & Web',
    skills: ['JavaScript ES6+', 'TypeScript', 'HTML5', 'CSS3', 'Sass (@use/@forward)'],
  },
  {
    category: 'Frameworks',
    skills: ["React (jusqu'à v19)", 'Redux', 'Zustand', 'i18next', 'Styled Components', 'Axios', 'Storybook'],
  },
  {
    category: 'Testing',
    skills: ['React Testing Library', 'Vitest', 'Cypress', 'Playwright', 'Jest'],
  },
  {
    category: 'Outils',
    skills: ['Vite', 'Webpack', 'ESLint', 'Prettier', 'Figma', 'Git', 'VS Code', 'IntelliJ'],
  },
  {
    category: 'Cloud & CI',
    skills: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Vercel', 'Heroku', 'Renovate'],
  },
  {
    category: 'Méthodo',
    skills: ['Agile Scrum', 'Kanban', 'Pair Programming', 'Code Review'],
  },
];
