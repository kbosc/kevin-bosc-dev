import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './ThemeContext';

function ThemeConsumer() {
  const ctx = useContext(ThemeContext)!;
  return (
    <div>
      <span data-testid="theme">{ctx.theme}</span>
      <span data-testid="isDark">{String(ctx.isDark)}</span>
      <button onClick={ctx.toggleTheme}>toggle</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light when no preference is stored and system is light', () => {
    renderWithProvider();
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(screen.getByTestId('isDark').textContent).toBe('false');
  });

  it('reads theme from localStorage on mount', () => {
    localStorage.setItem('theme-preference', 'dark');
    renderWithProvider();
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('applies data-theme attribute to <html>', () => {
    renderWithProvider();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles from light to dark', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(screen.getByTestId('isDark').textContent).toBe('true');
  });

  it('toggles back to light after two clicks', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('persists the theme to localStorage on toggle', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(localStorage.getItem('theme-preference')).toBe('dark');
  });

  it('updates data-theme on <html> when toggled', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
