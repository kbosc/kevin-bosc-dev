import { useState } from 'react';
import { Container } from '@/components/ui/Container/Container';
import styles from './Footer.module.scss';

const EASTER_EGG_MESSAGES = [
  'Pikachu sauvage apparaît ! ⚡',
  'Attrapez-les tous ! 🎮',
  'Bulbizarre utilise Fouet Lianes ! 🌿',
  'Dracaufeu utilise Lance-Flammes ! 🔥',
];

export function Footer() {
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  const handlePokeballClick = () => {
    const randomIndex = Math.floor(Math.random() * EASTER_EGG_MESSAGES.length);
    const message = EASTER_EGG_MESSAGES[randomIndex];
    setEasterEggMessage(message);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <p className={styles.copyright}>
            © {currentYear} Kevin Bosc · Fait avec React & TypeScript
          </p>

          <button
            className={styles.pokeball}
            onClick={handlePokeballClick}
            aria-label="Easter egg — cliquez pour une surprise"
            title="Easter egg"
          >
            🔴
          </button>

          {easterEggMessage && (
            <p className={styles.easterEgg} role="status">
              {easterEggMessage}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}

