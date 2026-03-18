import { test, expect } from "@playwright/test";

test("overview page has 4 KPI cards with values and trends", async ({
  page,
}) => {
  await page.goto("/overview");

  const cards = [
    { title: "Total Users", value: "12,847", trend: "+12.5%" },
    { title: "Revenue", value: "$48,352", trend: "+8.2%" },
    { title: "Active Sessions", value: "1,429", trend: "-3.1%" },
    { title: "Error Rate", value: "0.12%", trend: "-0.03%" },
  ];

  for (const card of cards) {
    await expect(page.getByText(card.title)).toBeVisible();
    await expect(page.getByText(card.value)).toBeVisible();
    await expect(page.getByText(card.trend)).toBeVisible();
  }
});
