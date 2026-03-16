import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrainScene } from './TrainScene';

// Mock Three.js canvas — jsdom does not support WebGL
vi.mock('./TrainSceneCanvas', () => ({
  default: () => (
    <div data-testid="train-canvas">Canvas mock</div>
  ),
}));

// Mock hooks
const mockUseReducedMotion = vi.fn();

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe('TrainScene', () => {
  it('renders the 3D canvas when visible and motion allowed', () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<TrainScene isVisible={true} />);

    const container = screen.getByRole('img', { name: /animation 3d.*train/i });
    expect(container).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    mockUseReducedMotion.mockReturnValue(false);

    const { container } = render(<TrainScene isVisible={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('does not render when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { container } = render(<TrainScene isVisible={true} />);
    expect(container.innerHTML).toBe('');
  });

  it('has an accessible aria-label', () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<TrainScene isVisible={true} />);

    const container = screen.getByRole('img');
    expect(container).toHaveAttribute(
      'aria-label',
      "Animation 3D d'un train SNCF traversant l'écran",
    );
  });
});


