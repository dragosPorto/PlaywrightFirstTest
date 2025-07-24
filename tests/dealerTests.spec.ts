import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "https://www.mini.de/de_DE/home/mini-centres/mini-dealer-locator.html"
  );
});

let textEntered;

test("Zoom in/out at dealer", async ({ page }) => {
  const textEntered = "Hamburg";

  //
  await page.locator(".button-text", { hasText: "Alle akzeptieren" }).click();
  await page.evaluate(() => {
    const el = document.querySelector(
      "#downshift-\\:r0\\:-input"
    ) as HTMLElement;
    el?.click();
  });

  await page
    .locator("#downshift-\\:r0\\:-input")
    .type("Hamburg", { delay: 100 });

  // Type the city name in the input
  //   await page.evaluate(() => {
  //     const input = document.querySelector(
  //       "#downshift-\\:r0\\:-input"
  //     ) as HTMLInputElement;
  //     if (input) input.value = "Hamburg";
  //   });

  // Click the first autocomplete suggestion
  await page.evaluate(() => {
    const el = document.querySelector(
      "#downshift-\\:r0\\:-item-0"
    ) as HTMLElement;
    el?.click();
  });

  // Wait for dealer results to load (optional but helpful)
  await page.waitForTimeout(2000);

  // Locate the dealer entries (li elements inside the ul)
  let dealerItems = page.locator("#dealerLocator ul > li > div");

  //   // Count them
  let initialCount = await dealerItems.count();

  console.log("Number of dealers found:", initialCount);

  const element = page.locator("[title='Vergrößern']");
  const box = await element.boundingBox();

  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down(); // press and hold
    await page.waitForTimeout(2000);
  }

  let finalCount = await dealerItems.count();

  console.log("Number of dealers found:", finalCount);

  expect(initialCount).not.toBe(finalCount);

  // Count the dealer entries (li elements inside the ul)
  // const count = await page.evaluate(() => {
  //   const elements = document.querySelectorAll("#dealerLocator ul > li > div");
  //   return elements.length;
  // });

  // console.log("Number of dealers found:", count);
});
