import { test, expect } from "@playwright/test";

const pages = [
  { link: "Overview", heading: "Overview" },
  { link: "Users", heading: "Users" },
  { link: "Settings", heading: "Settings" },
  { link: "Reports", heading: "Reports" },
];

for (const { link, heading } of pages) {
  test(`sidebar link "${link}" navigates to page with heading "${heading}"`, async ({
    page,
  }) => {
    await page.goto("/overview");
    await page.getByRole("link", { name: link }).click();
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  });
}
