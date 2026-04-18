import { useEffect, useRef } from 'react';

interface CustomCursorProps {
  enabled: boolean;
}

export function CustomCursor({ enabled }: CustomCursorProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }
    document.body.classList.add('has-custom-cursor');

    let rx = 0, ry = 0, dx = 0, dy = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      dx += (tx - dx) * 0.35;
      dy += (ty - dy) * 0.35;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const t = target.closest('[data-cursor-card]');
      const a = target.closest('a, button, [role="button"]');
      if (!ringRef.current) return;
      ringRef.current.classList.remove('is-hover', 'is-hover-card');
      if (labelRef.current) labelRef.current.textContent = '';
      if (t) {
        ringRef.current.classList.add('is-hover-card');
        if (labelRef.current) labelRef.current.textContent = 'Flip';
      } else if (a) {
        ringRef.current.classList.add('is-hover');
      }
    };
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
