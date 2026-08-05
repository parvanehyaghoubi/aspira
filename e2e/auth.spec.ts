import { test, expect } from "@playwright/test";

const email = `test-${Date.now()}@example.com`;

test.describe("Authentication", () => {
    test("user can sign up", async ({ page }) => {
        await page.goto("/signup");
        await page.fill('input[id="name"]', "Test User");
        await page.fill('input[id="email"]', email);
        await page.fill('input[id="password"]', "password123");
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL("/");
    });

    test("shows error with wrong password", async ({ page }) => {
        await page.goto("/login");
        await page.fill('input[id="email"]', "wrong@example.com");
        await page.fill('input[id="password"]', "wrongpassword");
        await page.click('button[type="submit"]');
        await expect(page.locator("text=Invalid email or password")).toBeVisible();
    });

    test("protected route redirects to login", async ({ page }) => {
        await page.goto("/dashboard");
        await expect(page).toHaveURL(/\/login/);
    });
});
