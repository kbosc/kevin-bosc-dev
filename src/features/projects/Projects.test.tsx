import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders the section title', () => {
    render(<Projects />);

    expect(
      screen.getByRole('heading', { name: /projets/i }),
    ).toBeInTheDocument();
  });

  it('renders the Catch Pokémon project', () => {
    render(<Projects />);

    expect(screen.getByText('Catch Pokémon')).toBeInTheDocument();
  });

  it('renders each project as an article', () => {
    render(<Projects />);

    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the tech stack as tags', () => {
    render(<Projects />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Axios')).toBeInTheDocument();
  });
});

