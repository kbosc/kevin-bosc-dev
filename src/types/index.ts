// ==========================================
// Shared TypeScript types
// ==========================================

export type Theme = 'light' | 'dark';

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  stack: string[];
  methodology: string;
  team: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'testing'
  | 'tools'
  | 'cloud'
  | 'methodologies';

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  link?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  level: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  interests: Interest[];
}

export interface Interest {
  label: string;
  emoji: string;
}

