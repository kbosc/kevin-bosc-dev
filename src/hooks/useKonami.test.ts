import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useKonami } from './useKonami';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

function pressKeys(keys: string[]) {
  keys.forEach((key) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  });
}

describe('useKonami', () => {
  afterEach(() => {
    document.querySelectorAll('.konami-flash, .konami-msg').forEach((el) => el.remove());
  });

  it('does not trigger on random keys', () => {
    renderHook(() => useKonami());
    pressKeys(['a', 'b', 'c']);

    expect(document.querySelector('.konami-flash')).toBeNull();
    expect(document.querySelector('.konami-msg')).toBeNull();
  });

  it('does not trigger on partial sequence', () => {
    renderHook(() => useKonami());
    pressKeys(KONAMI_SEQUENCE.slice(0, 5));

    expect(document.querySelector('.konami-flash')).toBeNull();
  });

  it('triggers on the correct full sequence', () => {
    renderHook(() => useKonami());
    pressKeys(KONAMI_SEQUENCE);

    expect(document.querySelector('.konami-flash')).toBeInTheDocument();
    expect(document.querySelector('.konami-msg')).toBeInTheDocument();
  });

  it('dispatches konami-cascade custom event', () => {
    const handler = vi.fn();
    window.addEventListener('konami-cascade', handler);
    renderHook(() => useKonami());

    pressKeys(KONAMI_SEQUENCE);

    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener('konami-cascade', handler);
  });

  it('cleans up keydown listener on unmount', () => {
    const { unmount } = renderHook(() => useKonami());
    unmount();

    pressKeys(KONAMI_SEQUENCE);

    expect(document.querySelector('.konami-flash')).toBeNull();
  });
});
