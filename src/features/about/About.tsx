import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { personalInfo } from '@/data/personal';
import styles from './About.module.scss';

const SECTION_TITLE_ID = 'about-title';

export function About() {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5 },
      };

  return (
    <section
      className={styles.about}
      aria-labelledby={SECTION_TITLE_ID}
    >
      <Container>
        <SectionTitle id={SECTION_TITLE_ID}>À propos</SectionTitle>

        <motion.p className={styles.text} {...animationProps}>
          {personalInfo.about}
        </motion.p>

        <div className={styles.interestsGrid}>
          {personalInfo.interests.map((interest, index) => (
            <motion.div
              key={interest.label}
              className={styles.interestCard}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.4, delay: index * 0.1 },
                  })}
            >
              <span className={styles.interestEmoji} aria-hidden="true">
                {interest.emoji}
              </span>
              <span className={styles.interestLabel}>{interest.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

