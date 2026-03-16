import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  id: string;
  children: string;
}

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className={styles.sectionTitle}>
      {children}
    </h2>
  );
}

