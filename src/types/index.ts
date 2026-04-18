// ==========================================
// Shared TypeScript types
// ==========================================

export type Theme = 'light' | 'dark';

export type CardType = 'experience' | 'project';
export type CardRarity = 'mythic' | 'rare' | 'uncommon' | 'common';

export interface Card {
  id: string;
  type: CardType;
  rarity: CardRarity;
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  scope?: string;
  url?: string;
  power: number;
  toughness: number;
  flavor: string;
  highlights: string[];
  stack: string[];
  team?: string;
}

export interface SideQuest {
  id: string;
  title: string;
  kicker: string;
  body: string;
  stats: { label: string; value: string }[];
}

export interface TimelineItem {
  year: string;
  kind: 'work' | 'edu';
  title: string;
  sub: string;
}

export interface PersonalInfo {
  name: string;
  alias: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  level: string;
}

// Legacy types (kept for backward compatibility with existing feature files)
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
  projectUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  link?: string;
}

export interface Interest {
  label: string;
  emoji: string;
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'testing'
  | 'tools'
  | 'cloud'
  | 'methodologies';

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type TweakDensity = 'compact' | 'normal' | 'spacious';

export interface TweakState {
  accentHue: number;
  density: TweakDensity;
  mtg: 'on' | 'off';
  cursor: 'on' | 'off';
}
