import type { SideQuest } from '@/types';

export const sideQuests: SideQuest[] = [
  {
    id: 'mtg',
    title: 'Magic: The Gathering',
    kicker: 'Stratégie · Deck building',
    body: "Format favori : EDH/Commander. Ce que j'y apprends : séquencer, anticiper 3 tours en avance, et accepter que la variance fasse partie du plan — exactement comme un release en prod.",
    stats: [
      { label: 'Formats', value: 'EDH · Modern' },
      { label: 'Approche', value: 'Control / Midrange' },
    ],
  },
  {
    id: 'badminton',
    title: 'Badminton',
    kicker: 'Explosivité · Lecture de jeu',
    body: 'En club et en compétition amicale. Réflexes, placement, gestion du tempo — compétences transposables à la revue de code sous pression.',
    stats: [
      { label: 'Niveau', value: 'Intermédiaire' },
      { label: 'Fréquence', value: '3-4× / semaine' },
    ],
  },
  {
    id: 'gym',
    title: 'Musculation',
    kicker: 'Discipline · Progression mesurée',
    body: 'Home-gym. Programme full body progressif, charges loggées, deload planifiés. La rigueur que j\'applique aux refactos.',
    stats: [
      { label: 'Setup', value: 'Full home-gym' },
      { label: 'Split', value: 'Full body · 4-5× / sem' },
    ],
  },
];
