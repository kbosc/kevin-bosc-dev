import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SideQuests } from './SideQuests';
import { sideQuests } from '@/data/sideQuests';

describe('SideQuests', () => {
  it('renders the section heading', () => {
    render(<SideQuests />);
    expect(screen.getByRole('heading', { name: /les side quests/i })).toBeInTheDocument();
  });

  it('renders an article card for each side quest', () => {
    render(<SideQuests />);
    expect(screen.getAllByRole('article')).toHaveLength(sideQuests.length);
  });

  it('renders each side quest title', () => {
    render(<SideQuests />);
    sideQuests.forEach((quest) => {
      expect(screen.getByRole('heading', { name: quest.title })).toBeInTheDocument();
    });
  });

  it('renders kicker labels', () => {
    render(<SideQuests />);
    sideQuests.forEach((quest) => {
      expect(screen.getByText(quest.kicker)).toBeInTheDocument();
    });
  });

  it('renders stat labels and values', () => {
    render(<SideQuests />);
    sideQuests.forEach((quest) => {
      quest.stats.forEach((stat) => {
        expect(screen.getByText(stat.label)).toBeInTheDocument();
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });
  });
});
