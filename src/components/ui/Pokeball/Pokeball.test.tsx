import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Pokeball } from './Pokeball';

describe('Pokeball', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Pokeball />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies the default size of 36', () => {
    const { container } = render(<Pokeball />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '36');
    expect(svg).toHaveAttribute('height', '36');
  });

  it('accepts a custom size', () => {
    const { container } = render(<Pokeball size={48} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('is hidden from assistive technologies', () => {
    const { container } = render(<Pokeball />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});

