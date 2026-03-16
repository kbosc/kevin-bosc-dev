import styles from './Tag.module.scss';

export type ManaColor = 'blue' | 'red' | 'green' | 'white' | 'purple';

interface TagProps {
  label: string;
  mana?: ManaColor;
}

const MANA_CLASS_MAP: Record<ManaColor, string> = {
  blue: styles.manaBlue,
  red: styles.manaRed,
  green: styles.manaGreen,
  white: styles.manaWhite,
  purple: styles.manaPurple,
};

export function Tag({ label, mana }: TagProps) {
  const manaClass = mana ? MANA_CLASS_MAP[mana] : '';
  const className = [styles.tag, manaClass].filter(Boolean).join(' ');

  return <span className={className}>{label}</span>;
}
