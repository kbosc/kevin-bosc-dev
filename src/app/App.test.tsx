import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the main content area', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('renders the skip to content link', () => {
    render(<App />);

    const skipLink = screen.getByRole('link', {
      name: /aller au contenu principal/i,
    });
    expect(skipLink).toBeInTheDocument();
  });

  it('renders the header with navigation', () => {
    render(<App />);

    expect(
      screen.getByRole('navigation'),
    ).toBeInTheDocument();
  });

  it('renders all major sections', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /kbosc\.dev/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /l'histoire/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /parcours/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /stack/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /side quests/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /on en/i })).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

