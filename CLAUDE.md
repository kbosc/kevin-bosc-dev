# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # dev server at http://localhost:5173
npm run build            # tsc -b && vite build
npm run lint             # ESLint (react-hooks, jsx-a11y, prettier)
npm run lint:fix         # ESLint --fix
npm run typecheck        # tsc --noEmit
npm run test             # Vitest run once (122 tests / 29 files)
npm run test:coverage    # V8 coverage → coverage/
npx vitest run <file>    # run a single test file
npx vitest run --reporter=verbose  # full output with test names
```

Playwright E2E (not yet implemented, infra ready):
```bash
npx playwright test      # requires npm run dev running first (or uses webServer)
```

## Architecture

Single-page portfolio. `App.tsx` composes all sections in order: Hero → Deck → About → Timeline → Skills → SideQuests → Contact, wrapped in `ThemeProvider`.

### Data flow

All content lives in `src/data/` as static TypeScript arrays. Types in `src/types/index.ts`. No external API calls, no server state.

- `cards.ts` — the central data source. Each `Card` has `type: 'experience' | 'project'`, `rarity`, `power/toughness` (MTG metaphor), `highlights[]`, `stack[]`, optional `screenshotLight/Dark` (imported PNGs).
- `personal.ts` — single `PersonalInfo` object used by Hero, About, Contact.
- `skills.ts` — `SkillGroup[]` rendered by Skills section. Three.js is intentionally listed here (used in the project).

### Theme system

`ThemeContext` (src/contexts/ThemeContext.tsx) manages `'light' | 'dark'`. On mount it reads `localStorage('theme-preference')`, falls back to `prefers-color-scheme`. Applies `data-theme` attribute on `<html>`. CSS custom properties in `_themes.scss` handle all visual differences via `[data-theme='light']` / `[data-theme='dark']` selectors.

`useTheme()` hook — throws if used outside `ThemeProvider`.

### TweaksPanel

Persisted in `localStorage('kb-tweaks:v1')` as `TweakState { accentHue, density, mtg, cursor }`. Applied as `data-*` attributes on `<body>` (via `App.tsx` useEffect). `useTweakAttr(attr)` reads these attributes reactively via `MutationObserver` — used by `CardArt` to show/hide MTG art.

### Deck & mobile interaction

`Deck.tsx` is the most complex component. Key behaviors:

- **Desktop**: `onClick` on each `Card` calls `toggleFlip(id)`.
- **Mobile** (`isMobile` via `matchMedia('(max-width: 700px)')`): shows a stacked carousel. Swipe handled via `onTouchStart/Move/End` on the container div.
- **Tap-to-flip on mobile**: handled directly in `onTouchEnd` (not via `onClick`) because iOS Safari doesn't reliably fire `click` after touch events on parent-handled elements. A `justHandledTap` ref prevents double-flip when DevTools ghost-click fires after touchend. Pattern: `onTouchEnd` sets `justHandledTap.current = true` + `setTimeout(reset, 400)`; Card's `onFlip` in mobile mode bails early if the ref is set.
- **Konami cascade**: `window` listens for `'konami-cascade'` custom event (dispatched by `useKonami`) and staggered-flips all cards via `setTimeout`.

### SCSS conventions

`@use` / `@forward` only — zero `@import`. All tokens in `src/styles/_variables.scss` (breakpoints, spacing, typography, radii, transitions, z-index). Component files do `@use '@/styles/variables' as *` and `@use '@/styles/mixins' as *`. The `@` alias resolves to `src/` via Vite.

`index.scss` uses CSS custom properties (`--bg`, `--ink`, `--accent`, `--font-body`…) defined in `_themes.scss` — these are the live design tokens used by feature components. The SCSS variables in `_variables.scss` are used by UI components (Button, Tag, etc.) and `_typography.scss`.

### ESLint rules to know

- `react-hooks/refs`: accessing `ref.current` during render is an error. Use state instead.
- `@typescript-eslint/no-explicit-any`: error.
- Unused vars: error unless prefixed with `_`.

## Test patterns

Setup file: `src/test/setup.ts` — mocks `window.matchMedia` (returns `matches: false`) and `IntersectionObserver`.

**Override matchMedia for mobile tests:**
```ts
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: mobile && query === '(max-width: 700px)',
    addEventListener: vi.fn(), removeEventListener: vi.fn(), /* … */
  }),
});
```

**Flip state assertion** (CSS modules hash the class names):
```ts
expect(cardElement.className).toContain('flipped'); // substring match works
```

**Fake timers + React state** — always wrap `vi.advanceTimersByTimeAsync` in `act`:
```ts
await act(async () => { await vi.advanceTimersByTimeAsync(200); });
```

**Touch events in tests** use `fireEvent.touchStart/End` (not `userEvent`), fire on any child — events bubble to the `mobileStack` container.

## Key files

| File | Role |
|---|---|
| `src/features/deck/Deck.tsx` | Most complex component — filters, flip state, mobile swipe, konami |
| `src/components/ui/Card/Card.tsx` | Presentational card — `memo`, `data-rarity`, `data-card` attributes |
| `src/contexts/ThemeContext.tsx` | Theme state + localStorage persistence |
| `src/hooks/useTweakAttr.ts` | MutationObserver on `document.body` attributes |
| `src/hooks/useKonami.ts` | Sequence detector → dispatches `konami-cascade` + DOM flash |
| `src/styles/_variables.scss` | Single source of truth for all SCSS tokens |
| `src/data/cards.ts` | All experience/project cards with imported PNG screenshots |
