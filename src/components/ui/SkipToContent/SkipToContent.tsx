import styles from './SkipToContent.module.scss';

export function SkipToContent() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Aller au contenu principal
    </a>
  );
}

