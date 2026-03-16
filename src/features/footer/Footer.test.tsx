import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders copyright with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders the easter egg pokeball button', () => {
    render(<Footer />);

    const pokeball = screen.getByRole('button', {
      name: /easter egg/i,
    });
    expect(pokeball).toBeInTheDocument();
  });

  it('shows a message when pokeball is clicked', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const pokeball = screen.getByRole('button', { name: /easter egg/i });
    await user.click(pokeball);

    // A status message should appear after clicking
    const message = screen.getByRole('status');
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBeTruthy();
  });
});

