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
      screen.getByRole('navigation', { name: /navigation principale/i }),
    ).toBeInTheDocument();
  });

  it('renders all major sections', () => {
    render(<App />);

    expect(screen.getByText('Kevin Bosc')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /à propos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /expériences professionnelles/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /compétences/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /formation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /projets/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

