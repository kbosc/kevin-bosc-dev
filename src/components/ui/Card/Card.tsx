import React, { useMemo } from 'react';
import type { Card as CardType } from '@/types';
import styles from './Card.module.scss';

// Abstract emblems — original shapes, no copyrighted assets
function CardEmblem({ type, rarity }: { type: string; rarity: string }) {
  const marks: Record<string, React.ReactElement> = {
    experience: (
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.5" opacity=".4" />
        <polygon points="50,20 72,60 28,60" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="52" r="6" fill="currentColor" />
      </svg>
    ),
    project: (
      <svg viewBox="0 0 100 100" fill="none">
        <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1.5" opacity=".4" transform="rotate(45 50 50)" />
        <rect x="38" y="38" width="24" height="24" fill="currentColor" transform="rotate(45 50 50)" />
      </svg>
    ),
  };
  return (
    <div
      className={`${styles.emblem} card-emblem`}
      style={{ color: rarity === 'mythic' ? 'var(--accent)' : 'var(--ink-2)' }}
    >
      {marks[type] ?? marks.project}
    </div>
  );
}

function CardArt({ card }: { card: CardType }) {
  const seed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < card.id.length; i++) h = (h * 31 + card.id.charCodeAt(i)) >>> 0;
    return h;
  }, [card.id]);

  const angle = seed % 180;
  const dots = Array.from({ length: 5 }, (_, i) => {
    const s = (seed >> (i * 3)) & 0xff;
    return { x: 10 + (s % 80), y: 10 + ((s >> 3) % 80), r: 1 + (s % 3) };
  });

  return (
    <div className={styles.art}>
      <div className={`${styles.artBg} artBg`} />
      <div className={styles.artPattern} style={{ transform: `rotate(${angle}deg) scale(1.6)` }} />
      <svg
        viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}
      >
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="var(--accent)" />
        ))}
      </svg>
      <CardEmblem type={card.type} rarity={card.rarity} />
      <div className={styles.typeBadge}>
        {card.type === 'experience' ? 'Expérience' : 'Projet'}
      </div>
      <div className={styles.artLabel}>{card.scope ?? card.location}</div>
    </div>
  );
}

interface CardProps {
  card: CardType;
  flipped: boolean;
  onFlip: () => void;
  style?: React.CSSProperties;
}

export function Card({ card, flipped, onFlip, style }: CardProps) {
  const pipCount = Math.min(3, Math.max(1, Math.round((card.power || 1) / 3)));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFlip(); }
  };

  return (
    <div
      className={`${styles.wrapper}${flipped ? ' ' + styles.flipped : ''}`}
      data-rarity={card.rarity}
      data-card={card.id}
      data-cursor-card={card.title}
      onClick={onFlip}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label={`Carte ${card.title}. Cliquer pour retourner.`}
      style={style}
    >
      {/* Front */}
      <div className={styles.face}>
        <div className={styles.head}>
          <div className={styles.name}>{card.title}</div>
          <div className={`${styles.cost} card-cost`} aria-hidden>
            {Array.from({ length: pipCount }).map((_, i) => (
              <span key={i} className={`${styles.pip} ${styles.pipAccent}`} />
            ))}
          </div>
        </div>
        <CardArt card={card} />
        <div className={styles.body}>
          <div className={`${styles.typeline} card-typeline`}>
            {card.type === 'experience'
              ? `Expérience — ${card.subtitle}`
              : `Projet — ${card.subtitle}`}
          </div>
          <div className={styles.flavor}>{card.flavor}</div>
        </div>
        <div className={styles.foot}>
          <div className={styles.stat}>
            {card.power}
            <small>{card.type === 'experience' ? 'impact' : 'scope'}</small>
          </div>
          <div className={styles.period}>{card.period}</div>
          <div className={styles.stat} style={{ textAlign: 'right' }}>
            {card.toughness}
            <small>solidité</small>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className={`${styles.face} ${styles.back}`}>
        <div className={styles.backHead}>
          <h3>{card.title}</h3>
          <span>{card.period}</span>
        </div>
        <ul className={styles.backList}>
          {card.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
        <div className={styles.backStack}>
          {card.stack.map((s) => <span key={s} className={styles.chip}>{s}</span>)}
        </div>
        {card.url && (
          <a
            className={styles.backCta}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Voir le projet ↗
          </a>
        )}
      </div>
    </div>
  );
}
