import styles from './Pokeball.module.scss';

interface PokeballProps {
  /** Width and height of the SVG in pixels. Default: 36 */
  size?: number;
}

/**
 * Classic Pokéball SVG icon — red & white with center button.
 * Reusable across any component that needs a Pokéball visual.
 */
export function Pokeball({ size = 36 }: PokeballProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className={styles.pokeball}
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

