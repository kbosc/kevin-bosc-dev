import { lazy, Suspense } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './ParticleStars.module.scss';

const ParticleStarsCanvas = lazy(() => import('./ParticleStarsCanvas'));

/**
 * Full-viewport starfield background, visible only in dark mode.
 * Uses React.lazy to code-split the Three.js canvas.
 * Falls back to nothing (no visual) while loading or when reduced motion is preferred.
 */
export function ParticleStars() {
  const { isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const shouldRender = isDark && !prefersReducedMotion;

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={styles.container}
      role="img"
      aria-label="Animation de fond : ciel étoilé"
    >
      <Suspense fallback={null}>
        <ParticleStarsCanvas />
      </Suspense>
    </div>
  );
}

