import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  it('renders a heading with the provided text', () => {
    render(<SectionTitle id="experience">Expériences</SectionTitle>);

    const heading = screen.getByRole('heading', { name: /expériences/i });
    expect(heading).toBeInTheDocument();
  });

  it('has the correct id attribute for aria-labelledby', () => {
    render(<SectionTitle id="skills">Compétences</SectionTitle>);

    const heading = screen.getByRole('heading', { name: /compétences/i });
    expect(heading).toHaveAttribute('id', 'skills');
  });
});

