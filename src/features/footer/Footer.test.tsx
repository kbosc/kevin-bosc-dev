import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

  it('disables the button during wobble animation', () => {
    render(<Footer />);

    const pokeball = screen.getByRole('button', { name: /easter egg/i });
    fireEvent.click(pokeball);

    // Button should be disabled during wobble
    expect(pokeball).toBeDisabled();
  });

  it('shows a message after the capture animation completes', () => {
    render(<Footer />);

    const pokeball = screen.getByRole('button', { name: /easter egg/i });
    fireEvent.click(pokeball);

    // No message yet — animation is playing
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    // Fast-forward past wobble (2400ms) + catch delay (600ms)
    act(() => {
      vi.advanceTimersByTime(3100);
    });

    // Message should now be visible
    const message = screen.getByRole('status');
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBeTruthy();
  });
});

