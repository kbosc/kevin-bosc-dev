import { sideQuests } from '@/data/sideQuests';
import styles from './SideQuests.module.scss';

export function SideQuests() {
  return (
    <section className={styles.section} id="sidequests">
      <div className="shell">
        <div className={`${styles.head} reveal`}>
          <div className={styles.kicker}>Hors code · 05</div>
          <h2 className={styles.title}>Les <em>side quests</em>.</h2>
          <p className={styles.desc}>
            Ce qui alimente la concentration quand je ne code pas — stratégie, explosivité, discipline. Trois piliers, une même logique.
          </p>
        </div>
        <div className={styles.grid}>
          {sideQuests.map((q) => (
            <article key={q.id} className={`${styles.quest} reveal`}>
              <div className={styles.questKicker}>{q.kicker}</div>
              <h3>{q.title}</h3>
              <p>{q.body}</p>
              <div className={styles.stats}>
                {q.stats.map((s) => (
                  <div key={s.label}>
                    <span className={styles.statLabel}>{s.label}</span>
                    <span className={styles.statVal}>{s.value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
