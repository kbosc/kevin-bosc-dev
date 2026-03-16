import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { ProfilePhoto } from './ProfilePhoto';
import { personalInfo } from '@/data/personal';
import styles from './Hero.module.scss';

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const { displayedText, isComplete } = useTypingEffect({
    text: personalInfo.title,
    speed: 80,
    startDelay: 600,
  });

  // When reduced motion is preferred, skip all animations
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden' as const,
        animate: 'visible' as const,
        variants: FADE_IN_UP,
        transition: { duration: 0.6 },
      };

  const showCursor = !isComplete;

  return (
    <section className={styles.hero} aria-label="Introduction">
      <Container>
        <div className={styles.content}>
          <motion.div {...animationProps}>
            <ProfilePhoto />
          </motion.div>

          <motion.h1
            className={styles.name}
            {...animationProps}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {personalInfo.name}
          </motion.h1>

          <div className={styles.titleWrapper}>
            <span className={styles.title} role="heading" aria-level={2}>
              {displayedText}
              {showCursor && <span className={styles.cursor} aria-hidden="true" />}
            </span>
          </div>

          <motion.p
            className={styles.subtitle}
            {...animationProps}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            5 ans d'expérience · 13 millions de visiteurs
          </motion.p>

          <motion.div
            className={styles.actions}
            {...animationProps}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button as="link" href="/Kevin-CV.pdf" download>
              📄 Télécharger mon CV
            </Button>
            <Button
              as="link"
              href={`mailto:${personalInfo.email}`}
              variant="secondary"
            >
              ✉️ Me contacter
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

