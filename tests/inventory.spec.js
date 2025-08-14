// tests/inventory.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { users } from '../data/testData.js';

const { username: VALID_USER, password: VALID_PASS } = users.standard;

test.describe('@inventory Sauce Demo - Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASS);
    await inventoryPage.isLoaded();
  });

  test('should have 6 products listed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.countProducts();
    expect(count).toBe(6);
  });

  test('each product has a name and a price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const names = await inventoryPage.getProductNames();
    const prices = await inventoryPage.getProductPrices();

    expect(names.length).toBeGreaterThan(0);
    expect(names.length).toBe(prices.length);

    for (const n of names) expect(n.trim().length).toBeGreaterThan(0);
    for (const p of prices) {
      expect(Number.isFinite(p)).toBe(true);
      expect(p).toBeGreaterThan(0);
    }
  });
});
