import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';
import { timeline } from '@/data/timeline';

describe('Timeline', () => {
  it('renders the section heading', () => {
    render(<Timeline />);
    expect(screen.getByRole('heading', { name: /le parcours/i })).toBeInTheDocument();
  });

  it('renders all timeline items', () => {
    render(<Timeline />);

    timeline.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.year)).toBeInTheDocument();
    });
  });

  it('renders items in reverse chronological order', () => {
    render(<Timeline />);

    const years = screen.getAllByText(/^\d{4}$/).map((el) => el.textContent!);
    const sorted = [...years].sort((a, b) => Number(b) - Number(a));
    expect(years).toEqual(sorted);
  });

  it('marks work items with kind="work"', () => {
    render(<Timeline />);

    const workItems = document.querySelectorAll('[data-kind="work"]');
    const expectedWorkCount = timeline.filter((t) => t.kind === 'work').length;
    expect(workItems).toHaveLength(expectedWorkCount);
  });

  it('marks education items with kind="edu"', () => {
    render(<Timeline />);

    const eduItems = document.querySelectorAll('[data-kind="edu"]');
    const expectedEduCount = timeline.filter((t) => t.kind === 'edu').length;
    expect(eduItems).toHaveLength(expectedEduCount);
  });
});
