// tests/product-details.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { ProductDetailsPage } from '../pages/ProductDetailsPage.js';
import { users } from '../data/testData.js';

const { username: VALID_USER, password: VALID_PASS } = users.standard;

test.describe('@product details Sauce Demo - Product Details', () => {
  test('open first product, verify name/price, then go back', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const details = new ProductDetailsPage(page);

    // Login → Inventory
    await login.goto();
    await login.login(VALID_USER, VALID_PASS);
    await inventory.isLoaded();

    // Open the first product
    await inventory.productNames.first().click();

    // Detail page assertions
    await details.isLoaded();
    await expect(details.name).toBeVisible();
    const priceNum = await details.getPriceNumber();
    expect(Number.isFinite(priceNum)).toBe(true);
    expect(priceNum).toBeGreaterThan(0);
    await expect(details.addToCart).toBeVisible();
    await expect(details.backButton).toBeVisible();

    // Back to inventory
    await details.backButton.click();
    await inventory.isLoaded();
    await expect(page).toHaveURL(/\/inventory\.html/);
  });
});
