import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

// Mock hooks
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}));

vi.mock('@/hooks/useTypingEffect', () => ({
  useTypingEffect: () => ({
    displayedText: 'Développeur Frontend React',
    isComplete: true,
  }),
}));

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light', isDark: false, toggleTheme: vi.fn() }),
}));

describe('Hero', () => {
  it('renders the hero section with an Introduction label', () => {
    render(<Hero />);

    const section = screen.getByRole('region', { name: /introduction/i });
    expect(section).toBeInTheDocument();
  });

  it('renders Kevin Bosc name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { name: /kevin bosc/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders a download CV link', () => {
    render(<Hero />);

    const downloadLink = screen.getByRole('link', { name: /télécharger mon cv/i });
    expect(downloadLink).toBeInTheDocument();
  });

  it('renders a contact link', () => {
    render(<Hero />);

    const contactLink = screen.getByRole('link', { name: /me contacter/i });
    expect(contactLink).toBeInTheDocument();
  });
});

