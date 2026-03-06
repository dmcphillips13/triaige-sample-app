import { test, expect } from "@playwright/test";

test("overview page", async ({ page }) => {
  await page.goto("/overview", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("overview.png");
});
