import { useState, useCallback } from 'react';
import { Container } from '@/components/ui/Container/Container';
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
            <PokeballSvg />
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

// ---------------------------------------------------
// Pokéball SVG — classic red & white design
// ---------------------------------------------------

function PokeballSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      width="36"
      height="36"
      aria-hidden="true"
      className={styles.pokeballSvg}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#333" strokeWidth="4" />

      {/* Top half — red */}
      <path
        d="M 2,50 A 48,48 0 0,1 98,50"
        fill="#dc2626"
        stroke="#333"
        strokeWidth="4"
      />

      {/* Bottom half — white */}
      <path
        d="M 2,50 A 48,48 0 0,0 98,50"
        fill="#f5f5f5"
        stroke="#333"
        strokeWidth="4"
      />

      {/* Center band */}
      <rect x="2" y="46" width="96" height="8" fill="#333" />

      {/* Center button — outer ring */}
      <circle cx="50" cy="50" r="14" fill="#f5f5f5" stroke="#333" strokeWidth="4" />

      {/* Center button — inner dot */}
      <circle cx="50" cy="50" r="7" fill="#f5f5f5" stroke="#555" strokeWidth="2" />
    </svg>
  );
}

