import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'catch-pokemon',
    name: 'Catch Pokémon',
    description:
      "Création d'un jeu permettant d'attraper et recenser les Pokémon.",
    highlights: [
      'Système de recherche et de pagination',
      "Développement de l'interface entièrement responsive",
      'Gestion des routes avec React Router Dom',
      "Requêtes avec Axios pour l'interrogation de l'API PokéAPI",
      "Utilisation de tanstack query pour la création d'un scroll infini",
      'Utilisation du localStorage pour stocker les pokémons capturés',
    ],
    stack: [
      'React',
      'Styled Components',
      'Axios',
      'tanstack-query',
      'Git',
      'GitHub',
    ],
  },
];

