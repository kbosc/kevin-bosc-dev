import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders the section title', () => {
    render(<Skills />);

    expect(
      screen.getByRole('heading', { name: /compétences/i }),
    ).toBeInTheDocument();
  });

  it('renders skill category headings', () => {
    render(<Skills />);

    expect(screen.getByText('Langages & Web')).toBeInTheDocument();
    expect(screen.getByText('Frameworks & Librairies')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('renders individual skill tags', () => {
    render(<Skills />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Cypress')).toBeInTheDocument();
  });
});

