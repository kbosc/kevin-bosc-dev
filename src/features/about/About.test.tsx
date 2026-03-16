import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('renders the section title', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: /à propos/i }),
    ).toBeInTheDocument();
  });

  it('renders the about text', () => {
    render(<About />);

    expect(screen.getByText(/reconversion/i)).toBeInTheDocument();
  });

  it('renders all interest cards', () => {
    render(<About />);

    expect(screen.getByText('Magic: The Gathering')).toBeInTheDocument();
    expect(screen.getByText('Badminton')).toBeInTheDocument();
    expect(screen.getByText('Musculation')).toBeInTheDocument();
    expect(screen.getByText('Jeux de société')).toBeInTheDocument();
  });

  it('has aria-labelledby linking to the section title', () => {
    render(<About />);

    const section = screen.getByRole('heading', { name: /à propos/i })
      .closest('section');
    expect(section).toHaveAttribute('aria-labelledby', 'about-title');
  });
});

