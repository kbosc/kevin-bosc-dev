import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ParticleStars } from './ParticleStars';

// Mock Three.js canvas — jsdom does not support WebGL
vi.mock('./ParticleStarsCanvas', () => ({
  default: () => <div data-testid="particle-stars-canvas">Canvas mock</div>,
}));

// Mock theme and reduced motion hooks
const mockUseTheme = vi.fn();
const mockUseReducedMotion = vi.fn();

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => mockUseTheme(),
}));

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe('ParticleStars', () => {
  it('renders the starfield canvas in dark mode', () => {
    mockUseTheme.mockReturnValue({ isDark: true, theme: 'dark', toggleTheme: vi.fn() });
    mockUseReducedMotion.mockReturnValue(false);

    render(<ParticleStars />);

    const container = screen.getByRole('img', { name: /ciel étoilé/i });
    expect(container).toBeInTheDocument();
  });

  it('does not render in light mode', () => {
    mockUseTheme.mockReturnValue({ isDark: false, theme: 'light', toggleTheme: vi.fn() });
    mockUseReducedMotion.mockReturnValue(false);

    const { container } = render(<ParticleStars />);
    expect(container.innerHTML).toBe('');
  });

  it('does not render when reduced motion is preferred', () => {
    mockUseTheme.mockReturnValue({ isDark: true, theme: 'dark', toggleTheme: vi.fn() });
    mockUseReducedMotion.mockReturnValue(true);

    const { container } = render(<ParticleStars />);
    expect(container.innerHTML).toBe('');
  });

  it('has an accessible aria-label', () => {
    mockUseTheme.mockReturnValue({ isDark: true, theme: 'dark', toggleTheme: vi.fn() });
    mockUseReducedMotion.mockReturnValue(false);

    render(<ParticleStars />);

    const container = screen.getByRole('img');
    expect(container).toHaveAttribute('aria-label', 'Animation de fond : ciel étoilé');
  });
});

