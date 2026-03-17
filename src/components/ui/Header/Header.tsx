import {useCallback, useState} from 'react';
import {Container} from '@/components/ui/Container/Container';
import {ThemeToggle} from '@/components/ui/ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';
import {NAV_LINKS} from './Header.constants';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = useCallback(() => {
        setIsMenuOpen((previous) => !previous);
    }, []);

    const handleLinkClick = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const menuLabel = isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu';

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <a href="#top" className={styles.logo}>
                        KB
                    </a>

                    <nav
                        className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
                        aria-label="Navigation principale"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={styles.navLink}
                                onClick={handleLinkClick}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className={styles.actions}>
                        <ThemeToggle/>

                        <button
                            className={styles.burger}
                            onClick={handleToggleMenu}
                            aria-label={menuLabel}
                            aria-expanded={isMenuOpen}
                        >
                            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ''}`}/>
                            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ''}`}/>
                            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ''}`}/>
                        </button>
                    </div>
                </div>
            </Container>
        </header>
    );
}

