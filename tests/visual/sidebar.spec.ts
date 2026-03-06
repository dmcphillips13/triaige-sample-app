import { test, expect } from "@playwright/test";

test("sidebar component", async ({ page }) => {
  await page.goto("/overview", { waitUntil: "networkidle" });
  const sidebar = page.locator('[data-testid="sidebar"]');
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toHaveScreenshot("sidebar.png");
});
