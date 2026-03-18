import { test, expect } from "@playwright/test";

test("users table has correct column headers", async ({ page }) => {
  await page.goto("/users");

  const headers = ["Name", "Email", "Role", "Status", "Last Login"];
  for (const header of headers) {
    await expect(
      page.getByRole("columnheader", { name: header })
    ).toBeVisible();
  }
});

test("users table has 12 data rows", async ({ page }) => {
  await page.goto("/users");

  const rows = page.locator("table tbody tr");
  await expect(rows).toHaveCount(12);
});
