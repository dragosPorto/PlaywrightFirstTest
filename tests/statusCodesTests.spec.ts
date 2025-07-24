import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{

    await page.goto("https://demoqa.com/broken")
})

test("test status code of broken link", async ({page})=>{
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }), // returns Response | null
        page.getByText('Click Here for Broken Link').click(),
      ]);
      
      if (response) {
        console.log('Status code:', response.status());
        expect(response.status()).toBe(500);
      } else {
        throw new Error('Navigation did not return a response');
      }


})