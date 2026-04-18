import { useEffect } from 'react';
import type { TweakState } from '@/types';
import styles from './TweaksPanel.module.scss';

const ACCENT_SWATCHES = [
  { label: 'Amber', hue: 75 },
  { label: 'Teal', hue: 200 },
  { label: 'Rose', hue: 15 },
  { label: 'Violet', hue: 290 },
  { label: 'Lime', hue: 130 },
];

interface TweaksPanelProps {
  open: boolean;
  onClose: () => void;
  state: TweakState;
  onChange: (next: TweakState) => void;
}

export function TweaksPanel({ open, onClose, state, onChange }: TweaksPanelProps) {
  const upd = <K extends keyof TweakState>(k: K, v: TweakState[K]) => {
    onChange({ ...state, [k]: v });
  };

  // Apply accent hue
  useEffect(() => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const l = isDark ? '0.78' : '0.65';
    const ls = isDark ? '0.28' : '0.93';
    const cs = isDark ? '0.05' : '0.04';
    document.documentElement.style.setProperty('--accent', `oklch(${l} 0.12 ${state.accentHue})`);
    document.documentElement.style.setProperty('--accent-soft', `oklch(${ls} ${cs} ${state.accentHue})`);
  }, [state.accentHue]);

  // Apply density + MTG
  useEffect(() => {
    document.body.setAttribute('data-density', state.density);
    document.body.setAttribute('data-mtg', state.mtg);
  }, [state.density, state.mtg]);

  return (
    <div className={`${styles.panel}${open ? ' ' + styles.open : ''}`} role="dialog" aria-label="Tweaks">
      <div className={styles.head}>
        <h4>Tweaks</h4>
        <button onClick={onClose} aria-label="Fermer">✕</button>
      </div>
      <div className={styles.body}>
        <div className={styles.tweak}>
          <div className={styles.label}>Accent hue</div>
          <div className={styles.row}>
            {ACCENT_SWATCHES.map((a) => (
              <button
                key={a.hue}
                className={`${styles.swatch}${state.accentHue === a.hue ? ' ' + styles.swatchActive : ''}`}
                style={{ background: `oklch(0.7 0.12 ${a.hue})` }}
                onClick={() => upd('accentHue', a.hue)}
                title={a.label}
              />
            ))}
          </div>
        </div>

        <div className={styles.tweak}>
          <div className={styles.label}>Densité</div>
          <div className={styles.row}>
            {(['compact', 'normal', 'spacious'] as const).map((d) => (
              <button
                key={d}
                className={`${styles.chip}${state.density === d ? ' ' + styles.chipActive : ''}`}
                onClick={() => upd('density', d)}
              >{d}</button>
            ))}
          </div>
        </div>

        <div className={styles.tweak}>
          <div className={styles.label}>Thème MTG (pips / emblèmes)</div>
          <div className={styles.row}>
            {(['on', 'off'] as const).map((v) => (
              <button
                key={v}
                className={`${styles.chip}${state.mtg === v ? ' ' + styles.chipActive : ''}`}
                onClick={() => upd('mtg', v)}
              >{v}</button>
            ))}
          </div>
        </div>

        <div className={styles.tweak}>
          <div className={styles.label}>Curseur custom</div>
          <div className={styles.row}>
            {(['on', 'off'] as const).map((v) => (
              <button
                key={v}
                className={`${styles.chip}${state.cursor === v ? ' ' + styles.chipActive : ''}`}
                onClick={() => upd('cursor', v)}
              >{v}</button>
            ))}
          </div>
        </div>

        <div className={styles.hint}>
          PS : tape ↑ ↑ ↓ ↓ ← → ← → B A n'importe où sur la page.
        </div>
      </div>
    </div>
  );
}
