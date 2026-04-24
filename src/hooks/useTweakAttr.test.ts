import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { useTweakAttr } from './useTweakAttr';

describe('useTweakAttr', () => {
  afterEach(() => {
    document.body.removeAttribute('data-mtg');
    document.body.removeAttribute('data-density');
  });

  it('returns the current attribute value on mount', () => {
    document.body.setAttribute('data-mtg', 'on');
    const { result } = renderHook(() => useTweakAttr('data-mtg'));
    expect(result.current).toBe('on');
  });

  it('returns null when the attribute is not set', () => {
    const { result } = renderHook(() => useTweakAttr('data-mtg'));
    expect(result.current).toBeNull();
  });

  it('reacts to attribute changes via MutationObserver', async () => {
    const { result } = renderHook(() => useTweakAttr('data-mtg'));
    expect(result.current).toBeNull();

    await act(async () => {
      document.body.setAttribute('data-mtg', 'off');
    });

    expect(result.current).toBe('off');
  });

  it('reflects attribute removal', async () => {
    document.body.setAttribute('data-mtg', 'on');
    const { result } = renderHook(() => useTweakAttr('data-mtg'));
    expect(result.current).toBe('on');

    await act(async () => {
      document.body.removeAttribute('data-mtg');
    });

    expect(result.current).toBeNull();
  });

  it('tracks different attributes independently', async () => {
    document.body.setAttribute('data-mtg', 'on');
    document.body.setAttribute('data-density', 'compact');

    const { result: mtgResult } = renderHook(() => useTweakAttr('data-mtg'));
    const { result: densityResult } = renderHook(() => useTweakAttr('data-density'));

    expect(mtgResult.current).toBe('on');
    expect(densityResult.current).toBe('compact');

    await act(async () => {
      document.body.setAttribute('data-mtg', 'off');
    });

    expect(mtgResult.current).toBe('off');
    expect(densityResult.current).toBe('compact');
  });
});
