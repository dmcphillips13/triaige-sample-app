import { test, expect } from "@playwright/test";

test("settings page", async ({ page }) => {
  await page.goto("/settings", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("settings.png");
});
