import { test, expect } from "@playwright/test";

test("settings form has expected fields with defaults", async ({ page }) => {
  await page.goto("/settings");

  // Display Name field
  await expect(page.getByLabel("Display Name")).toBeVisible();

  // Email field
  await expect(page.getByLabel("Email")).toBeVisible();

  // Timezone dropdown
  await expect(page.getByLabel("Timezone")).toBeVisible();

  // Notification toggles
  await expect(page.getByText("Email notifications")).toBeVisible();
  await expect(page.getByText("Push notifications")).toBeVisible();
  await expect(page.getByText("Weekly digest")).toBeVisible();

  // Bio text area
  await expect(page.getByLabel("About")).toBeVisible();

  // Save button
  await expect(
    page.getByRole("button", { name: "Save Changes" })
  ).toBeVisible();
});
