import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the section title', () => {
    render(<Contact />);

    expect(
      screen.getByRole('heading', { name: /on en parle/i }),
    ).toBeInTheDocument();
  });

  it('renders an email link', () => {
    render(<Contact />);

    const emailLink = screen.getByRole('link', {
      name: /email/i,
    });
    expect(emailLink).toHaveAttribute('href', 'mailto:bosc.kev@gmail.com');
  });

  it('renders a phone link', () => {
    render(<Contact />);

    const phoneLink = screen.getByRole('link', {
      name: /téléphone/i,
    });
    expect(phoneLink).toHaveAttribute('href', 'tel:0686853237');
  });
});

