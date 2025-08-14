// tests/logout.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { users } from '../data/testData.js';

const { username: VALID_USER, password: VALID_PASS } = users.standard;

test.describe('@logout Sauce Demo - Logout', () => {
  test('user can logout from inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login first
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASS);
    await inventoryPage.isLoaded();

    // Logout
    await inventoryPage.logout();

    // Back on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
