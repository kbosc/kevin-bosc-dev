import { personalInfo } from '@/data/personal';
import styles from './About.module.scss';

export function About() {
  const p = personalInfo;
  const stats = [
    { k: 'Rôle', v: 'Frontend React Engineer' },
    { k: 'Années XP', v: '5+' },
    { k: 'Stack cœur', v: 'React · TS · Sass' },
    { k: 'Méthodo', v: 'Scrum · Kanban' },
  ];

  return (
    <section className={styles.section} id="about">
      <div className="shell">
        <div className={`${styles.head} reveal`}>
          <div className={styles.kicker}>About · 02</div>
          <h2 className={styles.title}>L'histoire <em>courte</em>.</h2>
        </div>
        <div className={styles.grid}>
          <p className={`${styles.bio} reveal`}>{p.bio}</p>
          <div className={`${styles.statsCol} reveal`}>
            {stats.map((s) => (
              <div key={s.k} className={styles.stat}>
                <div className={styles.statLabel}>{s.k}</div>
                <div className={styles.statVal}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
