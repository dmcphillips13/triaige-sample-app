import { test, expect } from "@playwright/test";

test("header component", async ({ page }) => {
  await page.goto("/overview", { waitUntil: "networkidle" });
  const header = page.locator('[data-testid="header"]');
  await expect(header).toBeVisible();
  await expect(header).toHaveScreenshot("header.png");
});
