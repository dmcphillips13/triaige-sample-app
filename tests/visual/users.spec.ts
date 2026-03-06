import { test, expect } from "@playwright/test";

test("users page", async ({ page }) => {
  await page.goto("/users", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("users.png");
});
