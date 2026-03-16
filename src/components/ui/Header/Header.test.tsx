import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  );
}

describe('Header', () => {
  it('renders the logo', () => {
    renderHeader();

    expect(screen.getByText('KB')).toBeInTheDocument();
  });

  it('renders the navigation with correct links', () => {
    renderHeader();

    const nav = screen.getByRole('navigation', {
      name: /navigation principale/i,
    });
    expect(nav).toBeInTheDocument();

    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Expériences')).toBeInTheDocument();
    expect(screen.getByText('Compétences')).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    renderHeader();

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });
});

