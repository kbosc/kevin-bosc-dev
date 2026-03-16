import { useState, useCallback } from 'react';
import { Container } from '@/components/ui/Container/Container';
import { Pokeball } from '@/components/ui/Pokeball/Pokeball';
import styles from './Footer.module.scss';

// ---------------------------------------------------
// Easter egg messages — shown after a successful "capture"
// ---------------------------------------------------

const EASTER_EGG_MESSAGES = [
  'Pikachu sauvage apparaît ! ⚡',
  'Attrapez-les tous ! 🎮',
  'Bulbizarre utilise Fouet Lianes ! 🌿',
  'Dracaufeu utilise Lance-Flammes ! 🔥',
  'Évoli hésite sur son évolution… 🌟',
  'Rondoudou chante une berceuse ! 🎵',
];

// Animation phases for the Pokéball capture sequence
type CapturePhase = 'idle' | 'wobbling' | 'caught';

// Duration of the wobble animation (must match CSS)
const WOBBLE_DURATION_MS = 2400;
// Short pause after wobble before showing the message
const CATCH_DELAY_MS = 600;

export function Footer() {
  const [capturePhase, setCapturePhase] = useState<CapturePhase>('idle');
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  const handlePokeballClick = useCallback(() => {
    // Don't allow re-click during animation
    if (capturePhase === 'wobbling') return;

    // Reset message and start wobble animation
    setEasterEggMessage(null);
    setCapturePhase('wobbling');

    // After wobble finishes → show "caught" state
    setTimeout(() => {
      setCapturePhase('caught');

      // Pick a random message
      const randomIndex = Math.floor(Math.random() * EASTER_EGG_MESSAGES.length);
      const message = EASTER_EGG_MESSAGES[randomIndex];

      // Short delay before revealing the message (the "click" moment)
      setTimeout(() => {
        setEasterEggMessage(message);

        // Reset to idle after a while so user can play again
        setTimeout(() => {
          setCapturePhase('idle');
        }, 3000);
      }, CATCH_DELAY_MS);
    }, WOBBLE_DURATION_MS);
  }, [capturePhase]);

  const currentYear = new Date().getFullYear();

  // CSS class based on current animation phase
  const pokeballClassName = [
    styles.pokeball,
    capturePhase === 'wobbling' ? styles.wobbling : '',
    capturePhase === 'caught' ? styles.caught : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <p className={styles.copyright}>
            © {currentYear} Kevin Bosc · Fait avec React & TypeScript
          </p>

          <button
            className={pokeballClassName}
            onClick={handlePokeballClick}
            aria-label="Easter egg — cliquez pour une surprise"
            title="Easter egg"
            disabled={capturePhase === 'wobbling'}
          >
            <Pokeball />
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


