// tests/cart.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { users } from '../data/testData.js';

const { username: VALID_USER, password: VALID_PASS } = users.standard;

test.describe('@cart Sauce Demo - Cart', () => {
  // ...your previous tests...

  test('cart page lists selected items (3 after removal) and shows header + checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login and add 4
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASS);
    await inventoryPage.isLoaded();
    await inventoryPage.addFirstNItems(4);
    expect(await inventoryPage.getCartCount()).toBe(4);

    // Remove 1 → expect 3
    await inventoryPage.removeOneItem();
    expect(await inventoryPage.getCartCount()).toBe(3);

    // Open cart
    await inventoryPage.openCart();
    await cartPage.isLoaded();

    // New assertions: header + checkout button
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeEnabled();

    // Existing checks: 3 items listed with names
    const count = await cartPage.countItems();
    expect(count).toBe(3);

    const names = await cartPage.getItemNames();
    expect(names.length).toBe(3);
    for (const n of names) expect(n.trim().length).toBeGreaterThan(0);
  });
});
