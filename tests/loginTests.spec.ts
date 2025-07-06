import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test('missing username', async ({page}) =>{

await page.locator('[type = "submit"]').click();

await expect(page.locator('.error-message-container.error')).toBeVisible();

await expect(page.locator('.error-message-container.error')).toContainText('Username is required')


})
