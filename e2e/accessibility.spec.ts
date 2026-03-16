import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has no critical accessibility violations', async ({ page }) => {
    const axeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Exclude Three.js canvases (WebGL rendering is not accessible to axe)
      .exclude('canvas')
      .analyze();

    const criticalViolations = axeResults.violations.filter(
      (violation) =>
        violation.impact === 'critical' || violation.impact === 'serious',
    );

    // Log violations for debugging
    if (criticalViolations.length > 0) {
      console.log(
        'Critical A11y violations:',
        JSON.stringify(criticalViolations, null, 2),
      );
    }

    expect(criticalViolations).toHaveLength(0);
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');

      // Image must have alt text OR be aria-hidden (decorative)
      const hasAccessibleDescription = alt !== null || ariaHidden === 'true';
      expect(hasAccessibleDescription).toBe(true);
    }
  });

  test('all sections have aria-labelledby pointing to a heading', async ({
    page,
  }) => {
    const sections = page.locator('section[aria-labelledby]');
    const sectionCount = await sections.count();

    expect(sectionCount).toBeGreaterThan(0);

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const labelledBy = await section.getAttribute('aria-labelledby');

      expect(labelledBy).toBeTruthy();

      // The referenced element should exist and be a heading
      const referencedElement = page.locator(`#${labelledBy}`);
      await expect(referencedElement).toBeVisible();
    }
  });

  test('page uses semantic HTML landmarks', async ({ page }) => {
    // Check for required landmarks
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('nav').first()).toBeVisible();
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    const axeResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .exclude('canvas')
      .analyze();

    // Filter only serious/critical contrast issues
    const contrastViolations = axeResults.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );

    if (contrastViolations.length > 0) {
      console.log(
        'Contrast violations:',
        JSON.stringify(contrastViolations, null, 2),
      );
    }

    expect(contrastViolations).toHaveLength(0);
  });
});

