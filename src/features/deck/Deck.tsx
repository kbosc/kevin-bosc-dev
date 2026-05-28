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
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  // Authoritative gesture data, read synchronously from event handlers
  // (state read in touchend can be stale in rapid touchmove→touchend sequences).
  const dragXRef = useRef(0);
  const dragYRef = useRef(0);
  const justHandledTap = useRef(false);

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
    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
    dragXRef.current = 0;
    dragYRef.current = 0;
    setIsDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current == null || dragStartY.current == null) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    const dy = e.touches[0].clientY - dragStartY.current;
    dragXRef.current = dx;
    dragYRef.current = dy;
    setDragX(dx);
  };
  const onTouchEnd = (_e: React.TouchEvent) => {
    const finalDx = dragXRef.current;
    const finalDy = dragYRef.current;
    if (Math.abs(finalDx) > 80) {
      if (finalDx < 0 && mobileIdx < filtered.length - 1) setMobileIdx((i) => i + 1);
      else if (finalDx > 0 && mobileIdx > 0) setMobileIdx((i) => i - 1);
    } else if (Math.abs(finalDx) < 30 && Math.abs(finalDy) < 30) {
      // Small horizontal & vertical travel → tap. Allows up to ~30px finger
      // jitter (real iOS taps rarely stay under 10px) without conflating with
      // vertical scrolls or partial swipes.
      justHandledTap.current = true;
      // On real iOS the ghost click never fires — reset the flag after the window
      setTimeout(() => { justHandledTap.current = false; }, 400);
      toggleFlip(filtered[mobileIdx].id);
    }
    setDragX(0);
    dragXRef.current = 0;
    dragYRef.current = 0;
    dragStartX.current = null;
    dragStartY.current = null;
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
                const isFlipped = !!flipped[c.id];
                // rotateY must be composed into the inline transform — inline
                // styles override the .flipped CSS class rule, so without this
                // the flip state updates but the card never visually rotates.
                const flipDeg = isFlipped ? 180 : 0;
                const style: React.CSSProperties = {
                  transform: `translateX(${offset * 20 + (offset === 0 ? dragX : 0)}px) translateY(${absOffset * 10}px) scale(${1 - absOffset * 0.05}) rotate(${offset === 0 ? dragX * 0.05 : offset * 2}deg) rotateY(${flipDeg}deg)`,
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
                    flipped={isFlipped}
                    onFlip={() => {
                      if (justHandledTap.current) { justHandledTap.current = false; return; }
                      toggleFlip(c.id);
                    }}
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
