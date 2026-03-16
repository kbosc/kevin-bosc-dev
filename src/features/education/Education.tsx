import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { education } from '@/data/education';
import styles from './Education.module.scss';

const SECTION_TITLE_ID = 'education-title';

export function Education() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={styles.education}
      aria-labelledby={SECTION_TITLE_ID}
    >
      <Container>
        <SectionTitle id={SECTION_TITLE_ID}>Formation</SectionTitle>

        <div className={styles.grid}>
          {education.map((item, index) => {
            const animationProps = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.4, delay: index * 0.15 },
                };

            return (
              <motion.article key={item.id} className={styles.card} {...animationProps}>
                <h3 className={styles.school}>{item.school}</h3>
                <p className={styles.degree}>{item.degree}</p>
                <p className={styles.meta}>
                  {item.year} · {item.level}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

