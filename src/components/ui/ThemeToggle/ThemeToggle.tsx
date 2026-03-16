import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const label = isDark
    ? 'Passer au mode clair'
    : 'Passer au mode sombre';

  const iconAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { rotate: -90, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
        exit: { rotate: 90, opacity: 0 },
        transition: { duration: 0.25 },
      };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span key="moon" className={styles.icon} {...iconAnimation}>
            🌙
          </motion.span>
        ) : (
          <motion.span key="sun" className={styles.icon} {...iconAnimation}>
            ☀️
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

