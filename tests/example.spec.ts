import { test, expect } from '@playwright/test';
//import { Console, count } from 'console';

//Acces the test page before each test
test.beforeEach(async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  //Login before each test
  await page.locator('#user-name').fill('standard_user');

  await page.locator('[name = "password"]').fill('secret_sauce');

  await page.locator('[type = "submit"]').click();

  await expect(page.locator('.app_logo', { hasText: 'Swag Labs' })).toBeVisible();
});

test('get started link new', { tag: ['@smoke'] }, async ({ page }) => {

  /*await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');

  await page.locator('xpath = /html/body/div/div/div[2]/div[1]/div/div/form/input').click();*/

});

test.skip('access cart', { tag: ['@regression'] }, async ({ page }) => {

  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

})

//Adding the first item by name (not the most eficient as the item can be removed from the list)
test.skip('complete checkout', async ({ page }) => {

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

//Grabbing all items in an array and then clicking on each child button
test.skip('complete checkout efficiently', async ({ page }) => {

  //Grabbing all items
  const items = page.locator('.inventory_item');
  // Saving the number of items
  const number_of_items = await items.count();

  //Goimg through each item
  for (let i = 0; i < number_of_items; i++) {
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

test.skip('check that item is removed from cart', async ({ page }) => {

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

test.skip('on item page, the item appears added as well', async ({ page }) => {

  //Grabbing all items
  const items = page.locator('.inventory_item');
  const item_links = page.locator('.inventory_item_name');
  // Saving the number of items
  const number_of_items = await items.count();

  //Goimg through each item
  for (let i = 0; i < number_of_items; i++) {
    const product = items.nth(i);
    //Navigating to the button for each item and then clicking on it
    const button = product.locator('.inventory_item_description .pricebar .btn.btn_primary.btn_small.btn_inventory')
    await button.click();

    await item_links.nth(i).click()

    await expect(page.locator('[data-test = remove]')).toBeVisible();

    page.goBack();
  }
})

test.skip('sort lowest to highest', async ({ page }) => {

  const all_prices: number[] = [];

  //Grabbing all the prices texts in an array
  let price_elements = page.locator('.inventory_item_price');
  const length = await price_elements.count();
  for (let i = 0; i < length; i++) {
    const price_element = price_elements.nth(i);
    const raw_price_string = await price_element.textContent();

    const clean_price_string = (raw_price_string ?? '').substring(1);
    const numericPrice = parseFloat(clean_price_string);

    all_prices.push(numericPrice)
  }
  // See which is the loweest price
  let lowest_price = all_prices[0]
  for (let i = 0; i < length; i++) {
    if (all_prices[i] < lowest_price) {
      lowest_price = all_prices[i]
    }
  }
  // See which is highest price
  let highest_price = all_prices[0]
  for (let i = 0; i < length; i++) {
    if (all_prices[i] > highest_price) {
      highest_price = all_prices[i]
    }
  }
  await page.locator('select').selectOption('lohi');

  price_elements = await page.locator('.inventory_item_price');
  const numeric_firstPrice = parseFloat((await price_elements.nth(0).textContent())?.substring(1) ?? '');
  const numeric_lastPrice = parseFloat((await price_elements.nth(length - 1).textContent())?.substring(1) ?? '');

  expect(lowest_price).toBe(numeric_firstPrice)
  expect(highest_price).toBe(numeric_lastPrice)

})

test('checkout with total price lower than 30$', async ({ page }) => {

  const all_prices: number[] = [];

  //Grabbing all the prices texts in an array
  let price_elements = page.locator('.inventory_item_price');
  const length = await price_elements.count();
  for (let i = 0; i < length; i++) {
    const price_element = price_elements.nth(i);
    const raw_price_string = await price_element.textContent();

    const clean_price_string = (raw_price_string ?? '').substring(1);
    const numericPrice = parseFloat(clean_price_string);

    all_prices.push(numericPrice)
  }

  const addCartButton = page.locator('.inventory_item .inventory_item_description .pricebar .btn.btn_primary.btn_small.btn_inventory')

  let formattedPricesList = all_prices.filter(price => price < 30);
  const formaterdLength = formattedPricesList.length
  console.log(formattedPricesList)


/*
  let sum

  for (let i = 0; i < formaterdLength; i++) {
    sum = formattedPricesList[i]
    if (sum < 30) {
      successArray = [i]
    }
      for (let j = 0; j < formaterdLength; j++) {
        
        if (sum + formattedPricesList[j]< 30 && i!=j) {
          sum = sum + formattedPricesList[j]
          successArray.push(j)
        }

      }
      console.log(successArray)
  }

 */

const targetPrice = 40
let successArray:number [] [] = []


// Loop through all possible combinations (except the empty one)
for (let mask = 1; mask < (1 << formaterdLength); mask++) {
  let sum = 0;
  let indexes: number[] = [];

  for (let i = 0; i < formaterdLength; i++) {
    if (mask & (1 << i)) {
      sum += formattedPricesList[i];
      indexes.push(i);
    }
  }

  if (sum < targetPrice) {
    successArray.push(indexes);
  }
}

console.log(`All valid index combinations under ${targetPrice}:`);
console.log(successArray);





})




// Take all elements from the array and compare them with all the elements that are next (exept itself)
/*for (let i=0; i<length;i++){
  let sum = all_prices[i] // sum gets the firs price
  let validPrices: number[] = [i];
  let counter = 1;

   for (let j=i+1; j<=length;j++){
      if (sum<30.00)
        console.log(sum)

        validPrices.push(j)
        sum = sum + all_prices[j]
        counter++

   }
   for (let k=0;k<counter;k++){
   const button = price_elements.nth(k).locator('.inventory_item_description .pricebar .btn.btn_primary.btn_small.btn_inventory')
   await button.click();
   }


}*/


