import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header onToggleTweaks={vi.fn()} />
    </ThemeProvider>,
  );
}

describe('Header', () => {
  it('renders the brand name', () => {
    renderHeader();
    expect(screen.getByText('kbosc')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHeader();
    expect(screen.getByText('Deck')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /changer le thème/i })).toBeInTheDocument();
  });

  it('renders the tweaks button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /ouvrir les tweaks/i })).toBeInTheDocument();
  });
});
