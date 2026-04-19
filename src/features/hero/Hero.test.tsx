import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('matches the snapshot', () => {
    const { baseElement } = render(<Hero />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the eyebrow text', () => {
    render(<Hero />);

    expect(screen.getByText(/disponible pour un nouveau projet/i)).toBeInTheDocument();
  });

  it('renders location and email info', () => {
    render(<Hero />);

    expect(screen.getByText(/paris, fr/i)).toBeInTheDocument();
    expect(screen.getByText(/bosc\.kev@gmail\.com/i)).toBeInTheDocument();
  });
});

