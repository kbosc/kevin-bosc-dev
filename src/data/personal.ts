import type { PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Kevin Bosc',
  title: 'Développeur Frontend React',
  email: 'bosc.kev@gmail.com',
  phone: '06 86 85 32 37',
  location: 'Paris',
  about:
    "Issu d'une reconversion, j'ai choisi le code pour le défi intellectuel. " +
    'Je me définis comme un développeur persévérant, orienté solutions plutôt que théories complexes. ' +
    'Mon équilibre ? La stratégie des jeux (Magic: The Gathering, jeux de société) ' +
    'et la discipline du sport (badminton et musculation en home-gym). ' +
    'Cette rigueur quotidienne est mon moteur pour livrer un code fiable ' +
    'et répondre aux attentes concrètes des projets.',
  interests: [
    { label: 'Magic: The Gathering', emoji: '🃏' },
    { label: 'Jeux de société', emoji: '🎲' },
    { label: 'Badminton', emoji: '🏸' },
    { label: 'Musculation', emoji: '💪' },
  ],
};

