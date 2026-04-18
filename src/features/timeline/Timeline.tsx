import { timeline } from '@/data/timeline';
import styles from './Timeline.module.scss';

export function Timeline() {
  return (
    <section className={styles.section} id="timeline">
      <div className="shell">
        <div className={`${styles.head} reveal`}>
          <div className={styles.kicker}>Timeline · 03</div>
          <h2 className={styles.title}>Le <em>parcours</em>.</h2>
        </div>
        <div className={styles.timeline}>
          {[...timeline].reverse().map((t, i) => (
            <div key={i} className={`tl-item ${styles.item}`} data-kind={t.kind}>
              <div className={styles.year}>{t.year}</div>
              <div className={styles.itemTitle}>{t.title}</div>
              <div className={styles.sub}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
