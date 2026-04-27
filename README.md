# kevin-bosc.dev

Portfolio interactif personnel — CV sous forme de deck de cartes MTG, thème clair/sombre, animations Three.js.

**Live →** [kbosc.github.io/kevin-bosc-dev](https://kbosc.github.io/kevin-bosc-dev)

---

## Stack

| Catégorie | Technos |
|---|---|
| UI | React 19, TypeScript, SCSS Modules |
| 3D / WebGL | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion |
| Tests | Vitest, React Testing Library, Playwright |
| Build | Vite 8 |
| Lint | ESLint (react-hooks, jsx-a11y), Prettier |
| Deploy | GitHub Pages via GitHub Actions |

---

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run build          # build production (tsc + vite)
npm run preview        # preview du build local
npm run lint           # ESLint
npm run lint:fix       # ESLint --fix
npm run typecheck      # tsc --noEmit
npm run test           # Vitest (run once)
npm run test:coverage  # rapport de couverture V8
```

---

## Architecture

```
src/
├── app/              # Entrée React (App.tsx + ThemeProvider)
├── components/
│   ├── three/        # Scènes WebGL (ParticleStars, SkillsTagCloud, TrainScene)
│   └── ui/           # Composants atomiques (Button, Card, Header, …)
├── contexts/         # ThemeContext
├── data/             # Données statiques (cards, skills, timeline, …)
├── features/         # Sections de la page (Hero, Deck, About, Skills, …)
├── hooks/            # Hooks custom (useMediaQuery, useKonami, useTweakAttr, …)
├── styles/           # Tokens SCSS globaux (_variables, _mixins, _themes, …)
├── test/             # Setup Vitest (jest-dom, mocks matchMedia / IntersectionObserver)
└── types/            # Types TypeScript partagés
```

### Points notables

- **Deck mobile** : swipe natif via touch events.
- **Thème** : `data-theme` sur `<html>`, persisté en localStorage, lu au montage avant le premier render.
- **TweaksPanel** : accent hue, density, MTG art mode, custom cursor — persistés en localStorage.
- **Konami code** : séquence complète → cascade flip des cartes + flash visuel.
- **SCSS** : architecture `@use` / `@forward`, tokens centralisés dans `_variables.scss`, zéro `@import`.

---

## Tests

122 tests unitaires Vitest répartis sur 29 fichiers. Couverture : features, hooks, contextes, composants UI et Three.js (mocks WebGL).

```bash
npm run test             # suite complète
npm run test:coverage    # rapport HTML dans coverage/
```

Les E2E Playwright (`@playwright/test` + `@axe-core/playwright`) sont en cours de mise en place.

---

## CI/CD

GitHub Actions sur chaque push `main` :

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. Deploy sur GitHub Pages (branche `gh-pages`)

---

## Contact

Kevin Bosc — [bosc.kev@gmail.com](mailto:bosc.kev@gmail.com) — Paris, FR
