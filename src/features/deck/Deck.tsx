import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { cards } from '@/data/cards';
import type { Card as CardType } from '@/types';
import styles from './Deck.module.scss';

const FILTERS = [
  { key: 'all', label: 'Toutes' },
  { key: 'experience', label: 'Expériences' },
  { key: 'project', label: 'Projets' },
] as const;

type FilterKey = (typeof FILTERS)[number]['key'];

export function Deck() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [mobileIdx, setMobileIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);

  // Konami cascade flip
  useEffect(() => {
    const handler = () => {
      cards.forEach((c, i) => {
        setTimeout(() => {
          setFlipped((prev) => ({ ...prev, [c.id]: !prev[c.id] }));
        }, i * 100);
      });
    };
    window.addEventListener('konami-cascade', handler);
    return () => window.removeEventListener('konami-cascade', handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  const filtered: CardType[] =
    filter === 'all' ? cards : cards.filter((c) => c.type === filter);

  const toggleFlip = (id: string) =>
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  const onTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart.current == null) return;
    setDragX(e.touches[0].clientX - dragStart.current);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const isTap = Math.abs(dragX) < 10;
    if (Math.abs(dragX) > 80) {
      if (dragX < 0 && mobileIdx < filtered.length - 1) setMobileIdx((i) => i + 1);
      else if (dragX > 0 && mobileIdx > 0) setMobileIdx((i) => i - 1);
    } else if (isTap) {
      e.preventDefault(); // prevent ghost click that would double-flip
      toggleFlip(filtered[mobileIdx].id);
    }
    setDragX(0);
    dragStart.current = null;
    setIsDragging(false);
  };

  return (
    <section className={styles.section} id="deck">
      <div className="shell">
        <div className={`${styles.head} reveal`}>
          <div className={styles.kicker}>The Deck · 01</div>
          <h2 className={styles.title}>Mon deck, carte par <em>carte</em>.</h2>
          <p className={styles.desc}>
            Chaque expérience et projet est une carte. <strong>Clique pour la retourner</strong> et voir le détail du rôle, des responsabilités et de la stack.
          </p>
        </div>

        <div className={`${styles.controls} reveal`}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.filter}${filter === f.key ? ' ' + styles.filterActive : ''}`}
              onClick={() => { setFilter(f.key); setMobileIdx(0); setFlipped({}); }}
            >
              {f.label}{' '}
              <span className={styles.count}>
                {f.key === 'all' ? cards.length : cards.filter((c) => c.type === f.key).length}
              </span>
            </button>
          ))}
        </div>

        {isMobile ? (
          <>
            <div
              className={styles.mobileStack}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {filtered.map((c, i) => {
                const offset = i - mobileIdx;
                const absOffset = Math.abs(offset);
                if (absOffset > 2) return null;
                const style: React.CSSProperties = {
                  transform: `translateX(${offset * 20 + (offset === 0 ? dragX : 0)}px) translateY(${absOffset * 10}px) scale(${1 - absOffset * 0.05}) rotate(${offset === 0 ? dragX * 0.05 : offset * 2}deg)`,
                  zIndex: 10 - absOffset,
                  opacity: absOffset > 1 ? 0.5 : 1,
                  transition: isDragging ? 'none' : 'transform .4s var(--ease), opacity .4s var(--ease)',
                  position: 'absolute',
                  left: '10%',
                  right: '10%',
                  top: 10,
                  width: '80%',
                  touchAction: 'pan-y',
                };
                return (
                  <Card
                    key={c.id}
                    card={c}
                    flipped={!!flipped[c.id]}
                    onFlip={() => toggleFlip(c.id)}
                    style={style}
                  />
                );
              })}
            </div>
            <p className={styles.swipeHint}>
              ← swipe → · {mobileIdx + 1} / {filtered.length}
            </p>
          </>
        ) : (
          <div className={styles.grid}>
            {filtered.map((c) => (
              <Card
                key={c.id}
                card={c}
                flipped={!!flipped[c.id]}
                onFlip={() => toggleFlip(c.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
