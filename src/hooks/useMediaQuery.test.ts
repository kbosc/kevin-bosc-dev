import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  let changeListener: ((e: MediaQueryListEvent) => void) | null = null;

  beforeEach(() => {
    changeListener = null;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(min-width: 1024px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
          changeListener = cb;
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('returns true when the query matches on initial render', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    expect(result.current).toBe(true);
  });

  it('returns false when the query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 400px)'));
    expect(result.current).toBe(false);
  });

  it('updates when the media query match state changes', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    expect(result.current).toBe(true);

    act(() => {
      changeListener?.({ matches: false } as MediaQueryListEvent);
    });

    expect(result.current).toBe(false);
  });

  it('registers and cleans up the change listener', () => {
    const removeEventListener = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener,
        dispatchEvent: vi.fn(),
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
