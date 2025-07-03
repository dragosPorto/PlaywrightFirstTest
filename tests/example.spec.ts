import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('get started link new', {tag: ['@smoke']}, async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByRole('textbox', {name: 'password'}).fill('secret_sauce');

  await page.locator('xpath = /html/body/div/div/div[2]/div[1]/div/div/form/input').click();

  await page.waitForTimeout(1000);

  await expect(page.locator('.app_logo', { hasText: 'Swag Labs' })).toBeVisible();

  await page.waitForTimeout(5000);

});
