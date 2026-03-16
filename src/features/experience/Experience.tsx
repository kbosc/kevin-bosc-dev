import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { Tag } from '@/components/ui/Tag/Tag';
import { experiences } from '@/data/experiences';
import type { Experience as ExperienceType } from '@/types';
import styles from './Experience.module.scss';

const SECTION_TITLE_ID = 'experience-title';

export function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={styles.experience}
      aria-labelledby={SECTION_TITLE_ID}
    >
      <Container>
        <SectionTitle id={SECTION_TITLE_ID}>
          Expériences professionnelles
        </SectionTitle>

        <div className={styles.timeline}>
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---- Timeline Item ----

interface TimelineItemProps {
  experience: ExperienceType;
  index: number;
  prefersReducedMotion: boolean;
}

function TimelineItem({
  experience,
  index,
  prefersReducedMotion,
}: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((previous) => !previous);
  };

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, delay: index * 0.1 },
      };

  const expandButtonLabel = isExpanded ? 'Voir moins' : 'Voir plus';
  const expandButtonIcon = isExpanded ? '▲' : '▼';

  const alwaysVisibleHighlights = experience.highlights.slice(0, 3);
  const hiddenHighlights = experience.highlights.slice(3);
  const hasMoreHighlights = hiddenHighlights.length > 0;

  // Animation variants for the collapsible section
  const collapseAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { height: 0, opacity: 0 },
        animate: { height: 'auto', opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
      };

  return (
    <motion.div className={styles.timelineItem} {...animationProps}>
      <div className={styles.timelineDot} />

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.company}>{experience.company}</h3>
          <p className={styles.role}>{experience.role}</p>
          <p className={styles.dates}>
            {experience.startDate} – {experience.endDate} · {experience.location}
          </p>
        </div>

        <p className={styles.description}>{experience.description}</p>

        {experience.projectUrl && (
          <a
            href={experience.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            <span aria-hidden="true">🔗</span> Voir le projet
          </a>
        )}

        {/* Always visible highlights (first 3) */}
        <ul className={styles.highlightsList}>
          {alwaysVisibleHighlights.map((highlight) => (
            <li key={highlight} className={styles.highlight}>
              {highlight}
            </li>
          ))}
        </ul>

        {/* Collapsible highlights (4+) with smooth animation */}
        <AnimatePresence initial={false}>
          {isExpanded && hasMoreHighlights && (
            <motion.div
              className={styles.collapsibleSection}
              {...collapseAnimation}
            >

              <ul className={styles.highlightsList}>
                {hiddenHighlights.map((highlight, highlightIndex) => (
                  <motion.li
                    key={highlight}
                    className={styles.highlight}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: highlightIndex * 0.04 }}
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.stackList}>
          {experience.stack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>

        {hasMoreHighlights && (
          <button
            className={styles.expandButton}
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
          >
            <span>{expandButtonLabel}</span>
            <motion.span
              className={styles.expandIcon}
              aria-hidden="true"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {expandButtonIcon}
            </motion.span>
          </button>
        )}
      </div>
    </motion.div>
  );
}


