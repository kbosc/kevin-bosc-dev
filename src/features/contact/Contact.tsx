import { personalInfo } from '@/data/personal';
import styles from './Contact.module.scss';

export function Contact() {
  const p = personalInfo;
  const links = [
    { k: 'Email', v: p.email, href: `mailto:${p.email}` },
    { k: 'Téléphone', v: p.phone, href: `tel:${p.phone.replace(/\s/g, '')}` },
    { k: 'GitHub', v: `@${p.alias}`, href: p.github },
    { k: 'Localisation', v: p.location, href: null },
  ];

  return (
    <section className={styles.section} id="contact">
      <div className="shell">
        <div className={styles.inner}>
          <div className="reveal">
            <div className={styles.kicker}>Contact · 06</div>
            <h2 className={styles.title}>On en <em>parle</em> ?</h2>
            <p className={styles.desc}>Dispo pour discuter mission, CDI ou juste pour échanger sur un projet. Le plus simple : un mail.</p>
          </div>
          <div className={`${styles.links} reveal`}>
            {links.map((l) => {
              const inner = (
                <>
                  <div>
                    <span className={styles.linkLabel}>{l.k}</span>
                    <span className={styles.linkVal}>{l.v}</span>
                  </div>
                  <span className={styles.arrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </>
              );
              return l.href ? (
                <a
                  key={l.k}
                  className={styles.link}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >{inner}</a>
              ) : (
                <div key={l.k} className={styles.link} style={{ cursor: 'default' }}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
