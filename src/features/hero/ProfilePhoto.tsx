import { useTheme } from '@/hooks/useTheme';
import styles from './Hero.module.scss';

/**
 * ProfilePhoto displays Kevin's profile photo.
 *
 * In the future, this will use a sprite-sheet animation (useSpriteAnimation)
 * to show Kevin putting on / taking off sunglasses when the theme toggles.
 *
 * For now, it renders a placeholder circle until the real photo assets
 * (frame sequences or GIFs) are provided by Kevin.
 */
export function ProfilePhoto() {
  const { isDark } = useTheme();

  // TODO: Replace with sprite animation once photo assets are provided.
  // The useSpriteAnimation hook is ready in src/hooks/useSpriteAnimation.ts.
  // It needs two sets of frame images:
  //   - kevin-sunglasses-on/ (putting sunglasses on, light mode)
  //   - kevin-sunglasses-off/ (taking sunglasses off, dark mode)

  const altText = isDark
    ? 'Photo de Kevin Bosc sans lunettes de soleil'
    : 'Photo de Kevin Bosc avec lunettes de soleil';

  return (
    <div className={styles.photoWrapper}>
      {/* Placeholder until real assets are provided */}
      <div
        className={styles.photo}
        role="img"
        aria-label={altText}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark
            ? 'var(--color-bg-tertiary)'
            : 'var(--color-bg-accent)',
          fontSize: '4rem',
        }}
      >
        {isDark ? '🌙' : '😎'}
      </div>
    </div>
  );
}

