
# 🚀 Plan : Landing Page Portfolio CV — Kevin Bosc

**TL;DR** : Construire from scratch une landing page interactive **React 19 + TypeScript + Vite** servant de portfolio/CV, avec une charte graphique **"Arcane & Gold"** inspirée de Magic: The Gathering (accents or/ambre, fond parchemin en light / noir indigo en dark, couleurs de mana pour les catégories de skills, bordures dorées, glow effects). Le site intègre des animations 3D (Three.js : train SNCF, tag cloud de compétences, particules étoilées), un système **light/dark mode** avec animation vivante sur la photo de profil (séquence d'images type GIF où Kevin met/enlève ses lunettes de soleil), le tout **accessible (A11y)**, **responsive mobile-first**, testé (**Vitest** + Playwright), et déployé sur **Vercel**. Architecture feature-based avec **SASS modules** (pas de Tailwind/MUI). Le code doit être **clair, lisible et explicite** — on privilégie la lisibilité à la concision.

---

## Phase 0 — Setup du projet & Tooling

### 0.1 — Initialiser le projet Vite
- `npm create vite@latest . -- --template react-ts`
- `tsconfig.json` en **strict mode** avec path aliases (`@/` → `src/`)

### 0.2 — Dépendances

| Production | Dev |
|---|---|
| `react@19` `react-dom@19` | `typescript` `@types/react` `@types/react-dom` |
| `@react-three/fiber` `@react-three/drei` `three` `@types/three` | `eslint` `typescript-eslint` `eslint-plugin-react` `eslint-plugin-react-hooks` `eslint-plugin-jsx-a11y` |
| `framer-motion` | `prettier` `eslint-config-prettier` |
| `sass` | `vitest` `@vitest/coverage-v8` `jsdom` `@testing-library/react` `@testing-library/jest-dom` `@testing-library/user-event` |
| | `@playwright/test` `@axe-core/playwright` |

### 0.3 — Configuration Tooling
- **ESLint** : plugins `react`, `react-hooks`, `jsx-a11y`, `typescript-eslint` (règles strictes, no-explicit-any)
- **Prettier** : singleQuote, trailingComma all, printWidth 100
- **Vitest** : configuré dans `vite.config.ts` (intégration native Vite), environment `jsdom`, support natif des CSS modules SASS et path aliases — pas besoin de `identity-obj-proxy` ni de config séparée
- **Playwright** : projets chromium + firefox + mobile-safari, baseURL localhost:5173
- **Scripts npm** : `dev`, `build`, `lint`, `format`, `test`, `test:watch`, `test:coverage`, `test:e2e`

---

## Phase 1 — Architecture des dossiers

```
src/
├── app/
│   ├── App.tsx / App.module.scss / App.test.tsx
├── assets/
│   ├── images/
│   │   ├── kevin-sunglasses-on/       # Séquence d'images : Kevin MET ses lunettes (frame-01.png → frame-N.png)
│   │   ├── kevin-sunglasses-off/      # Séquence d'images : Kevin ENLÈVE ses lunettes (frame-01.png → frame-N.png)
│   │   ├── kevin-photo-light.png      # Frame finale light mode (avec lunettes) — fallback statique
│   │   ├── kevin-photo-dark.png       # Frame finale dark mode (sans lunettes) — fallback statique
│   │   └── kevin-cv.pdf
│   ├── models/                         # Modèle 3D train (optionnel)
│   └── fonts/
├── components/
│   ├── ui/                             # Composants atomiques réutilisables
│   │   ├── Button/        (Button.tsx + .module.scss + .test.tsx)
│   │   ├── SectionTitle/
│   │   ├── Container/
│   │   ├── Card/
│   │   ├── Tag/
│   │   ├── ProgressBar/
│   │   ├── IconLink/
│   │   ├── ThemeToggle/   (bouton switch light/dark ☀️🌙)
│   │   └── SkipToContent/ (A11y : lien skip-to-content)
│   └── three/                          # Composants Three.js isolés
│       ├── TrainScene/    (Canvas R3F + train animé 🚂)
│       ├── ParticleStars/ (Ciel étoilé dark mode ✨)
│       └── SkillsTagCloud/(Nuage 3D rotatif de tags)
├── features/                           # 1 section = 1 feature
│   ├── hero/       (Hero + ProfilePhoto + TypingTitle)
│   ├── about/      (About + InterestCard)
│   ├── experience/ (Experience + Timeline + TimelineItem)
│   ├── skills/     (Skills + SkillCategory)
│   ├── education/
│   ├── projects/   (Projects + ProjectCard style Magic 🃏)
│   ├── contact/
│   └── footer/     (+ Easter egg Pokéball 🔴⚪)
├── hooks/
│   ├── useTheme.ts            # Toggle light/dark
│   ├── useSpriteAnimation.ts  # Animation séquence d'images (frames, fps, direction)
│   ├── useScrollProgress.ts   # Progress 0→1 d'un élément au scroll
│   ├── useInView.ts           # Détection viewport (IntersectionObserver)
│   ├── useTypingEffect.ts     # Animation machine à écrire
│   ├── useReducedMotion.ts    # Respect prefers-reduced-motion
│   └── useMediaQuery.ts       # Breakpoints responsive
├── contexts/
│   └── ThemeContext.tsx      # Provider + Context (light/dark + localStorage)
├── data/
│   ├── experiences.ts       # Données structurées CV
│   ├── skills.ts / projects.ts / education.ts / personal.ts
├── styles/
│   ├── _variables.scss      # Tokens design (couleurs, spacing, breakpoints)
│   ├── _mixins.scss         # Mixins responsive, typo
│   ├── _reset.scss          # CSS reset
│   ├── _typography.scss
│   ├── _animations.scss     # Keyframes partagées
│   ├── _themes.scss         # CSS custom properties [data-theme="light"|"dark"]
│   └── index.scss           # @forward global
├── utils/ & types/
├── main.tsx
e2e/
├── landing.spec.ts / theme-toggle.spec.ts / navigation.spec.ts / accessibility.spec.ts
```

> 💡 **Principe** : chaque composant a ses fichiers co-localisés (`.tsx` + `.module.scss` + `.test.tsx`)

---

## Phase 2 — Fondations (Sprint 1)

### 2.1 — Système de thèmes Light/Dark
- **`ThemeContext`** : state + `localStorage`, applique `data-theme` sur `<html>`, respecte `prefers-color-scheme`
- **`useTheme`** : expose `{ theme, toggleTheme, isDark }`
- **`_themes.scss`** : CSS custom properties pour les deux palettes
- **`ThemeToggle`** : bouton `role="switch"` + `aria-checked` avec animation soleil↔lune (Framer Motion)

### 2.2 — Layout global & composants UI atomiques
- `App.tsx` : ThemeProvider → SkipToContent → Header (nav sticky) → Sections → Footer
- Composants `Button`, `Container`, `SectionTitle`, `Tag` (avec variantes, focus-visible)

### 2.3 — Données structurées
- Types TypeScript stricts : `Experience`, `Skill`, `Project`, `Education`
- Fichiers de données dans `src/data/` extrait du CV

---

## Phase 3 — Sections principales (Sprint 2)

### 3.1 — 🎯 Hero Section
- Plein écran, nom + titre animé (TypingTitle) + photo + 2 CTA
- **`ProfilePhoto`** : **animation vivante type mini-film / GIF** (pas une simple transition CSS entre 2 images statiques)
    - Le concept : quand l'utilisateur change de thème, on voit Kevin **physiquement mettre ou enlever ses lunettes de soleil** en une courte animation fluide (~1-2 secondes).
    - **Implémentation technique — Séquence d'images (sprite-sheet animation)** :
        - Préparer **2 séquences de frames** (photos prises ou générées) :
            - `kevin-sunglasses-on/` : ~15-25 frames montrant Kevin qui met ses lunettes (de sans → avec)
            - `kevin-sunglasses-off/` : ~15-25 frames montrant Kevin qui enlève ses lunettes (de avec → sans)
        - Un composant `ProfilePhoto` affiche une seule `<img>` dont la `src` change rapidement frame par frame via un hook `useSpriteAnimation`
        - Le hook `useSpriteAnimation` gère : préchargement de toutes les frames, index courant, lecture avant/arrière, état idle (affiche la frame finale du mode actif)
        - **Au changement de thème** : light→dark = jouer la séquence "enlève lunettes", dark→light = jouer la séquence "met lunettes"
        - **État idle** : affiche l'image statique finale correspondant au mode actif (fallback `kevin-photo-light.png` ou `kevin-photo-dark.png`)
    - **Alternative si pas assez de frames disponibles** : utiliser 2 vrais fichiers GIF (`kevin-to-light.gif` et `kevin-to-dark.gif`) joués une seule fois au changement de thème, puis afficher la frame finale en statique
    - **Accessibilité** : `alt="Photo de Kevin Bosc"`, `prefers-reduced-motion` → afficher directement l'image statique sans animation
    - **Hook dédié `useSpriteAnimation`** à ajouter dans `src/hooks/` :
        - Props : `frames: string[]`, `fps: number`, `playing: boolean`, `direction: 'forward' | 'reverse'`
        - Retourne : `{ currentFrame: string, isPlaying: boolean }`
        - Logique claire et séparée du composant d'affichage
- **`TypingTitle`** : "Développeur Frontend React" lettre par lettre + curseur clignotant. Respecte `prefers-reduced-motion`.

### 3.2 — 👤 About Section
- Paragraphe de présentation (reconversion, philosophie)
- Grille de `InterestCard` : Magic 🃏, badminton 🏸, musculation 💪, jeux de société 🎲
- Apparition au scroll (Framer Motion `whileInView`)

### 3.3 — 💼 Experience Section + 🚂 Train Three.js
- **Timeline verticale interactive** : ligne centrale, nœuds alternés, révélation au scroll
- Chaque item cliquable → expansion avec détails (stack, accomplissements)
- **`TrainScene` (Three.js)** : Canvas R3F en arrière-plan de la section
    - Train low-poly (primitives BoxGeometry/CylinderGeometry aux couleurs SNCF)
    - **Piloté par le scroll** : le train avance quand on scrolle dans la section
    - Rails + parallaxe caméra
    - **Fallback** : illustration SVG statique si WebGL non supporté ou reduced-motion

### 3.4 — 🛠 Skills Section
- **Double vue** : grille de Tags catégorisés (accessible) + `SkillsTagCloud` (Three.js)
- **Tag Cloud 3D** : sphère de mots rotative, interaction souris, couleurs par catégorie
- Alternative : barres de progression animées (Framer Motion)

### 3.5 — 📚 Education, 🎮 Projects, ✉️ Contact, Footer
- **`ProjectCard`** style **carte Magic: The Gathering** 🃏 : bordure ornementale, nom en haut, illustration, "texte de saveur" en bas, icônes stack = symboles de mana. **Effet tilt 3D au hover** (Framer Motion rotateX/rotateY)
- **🔴 Easter egg Pokéball** : SVG discrète dans le footer, au clic → animation d'ouverture + petit Pokémon qui apparaît. `aria-label="Easter egg"`.
- **Contact** : liens `mailto:` et `tel:`, icônes LinkedIn/GitHub
- **Footer** : copyright, lien source, Pokéball

---

## Phase 4 — Effets 3D & animations avancées (Sprint 3)

### 4.1 — ✨ Particules étoilées (dark mode uniquement)
- Canvas R3F en `position: fixed`, z-index: -1, couvre tout le viewport
- 500-1000 particules, rotation lente. Respect `prefers-reduced-motion`.

### 4.2 — Scroll-triggered animations
- `useScrollProgress` : retourne progress 0→1 dans un élément
- `useInView` : `IntersectionObserver` configurable
- Framer Motion `whileInView` + `viewport={{ once: true, amount: 0.3 }}` sur chaque section

### 4.3 — Parallaxe & transitions
- Parallaxe Hero : photo plus lente que le texte
- Séparateurs SVG ondulés/diagonaux entre sections (colorés selon le thème)

---

## Phase 5 — Accessibilité, tests & responsive (Sprint 4)

### 5.1 — 🎯 Audit & renforcement A11y
- Landmarks HTML : `<header>`, `<main>`, `<nav>`, `<footer>`, `<section aria-labelledby>`
- Skip-to-content visible au focus
- `focus-visible` outline personnalisé sur tous les interactifs
- Contraste WCAG AA minimum
- Canvas Three.js → `role="img"` + `aria-label` + fallback textuel
- `useReducedMotion` : désactive TOUTES les animations si actif
- Navigation clavier complète (timeline ↑↓)

### 5.2 — 🧪 Tests unitaires (Vitest + RTL) — Objectif > 80% coverage
- Chaque composant UI : rendu, props, états, interactions
- Chaque hook : `renderHook`
- Chaque section : présence du contenu
- Composants Three.js : mockés (jsdom ne rend pas les canvas), vérifier montage + props

### 5.3 — 🎭 Tests E2E (Playwright)
> **Recommandation : Playwright** plutôt que Cypress — plus rapide, multi-navigateurs natif, diversifie la stack de Kevin
- `landing.spec.ts` : scroll complet, toutes sections visibles
- `theme-toggle.spec.ts` : bascule thème + persistence localStorage
- `navigation.spec.ts` : Tab complet, skip-to-content, focus management
- `accessibility.spec.ts` : audit automatisé via `@axe-core/playwright`

### 5.4 — 📱 Responsive mobile-first
- **3 breakpoints** : mobile (défaut) / `768px` (tablet) / `1024px` (desktop)
- Mixin `@mixin respond-to($bp)` dans `_mixins.scss` (`'tablet'` et `'desktop'`)
- Mobile : timeline empilée, tag cloud → grille, train réduit/masqué
- Tablet : timeline alternée, layout intermédiaire
- Desktop : layout complet + tous les effets

---

## Phase 6 — Polish & déploiement (Sprint 5)

### 6.1 — Performance
- `React.lazy` + `Suspense` pour les canvas Three.js
- Images WebP + `srcset` + `loading="lazy"`
- Analyse bundle via `vite-plugin-visualizer`
- Objectif **Lighthouse > 90** sur les 4 catégories

### 6.2 — SEO & meta
- Open Graph + Twitter Card + `<title>`
- JSON-LD schema `Person`
- `robots.txt` + `sitemap.xml`

### 6.3 — Déploiement Vercel
- `vercel.json` avec config SPA
- Déploiement continu via Git
- Domaine custom si disponible

### 6.4 — Documentation
- **README.md** complet (description, stack, install, architecture, screenshots)
- JSDoc sur hooks et utilitaires

---

## 📋 Ordre d'implémentation

| # | Tâche | Dépend de | Statut |
|---|-------|-----------|--------|
| 1 | Setup Vite + TS + SASS + ESLint + Prettier + Vitest + Playwright | — | ✅ |
| 2 | Styles globaux (`_variables`, `_reset`, `_themes`, `_mixins`) | 1 | ✅ |
| 3 | `ThemeContext` + `useTheme` + `ThemeToggle` | 2 | ✅ |
| 4 | Composants UI atomiques | 2 | ✅ |
| 5 | Données structurées (`src/data/` + `src/types/`) | — | ✅ |
| 6 | Layout `App.tsx` + Header + `SkipToContent` | 3, 4 | ✅ |
| 7 | Hero + `ProfilePhoto` + `TypingTitle` | 3, 4, 6 | ✅ (placeholder photo) |
| 8 | About section | 4, 6 | ✅ |
| 9 | Experience + Timeline | 4, 5, 6 | ✅ |
| 10 | Skills (grille de tags) | 4, 5, 6 | ✅ |
| 11 | Education + Projects + Contact + Footer | 4, 5, 6 | ✅ |
| 12 | 🚂 `TrainScene` Three.js | 9 | ✅ (retiré — pas esthétique) |
| 13 | `SkillsTagCloud` Three.js | 10 | ✅ (drag-to-rotate + thème) |
| 14 | ✨ `ParticleStars` Three.js | 3 | ✅ |
| 15 | 🔴 Easter egg Pokéball | 11 | ✅ (wobble capture + SVG extrait) |
| 16 | Scroll animations + parallaxe | 7–11 | ✅ |
| 17 | Tests unitaires (tous) | 7–15 | ✅ (20 fichiers, 71 tests) |
| 18 | Tests E2E | 16 | ✅ (4 spec files) |
| 19 | Responsive fine-tuning + A11y audit | 17 | ✅ (burger menu mobile) |
| 20 | Performance + SEO + déploiement Vercel | 19 | ✅ (SEO, JSON-LD, meta, sitemap) |

---

## 🧑‍💻 Profil de l'agent développeur

L'agent qui implémentera devra :
- Être **expert React 19 / TypeScript strict** (hooks, composition, performance)
- Forte **sensibilité A11y** : HTML sémantique d'abord, ARIA ensuite, test clavier systématique
- **Écrire les tests juste après chaque composant** (pas les reporter)
- **Séparation logique/affichage** : hooks = logique, composants = rendu pur
- Nommage clair : `handleClick`, `isVisible`, `shouldAnimate`, préfixes `use`
- **Zéro `any`**, zéro `@ts-ignore`, zéro `eslint-disable` sans justification

---

## ⚠️ Points d'attention

1. **Photo de Kevin — Séquence d'images** : Kevin doit fournir **2 séries de photos** (type stop-motion, ~15-25 frames chacune) : une où il **met** ses lunettes de soleil, une où il les **enlève**. Alternative rapide : 2 fichiers GIF. Au minimum : 2 photos statiques (avec/sans lunettes) pour le fallback.

2. **Train 3D** : utiliser des primitives Three.js (BoxGeometry/CylinderGeometry colorées) plutôt qu'un fichier `.glb` → plus léger, look low-poly stylisé cohérent.

3. **Playwright > Cypress** : recommandé pour la rapidité, le multi-navigateurs natif, et ça diversifie la stack au-delà de Cypress déjà maîtrisé.

4. **Lisibilité du code** : tout le code produit doit être **explicite et lisible**. On préfère plus de lignes claires à une ligne cryptique. Pas de ternaires imbriquées, pas de destructuring excessif, pas d'abstractions prématurées. Chaque fichier doit se lire comme un livre.

