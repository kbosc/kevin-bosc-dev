import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { Tag } from '@/components/ui/Tag/Tag';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import styles from './Projects.module.scss';

const SECTION_TITLE_ID = 'projects-title';

export function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={styles.projects}
      aria-labelledby={SECTION_TITLE_ID}
    >
      <Container>
        <SectionTitle id={SECTION_TITLE_ID}>Projets</SectionTitle>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---- ProjectCard with Magic: The Gathering style + 3D tilt ----

interface ProjectCardProps {
  project: Project;
  index: number;
  prefersReducedMotion: boolean;
}

function ProjectCard({ project, index, prefersReducedMotion }: ProjectCardProps) {
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Map mouse position to rotation (-8deg to +8deg)
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const xPercent = (event.clientX - rect.left) / rect.width;
    const yPercent = (event.clientY - rect.top) / rect.height;

    mouseX.set(xPercent);
    mouseY.set(yPercent);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const tiltStyle = prefersReducedMotion
    ? {}
    : { rotateX, rotateY, transformPerspective: 800 };

  const entryAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, delay: index * 0.15 },
      };

  return (
    <motion.article
      className={styles.card}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...entryAnimation}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardName}>{project.name}</h3>
        </div>

        <p className={styles.cardType}>Projet Personnel — Créature Légendaire</p>

        <p className={styles.cardDescription}>{project.description}</p>

        <ul className={styles.highlightsList}>
          {project.highlights.map((highlight) => (
            <li key={highlight} className={styles.highlight}>
              {highlight}
            </li>
          ))}
        </ul>

        <div className={styles.cardFooter}>
          {project.stack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

