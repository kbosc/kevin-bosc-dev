import { lazy, Suspense } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './TrainScene.module.scss';

const TrainSceneCanvas = lazy(() => import('./TrainSceneCanvas'));

interface TrainSceneProps {
  /** Whether the train animation should play (e.g. when SNCF card is expanded) */
  isVisible: boolean;
}

/**
 * 3D train scene that plays a one-shot crossing animation.
 * Used inside the SNCF experience card — appears when the user
 * clicks "Voir plus" to expand the SNCF experience details.
 *
 * The train enters from the left, crosses to the right, then loops gently.
 * Respects prefers-reduced-motion by not rendering.
 */
export function TrainScene({ isVisible }: TrainSceneProps) {
  const prefersReducedMotion = useReducedMotion();

  // Don't render at all if motion is reduced or not visible
  if (!isVisible || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={styles.container}
      role="img"
      aria-label="Animation 3D d'un train SNCF traversant l'écran"
    >
      <Suspense fallback={<div className={styles.loading}>🚂</div>}>
        <TrainSceneCanvas />
      </Suspense>
    </div>
  );
}


