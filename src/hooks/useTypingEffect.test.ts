import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypingEffect } from './useTypingEffect';

describe('useTypingEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // No reduced motion by default
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty text and isComplete=false', () => {
    const { result } = renderHook(() =>
      useTypingEffect({ text: 'Hello', startDelay: 0 })
    );
    expect(result.current.displayedText).toBe('');
    expect(result.current.isComplete).toBe(false);
  });

  it('types out the full text after start delay + all characters', async () => {
    const { result } = renderHook(() =>
      useTypingEffect({ text: 'Hi', speed: 50, startDelay: 100 })
    );

    expect(result.current.displayedText).toBe('');

    await act(async () => { await vi.advanceTimersByTimeAsync(100); }); // start delay
    await act(async () => { await vi.advanceTimersByTimeAsync(50); });  // first char
    expect(result.current.displayedText).toBe('H');

    await act(async () => { await vi.advanceTimersByTimeAsync(50); });  // second char
    expect(result.current.displayedText).toBe('Hi');
    expect(result.current.isComplete).toBe(true);
  });

  it('respects the speed option between characters', async () => {
    const { result } = renderHook(() =>
      useTypingEffect({ text: 'AB', speed: 200, startDelay: 0 })
    );

    await act(async () => { await vi.advanceTimersByTimeAsync(199); });
    expect(result.current.displayedText).toBe('');

    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(result.current.displayedText).toBe('A');
  });

  it('shows full text immediately when reduced motion is preferred', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: true, // prefers-reduced-motion
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });

    const { result } = renderHook(() =>
      useTypingEffect({ text: 'Hello world' })
    );

    expect(result.current.displayedText).toBe('Hello world');
    expect(result.current.isComplete).toBe(true);
  });

  it('marks isComplete only after the last character is typed', async () => {
    const { result } = renderHook(() =>
      useTypingEffect({ text: 'AB', speed: 50, startDelay: 0 })
    );

    await act(async () => { await vi.advanceTimersByTimeAsync(50); });
    expect(result.current.isComplete).toBe(false);

    await act(async () => { await vi.advanceTimersByTimeAsync(50); });
    expect(result.current.isComplete).toBe(true);
  });
});
