import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Deck } from './Deck';
import { cards } from '@/data/cards';

const experienceCount = cards.filter((c) => c.type === 'experience').length;
const projectCount = cards.filter((c) => c.type === 'project').length;

function setMobileMatchMedia(mobile: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: mobile && query === '(max-width: 700px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

describe('Deck', () => {
  afterEach(() => {
    setMobileMatchMedia(false);
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  it('renders the section heading', () => {
    render(<Deck />);
    expect(screen.getByRole('heading', { name: /mon deck/i })).toBeInTheDocument();
  });

  it('renders all three filter buttons', () => {
    render(<Deck />);
    expect(screen.getByRole('button', { name: /toutes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /expériences/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /projets/i })).toBeInTheDocument();
  });

  it('renders all cards by default', () => {
    render(<Deck />);
    expect(screen.getAllByRole('button', { name: /carte/i })).toHaveLength(cards.length);
  });

  // ── Filters ────────────────────────────────────────────────────────────────

  it('filters to experience cards only', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    await user.click(screen.getByRole('button', { name: /expériences/i }));

    expect(screen.getAllByRole('button', { name: /carte/i })).toHaveLength(experienceCount);
  });

  it('filters to project cards only', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    await user.click(screen.getByRole('button', { name: /projets/i }));

    expect(screen.getAllByRole('button', { name: /carte/i })).toHaveLength(projectCount);
  });

  it('resets to all cards when "Toutes" is clicked again', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    await user.click(screen.getByRole('button', { name: /projets/i }));
    await user.click(screen.getByRole('button', { name: /toutes/i }));

    expect(screen.getAllByRole('button', { name: /carte/i })).toHaveLength(cards.length);
  });

  // ── Desktop flip ───────────────────────────────────────────────────────────

  it('flips a card when clicked in desktop mode', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    const firstCard = screen.getAllByRole('button', { name: /carte/i })[0];
    expect(firstCard.className).not.toContain('flipped');

    await user.click(firstCard);

    expect(firstCard.className).toContain('flipped');
  });

  it('un-flips a card when clicked twice', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    const firstCard = screen.getAllByRole('button', { name: /carte/i })[0];
    await user.click(firstCard);
    await user.click(firstCard);

    expect(firstCard.className).not.toContain('flipped');
  });

  it('can flip multiple cards independently', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    const cardButtons = screen.getAllByRole('button', { name: /carte/i });
    await user.click(cardButtons[0]);
    await user.click(cardButtons[1]);

    expect(cardButtons[0].className).toContain('flipped');
    expect(cardButtons[1].className).toContain('flipped');
  });

  it('resets flipped state when switching filters', async () => {
    const user = userEvent.setup();
    render(<Deck />);

    const firstCard = screen.getAllByRole('button', { name: /carte/i })[0];
    await user.click(firstCard);
    expect(firstCard.className).toContain('flipped');

    await user.click(screen.getByRole('button', { name: /expériences/i }));

    const cardsAfterFilter = screen.getAllByRole('button', { name: /carte/i });
    cardsAfterFilter.forEach((card) => {
      expect(card.className).not.toContain('flipped');
    });
  });

  // ── Mobile view ────────────────────────────────────────────────────────────

  describe('mobile stack', () => {
    beforeEach(() => setMobileMatchMedia(true));

    it('shows the swipe hint', () => {
      render(<Deck />);
      expect(screen.getByText(/swipe/i)).toBeInTheDocument();
    });

    it('displays "1 / N" counter starting at card 1', () => {
      render(<Deck />);
      expect(screen.getByText(new RegExp(`1 / ${cards.length}`))).toBeInTheDocument();
    });

    it('flips the active card on tap (touchStart → touchEnd without movement)', () => {
      render(<Deck />);

      const activeCard = screen.getAllByRole('button', { name: /carte/i })[0];
      expect(activeCard.className).not.toContain('flipped');

      fireEvent.touchStart(activeCard, { touches: [{ clientX: 200, clientY: 0 }] });
      fireEvent.touchEnd(activeCard, { changedTouches: [{ clientX: 200, clientY: 0 }] });

      expect(activeCard.className).toContain('flipped');
    });

    it('does not flip when the gesture is a swipe (movement > 80px)', () => {
      render(<Deck />);

      const activeCard = screen.getAllByRole('button', { name: /carte/i })[0];

      fireEvent.touchStart(activeCard, { touches: [{ clientX: 100, clientY: 0 }] });
      fireEvent.touchMove(activeCard, { touches: [{ clientX: -10, clientY: 0 }] });
      fireEvent.touchEnd(activeCard, { changedTouches: [{ clientX: -10, clientY: 0 }] });

      expect(activeCard.className).not.toContain('flipped');
    });
  });

  // ── Konami cascade ─────────────────────────────────────────────────────────

  it('flips all cards on konami-cascade event', async () => {
    vi.useFakeTimers();
    render(<Deck />);

    window.dispatchEvent(new CustomEvent('konami-cascade'));
    await vi.runAllTimersAsync();

    const cardButtons = screen.getAllByRole('button', { name: /carte/i });
    cardButtons.forEach((card) => {
      expect(card.className).toContain('flipped');
    });

    vi.useRealTimers();
  });
});
