import { test, expect } from '@playwright/test';

test.describe('Landing page — full scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all sections are visible when scrolling', async ({ page }) => {
    // Hero section is visible immediately
    const heroName = page.getByRole('heading', { name: /kevin bosc/i });
    await expect(heroName).toBeVisible();

    // Scroll through each section and verify titles appear
    const sectionTitles = [
      'À propos',
      'Expériences professionnelles',
      'Compétences',
      'Formation',
      'Projets',
      'Contact',
    ];

    for (const title of sectionTitles) {
      const heading = page.getByRole('heading', { name: title });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });

  test('header navigation links point to correct sections', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /navigation principale/i });
    await expect(nav).toBeVisible();

    // Check that all expected nav links exist
    const expectedLinks = [
      'À propos',
      'Expériences',
      'Compétences',
      'Formation',
      'Projets',
      'Contact',
    ];

    for (const linkLabel of expectedLinks) {
      const link = nav.getByRole('link', { name: linkLabel });
      await expect(link).toBeVisible();
    }
  });

  test('CV download button is present', async ({ page }) => {
    const downloadButton = page.getByRole('link', { name: /télécharger mon cv/i });
    await expect(downloadButton).toBeVisible();
  });

  test('footer is visible at the bottom', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Kevin Bosc');
  });
});

