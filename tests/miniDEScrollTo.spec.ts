import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1980, height: 1080 });

  await page.goto("https://www.mini.de/de_DE/home/range/electric.html");
});

test("Hover over button", { tag: ["@withHooks"] }, async ({ page }) => {
  // Target button
  const buttonExterior = page.locator(".mds-hotspot").first();

  // Scroll manually in steps of 100px until the button becomes visible
  const scrollStep = 200;
  const maxScrolls = 50; // prevent infinite loop
  let scrolls = 0;

  while (!(await buttonExterior.isVisible()) && scrolls < maxScrolls) {
    await page.evaluate((step) => window.scrollBy(0, step), scrollStep);
    await page.waitForTimeout(200); // small wait to allow for lazy loading or rendering
    scrolls++;
  }

  if (!(await buttonExterior.isVisible())) {
    throw new Error("Button not found after scrolling");
  }

  // Hover over the button
  await buttonExterior.first().hover();

  // Expect tooltip/overlay to be visible
  const overlayExterior = page.locator(".hotspot--has-tooltip");
  await expect(overlayExterior).toBeVisible();
});
