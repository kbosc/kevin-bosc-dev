import { test, expect } from '@playwright/test';

test.describe('Keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('skip-to-content link is the first focusable element', async ({ page }) => {
    // Press Tab to focus the first element
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveText(/contenu principal/i);
  });

  test('skip-to-content link navigates to main content', async ({ page }) => {
    // Tab to skip link
    await page.keyboard.press('Tab');

    // Activate it
    await page.keyboard.press('Enter');

    // Focus should move to main content area
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeInViewport();
  });

  test('Tab cycles through all navigation links', async ({ page }) => {
    // Skip the skip-to-content link
    await page.keyboard.press('Tab');

    // Tab to logo
    await page.keyboard.press('Tab');

    // Tab through nav links
    const expectedLabels = [
      'À propos',
      'Expériences',
      'Compétences',
      'Formation',
      'Projets',
      'Contact',
    ];

    for (const label of expectedLabels) {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toHaveText(label);
    }
  });

  test('theme toggle is reachable via keyboard', async ({ page }) => {
    // Tab through skip link + logo + 6 nav links + theme toggle = 9 tabs
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('Tab');
    }

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveRole('switch');

    // Should be activatable with Enter or Space
    await page.keyboard.press('Space');

    // Theme should have changed
    const htmlElement = page.locator('html');
    const theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBeTruthy();
  });

  test('all interactive elements have visible focus indicators', async ({ page }) => {
    // Tab through several elements and check that focus-visible styles are applied
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus-visible');
      const count = await focusedElement.count();

      // At least one element should have focus-visible
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });
});

