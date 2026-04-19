import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('renders the section title', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: /l'histoire/i }),
    ).toBeInTheDocument();
  });

  it('renders the about text', () => {
    render(<About />);

    expect(screen.getByText(/reconverti/i)).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<About />);

    expect(screen.getByText('Rôle')).toBeInTheDocument();
    expect(screen.getByText('Frontend React Engineer')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
  });
});

