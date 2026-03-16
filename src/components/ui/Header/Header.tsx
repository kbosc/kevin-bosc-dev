import { Container } from '@/components/ui/Container/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { href: '#about-title', label: 'À propos' },
  { href: '#experience-title', label: 'Expériences' },
  { href: '#skills-title', label: 'Compétences' },
  { href: '#education-title', label: 'Formation' },
  { href: '#projects-title', label: 'Projets' },
  { href: '#contact-title', label: 'Contact' },
];

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            KB
          </a>

          <nav className={styles.nav} aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

