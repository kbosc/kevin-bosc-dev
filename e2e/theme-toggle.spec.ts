import { test, expect } from '@playwright/test';

test.describe('Theme toggle — light/dark mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button switches theme from light to dark', async ({ page }) => {
    const toggle = page.getByRole('switch', { name: /passer au mode/i });
    await expect(toggle).toBeVisible();

    // Check initial state (light mode by default when no localStorage)
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('data-theme');

    // Click to toggle
    await toggle.click();

    // Theme attribute should have changed
    const newTheme = await htmlElement.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('theme preference persists in localStorage', async ({ page }) => {
    const toggle = page.getByRole('switch', { name: /passer au mode/i });

    // Switch to dark mode
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('data-theme');

    if (initialTheme === 'light') {
      await toggle.click();
      await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
    }

    // Verify localStorage was updated
    const storedTheme = await page.evaluate(() =>
      localStorage.getItem('theme-preference'),
    );
    expect(storedTheme).toBe('dark');

    // Reload page — theme should persist
    await page.reload();
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
  });

  test('toggle has correct aria-checked attribute', async ({ page }) => {
    const toggle = page.getByRole('switch', { name: /passer au mode/i });

    // Initial state
    const initialChecked = await toggle.getAttribute('aria-checked');

    // Click toggle
    await toggle.click();

    // aria-checked should have flipped
    const newChecked = await toggle.getAttribute('aria-checked');
    expect(newChecked).not.toBe(initialChecked);
  });

  test('double toggle returns to original theme', async ({ page }) => {
    const htmlElement = page.locator('html');
    const toggle = page.getByRole('switch', { name: /passer au mode/i });

    const originalTheme = await htmlElement.getAttribute('data-theme');

    // Toggle twice
    await toggle.click();
    await toggle.click();

    const finalTheme = await htmlElement.getAttribute('data-theme');
    expect(finalTheme).toBe(originalTheme);
  });
});

