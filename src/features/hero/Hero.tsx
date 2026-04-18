import { personalInfo } from '@/data/personal';
import styles from './Hero.module.scss';

export function Hero() {
  const p = personalInfo;
  return (
    <section className={styles.hero} id="top">
      <div className="shell">
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>Disponible pour un nouveau projet</span>
        </div>
        <h1 className={styles.h1}>
          {p.name.split(' ')[0]}<br />
          <em>{p.name.split(' ')[1]}</em> — Frontend<br />
          React engineer.
        </h1>
        <p className={styles.sub}>
          {p.tagline} Je code, je teste, je documente, je livre. Plateformes critiques, accessibilité, performances — terrain de jeu quotidien.
        </p>
        <div className={styles.meta}>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s-8-9-8-13a8 8 0 1 1 16 0c0 4-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            {p.location}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            {p.email}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 2v10l7 3" />
            </svg>
            5+ ans · React
          </span>
        </div>
      </div>
    </section>
  );
}
