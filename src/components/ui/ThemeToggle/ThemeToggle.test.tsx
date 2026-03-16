import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';
import { ThemeContext } from '@/contexts/ThemeContext';
import type { ReactNode } from 'react';

// Helper to render ThemeToggle with a mocked ThemeContext
function renderWithTheme(
  isDark: boolean,
  toggleTheme = vi.fn(),
) {
  const contextValue = {
    theme: isDark ? 'dark' as const : 'light' as const,
    isDark,
    toggleTheme,
  };

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return render(<ThemeToggle />, { wrapper: Wrapper });
}

describe('ThemeToggle', () => {
  it('renders a switch button', () => {
    renderWithTheme(false);

    const button = screen.getByRole('switch');
    expect(button).toBeInTheDocument();
  });

  it('shows aria-checked=false in light mode', () => {
    renderWithTheme(false);

    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-checked', 'false');
  });

  it('shows aria-checked=true in dark mode', () => {
    renderWithTheme(true);

    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-checked', 'true');
  });

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup();
    const toggleTheme = vi.fn();

    renderWithTheme(false, toggleTheme);

    await user.click(screen.getByRole('switch'));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has an accessible label describing the action', () => {
    renderWithTheme(false);

    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-label', 'Passer au mode sombre');
  });
});

