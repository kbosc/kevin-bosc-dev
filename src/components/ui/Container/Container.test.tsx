import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p>Hello world</p>
      </Container>,
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies an additional className when provided', () => {
    const { container } = render(
      <Container className="custom-class">
        <p>Content</p>
      </Container>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });
});

