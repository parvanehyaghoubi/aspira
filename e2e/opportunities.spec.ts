import { test, expect } from "@playwright/test";

test.describe("Opportunities", () => {
    test("home page loads", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("h1, h2").first()).toBeVisible();
    });

    test("opportunities page loads", async ({ page }) => {
        await page.goto("/opportunities");
        await expect(page.locator("h1")).toBeVisible();
    });

    test("navigation works", async ({ page }) => {
        await page.goto("/");
        await page.click("text=Opportunities");
        await expect(page).toHaveURL("/opportunities");
    });
});
