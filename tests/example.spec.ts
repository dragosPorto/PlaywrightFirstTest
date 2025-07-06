import { test, expect } from '@playwright/test';

//Acces the test page before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.skip('get started link new', {tag: ['@smoke']}, async ({ page }) => {

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByRole('textbox', {name: 'password'}).fill('secret_sauce');

  await page.locator('xpath = /html/body/div/div/div[2]/div[1]/div/div/form/input').click();

  await page.waitForTimeout(1000);

  await expect(page.locator('.app_logo', { hasText: 'Swag Labs' })).toBeVisible();

  await page.waitForTimeout(5000);

});

test.skip('successul logout', async ({page}) =>{

  await page.locator('#user-name').fill('standard_user');

  await page.locator('[name = "password"]').fill('secret_sauce');

  await page.locator('[type = "submit"]').click();

  await page.locator('#react-burger-menu-btn').click();

  await page.locator('#logout_sidebar_link').click();

  await expect(page.locator('[type = "submit"]')).toBeVisible();

})

test.skip('access cart', async ({page}) =>{

  await page.locator('#user-name').fill('standard_user');

  await page.locator('[name = "password"]').fill('secret_sauce');

  await page.locator('[type = "submit"]').click();

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

})

//Adding the first item by name (not the most eficient as the item can be removed from the list)
test.skip('complete checkout',async ({page})=>{
  
    await page.locator('#user-name').fill('standard_user');
  
    await page.locator('[name = "password"]').fill('secret_sauce');
  
    await page.locator('[type = "submit"]').click();

    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    await page.locator('.shopping_cart_link').click();

    await page.locator('#checkout').click();

    await page.locator('[name = firstName]').fill('Dragos');

    await page.locator('[name = lastName]').fill('Test');

    await page.locator('[name = postalCode]').fill('1234');

    await page.locator('#continue').click();

    await page.locator('#finish').click();

    await expect(page.locator('.title', { hasText: 'Complete!' })).toBeVisible();

    await page.waitForTimeout(3000);

})

test.skip('complete checkout efficiently',async ({page})=>{
  
    await page.locator('#user-name').fill('standard_user');
  
    await page.locator('[name = "password"]').fill('secret_sauce');
  
    await page.locator('[type = "submit"]').click();

    //Grabbing all items
    const items = page.locator('.inventory_item');
    // Saving the number of items
    const number_of_items = await items.count();

    //Goimg through each item
    for (let i=0 ; i < number_of_items ; i++){
      const product = items.nth(i);
      //Navigating to the button for each item and then clicking on it
      const button = product.locator('.inventory_item_description .pricebar .btn.btn_primary.btn_small.btn_inventory')

      await button.click();

    }

    await page.locator('.shopping_cart_link').click();

    await page.locator('#checkout').click();

    await page.locator('[name = firstName]').fill('Dragos');

    await page.locator('[name = lastName]').fill('Test');

    await page.locator('[name = postalCode]').fill('1234');

    await page.locator('#continue').click();

    await page.locator('#finish').click();

    await expect(page.locator('.title', { hasText: 'Complete!' })).toBeVisible();

})

test('check that item is removed from cart',async ({page})=>{
  
  await page.locator('#user-name').fill('standard_user');

  await page.locator('[name = "password"]').fill('secret_sauce');

  await page.locator('[type = "submit"]').click();

  //Grabbing all items
  const items = page.locator('.inventory_item');
  const product = items.nth(0);

  const button = product.locator('.inventory_item_description .pricebar button');

  await button.click();


  await page.locator('.shopping_cart_link').click();

  expect(page.locator('.cart_item')).toBeVisible();

  await page.getByText('Remove').click();

  expect(page.locator('.cart_item')).not.toBeVisible();

})