import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders as a button by default', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders as a link when as="link"', () => {
    render(
      <Button as="link" href="mailto:test@test.com">
        Contact
      </Button>,
    );

    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toHaveAttribute('href', 'mailto:test@test.com');
  });

  it('applies the primary variant by default', () => {
    const { container } = render(<Button>Primary</Button>);
    const button = container.firstChild as HTMLElement;

    expect(button.className).toContain('primary');
  });

  it('applies the secondary variant when specified', () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    const button = container.firstChild as HTMLElement;

    expect(button.className).toContain('secondary');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('appends additional className when provided', () => {
    const { container } = render(
      <Button className="extra">Styled</Button>,
    );
    const button = container.firstChild as HTMLElement;

    expect(button.className).toContain('extra');
  });
});

