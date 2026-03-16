import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders the label text', () => {
    render(<Tag label="React" />);

    expect(screen.getByText('React')).toBeInTheDocument();
  });
});

