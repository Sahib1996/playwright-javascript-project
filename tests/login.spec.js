// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { users } from '../data/testData.js';

const { username: VALID_USER, password: VALID_PASS } = users.standard;

test.describe('@login Sauce Demo - Login Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('submit without entering anything', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    await page.waitForTimeout(5000);
  });

  test('submit with username only', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_USER, '');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    await page.waitForTimeout(5000);
  });

  test('submit with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_USER, 'wrongpass');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await page.waitForTimeout(5000);
  });

  test('successful submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/\/inventory\.html/);
    await inventoryPage.isLoaded();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await page.waitForTimeout(5000);
  });
});
