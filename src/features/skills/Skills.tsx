import { skillGroups } from '@/data/skills';
import styles from './Skills.module.scss';

export function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className="shell">
        <div className={`${styles.head} reveal`}>
          <div className={styles.kicker}>Stack · 04</div>
          <h2 className={styles.title}>La <em>stack</em>.</h2>
        </div>
        <div className={styles.grid}>
          {skillGroups.map((group) => (
            <div key={group.category} className={`${styles.group} reveal`}>
              <h3>{group.category}</h3>
              <div className={styles.chips}>
                {group.skills.map((s) => (
                  <span key={s} className={styles.chip}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
