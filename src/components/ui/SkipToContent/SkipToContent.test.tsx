import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkipToContent } from './SkipToContent';

describe('SkipToContent', () => {
  it('renders a link pointing to #main-content', () => {
    render(<SkipToContent />);

    const link = screen.getByRole('link', {
      name: /aller au contenu principal/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });
});

