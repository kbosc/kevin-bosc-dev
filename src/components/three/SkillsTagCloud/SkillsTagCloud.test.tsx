import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillsTagCloud } from './SkillsTagCloud';

// Mock Three.js canvas — jsdom does not support WebGL
vi.mock('./SkillsTagCloudCanvas', () => ({
  default: ({ skillNames }: { skillNames: string[] }) => (
    <div data-testid="tag-cloud-canvas">
      {skillNames.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  ),
}));

// Mock reduced motion hook
const mockUseReducedMotion = vi.fn();

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light', isDark: false, toggleTheme: vi.fn() }),
}));

const SAMPLE_SKILLS = ['React', 'TypeScript', 'SASS'];

describe('SkillsTagCloud', () => {
  it('renders the 3D cloud when reduced motion is not preferred', () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<SkillsTagCloud skillNames={SAMPLE_SKILLS} />);

    const container = screen.getByRole('img', { name: /nuage de compétences/i });
    expect(container).toBeInTheDocument();
  });

  it('does not render when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { container } = render(<SkillsTagCloud skillNames={SAMPLE_SKILLS} />);
    expect(container.innerHTML).toBe('');
  });

  it('has an accessible aria-label', () => {
    mockUseReducedMotion.mockReturnValue(false);

    render(<SkillsTagCloud skillNames={SAMPLE_SKILLS} />);

    const container = screen.getByRole('img');
    expect(container).toHaveAttribute('aria-label', 'Nuage de compétences en 3D');
  });
});

