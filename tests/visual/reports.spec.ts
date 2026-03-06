import { test, expect } from "@playwright/test";

test("reports page", async ({ page }) => {
  await page.goto("/reports", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("reports.png");
});
