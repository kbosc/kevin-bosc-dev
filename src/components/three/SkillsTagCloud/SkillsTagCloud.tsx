import { lazy, Suspense } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';
import styles from './SkillsTagCloud.module.scss';

const SkillsTagCloudCanvas = lazy(() => import('./SkillsTagCloudCanvas'));

interface SkillsTagCloudProps {
  /** Array of skill names to display in the 3D cloud */
  skillNames: string[];
}

/**
 * 3D rotating sphere of skill tags using Three.js.
 * Falls back to nothing if reduced motion is preferred (the flat grid is shown instead).
 */
export function SkillsTagCloud({ skillNames }: SkillsTagCloudProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={styles.container}
      role="img"
      aria-label="Nuage de compétences en 3D"
    >
      <Suspense fallback={<div className={styles.loading}>Chargement…</div>}>
        <SkillsTagCloudCanvas skillNames={skillNames} isDark={isDark} />
      </Suspense>
    </div>
  );
}

