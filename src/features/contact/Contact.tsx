import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { personalInfo } from '@/data/personal';
import styles from './Contact.module.scss';

const SECTION_TITLE_ID = 'contact-title';

export function Contact() {
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
      className={styles.contact}
      aria-labelledby={SECTION_TITLE_ID}
    >
      <Container>
        <SectionTitle id={SECTION_TITLE_ID}>Contact</SectionTitle>

        <motion.div className={styles.content} {...animationProps}>
          <p className={styles.text}>
            Vous avez un projet ou une opportunité ? N'hésitez pas à me
            contacter, je serai ravi d'échanger avec vous.
          </p>

          <div className={styles.links}>
            <a
              href={`mailto:${personalInfo.email}`}
              className={styles.contactLink}
            >
              <span aria-hidden="true">✉️</span>
              {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className={styles.contactLink}
            >
              <span aria-hidden="true">📱</span>
              {personalInfo.phone}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

