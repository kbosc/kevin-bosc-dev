import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.inner}>
          <span>© 2026 Kevin Bosc — built with care</span>
          <span>v2.0 · original design</span>
        </div>
      </div>
    </footer>
  );
}
