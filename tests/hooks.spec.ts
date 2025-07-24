import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {

    await page.goto("https://demoqa.com/upload-download")

})


test('should upload a file', async ({ page }) => {
  
    // Get absolute path of the file to upload
    const filePath = path.resolve(__dirname, '../test-data/testFile.png');
  
    // Set the file in the input
    const fileInput = page.locator('#uploadFile');
    await fileInput.setInputFiles(filePath);
  
    // Optional: assert something
    const filePathText =  page.locator('#uploadedFilePath')

    await expect(filePathText).toBeVisible()
    expect(await filePathText.textContent()).toBe("C:\\fakepath\\testFile.png");
});