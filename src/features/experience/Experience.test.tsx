import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders the section title', () => {
    render(<Experience />);

    expect(
      screen.getByRole('heading', { name: /expériences professionnelles/i }),
    ).toBeInTheDocument();
  });

  it('renders SNCF Connect & Tech as the first experience', () => {
    render(<Experience />);

    expect(screen.getByText('SNCF Connect & Tech')).toBeInTheDocument();
  });

  it('renders all companies', () => {
    render(<Experience />);

    expect(screen.getByText('SNCF Connect & Tech')).toBeInTheDocument();
    expect(screen.getByText('Roodeo')).toBeInTheDocument();
    expect(screen.getByText('DeveryWare')).toBeInTheDocument();
    expect(screen.getByText('MBS')).toBeInTheDocument();
  });

  it('expands SNCF highlights when "Voir plus" is clicked', async () => {
    const user = userEvent.setup();
    render(<Experience />);

    // SNCF has more than 3 highlights, so "Voir plus" should appear
    const expandButtons = screen.getAllByRole('button', { name: /voir plus/i });
    expect(expandButtons.length).toBeGreaterThan(0);

    await user.click(expandButtons[0]);

    // After expand, button should say "Voir moins"
    expect(screen.getAllByRole('button', { name: /voir moins/i }).length).toBeGreaterThan(0);
  });
});

