import { test, expect } from "@playwright/test";

const givenText = "MINI Gebrauchtwagen finden";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.mini.de/de_DE/home.html");
});

test("click on button based on text", async ({ page }) => {
  const targetText = page.locator("span.btn-title", {
    hasText: givenText,
  });

  let targetButton = targetText.locator("..");

  await targetButton.click();
});

let elementsArray;
test("click on button based on text (with array)", async ({ page }) => {
  const elements = page.locator(".md-home-quick-entry-list.list-items--4");
  const count = await elements.count();

  for (let i = 0; i < count; i++) {
    const text = await elements.nth(i).textContent();
    if (text?.trim() === givenText) {
      await elements.nth(i).click();
      await page.waitForTimeout(5000);
      await expect(page).toHaveURL(
        "https://www.mini.de/de_DE/home/change-vehiclematadsda"
      );
      break;
    }
  }
});

test("Click on the buttons1", { tag: ["@withHooks"] }, async ({ page }) => {
  var quickEntries = await page.locator(".md-home-quick-entry");
  var countEntries = await quickEntries.count();
  for (let i = 0; i < countEntries; i++) {
    const entry = quickEntries.nth(i);
    const title = await entry.locator(".btn-title").textContent();
    if (title === "MINI konfigurieren") {
      await entry.click();
      await page.waitForTimeout(3000);
      break;
    }
  }
});
