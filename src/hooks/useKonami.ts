import { useEffect } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function triggerKonami() {
  const flash = document.createElement('div');
  flash.className = 'konami-flash';
  const msg = document.createElement('div');
  msg.className = 'konami-msg';
  msg.textContent = '✦ +5/+5 until end of turn ✦';
  document.body.appendChild(flash);
  document.body.appendChild(msg);
  setTimeout(() => { flash.remove(); msg.remove(); }, 2500);
  // Dispatch event so Deck component can cascade-flip via React state
  window.dispatchEvent(new CustomEvent('konami-cascade'));
}

export function useKonami() {
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf.push(e.key);
      if (buf.length > KONAMI.length) buf.shift();
      if (KONAMI.every((k, i) => (buf[i] || '').toLowerCase() === k.toLowerCase())) {
        triggerKonami();
        buf = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
