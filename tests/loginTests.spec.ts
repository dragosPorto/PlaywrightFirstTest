import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

test.skip('missing username', async ({ page }) => {

    await page.locator('[type = "submit"]').click();

    await expect(page.locator('.error-message-container.error')).toBeVisible();

    await expect(page.locator('.error-message-container.error')).toContainText('Username is required')

})

test.skip('successul logout', async ({ page }) => {

    await page.locator('#user-name').fill('standard_user');

    await page.locator('[name = "password"]').fill('secret_sauce');

    await page.locator('[type = "submit"]').click();

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#logout_sidebar_link').click();

    await expect(page.locator('[type = "submit"]')).toBeVisible();

})