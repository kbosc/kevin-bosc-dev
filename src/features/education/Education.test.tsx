import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Education } from './Education';

describe('Education', () => {
  it('renders the section title', () => {
    render(<Education />);

    expect(
      screen.getByRole('heading', { name: /formation/i }),
    ).toBeInTheDocument();
  });

  it('renders Le Wagon and OpenClassrooms', () => {
    render(<Education />);

    expect(screen.getByText('Le Wagon')).toBeInTheDocument();
    expect(screen.getByText('OpenClassrooms')).toBeInTheDocument();
  });

  it('renders each education item as an article', () => {
    render(<Education />);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
  });
});

