import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { Tag } from '@/components/ui/Tag/Tag';
import type { ManaColor } from '@/components/ui/Tag/Tag';
import { SkillsTagCloud } from '@/components/three/SkillsTagCloud/SkillsTagCloud';
import { skills, skillCategoryLabels } from '@/data/skills';
import type { SkillCategory } from '@/types';
import styles from './Skills.module.scss';

const SECTION_TITLE_ID = 'skills-title';

// Map each skill category to an MTG mana color
const CATEGORY_MANA_MAP: Record<SkillCategory, ManaColor> = {
  languages: 'blue',
  frameworks: 'red',
  testing: 'green',
  tools: 'purple',
  cloud: 'purple',
  methodologies: 'white',
};

// Group skills by their category
function groupSkillsByCategory() {
  const grouped = new Map<SkillCategory, string[]>();

  for (const skill of skills) {
    const existing = grouped.get(skill.category) ?? [];
    existing.push(skill.name);
    grouped.set(skill.category, existing);
  }

  return grouped;
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const groupedSkills = groupSkillsByCategory();

  // Collect all skill names for the 3D cloud
  const allSkillNames = skills.map((skill) => skill.name);

  return (
    <section
      className={styles.skills}
      aria-labelledby={SECTION_TITLE_ID}
    >
      <Container>
        <SectionTitle id={SECTION_TITLE_ID}>Compétences</SectionTitle>

        {Array.from(groupedSkills.entries()).map(
          ([category, skillNames], groupIndex) => {
            const categoryLabel = skillCategoryLabels[category] ?? category;

            const animationProps = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.4, delay: groupIndex * 0.1 },
                };

            return (
              <motion.div
                key={category}
                className={styles.categoryGroup}
                {...animationProps}
              >
                <h3 className={styles.categoryTitle}>{categoryLabel}</h3>
                <div className={styles.tagList}>
                  {skillNames.map((name) => (
                    <Tag
                      key={name}
                      label={name}
                      mana={CATEGORY_MANA_MAP[category]}
                    />
                  ))}
                </div>
              </motion.div>
            );
          },
        )}

        <SkillsTagCloud skillNames={allSkillNames} />
      </Container>
    </section>
  );
}


