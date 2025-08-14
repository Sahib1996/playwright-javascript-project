// tests/checkout.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';
import { users, customer } from '../data/testData.js';

const { username: VALID_USER, password: VALID_PASS } = users.standard;

test.describe('@checkout Sauce Demo - Checkout (basic)', () => {
  test('complete order shows thank you page and Back Home returns to inventory (cart cleared)', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const stepOne = new CheckoutStepOnePage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    // Login and add items
    await login.goto();
    await login.login(VALID_USER, VALID_PASS);
    await inventory.isLoaded();

    await inventory.addFirstNItems(4);
    expect(await inventory.getCartCount()).toBe(4);

    // Remove 1 → should have 3
    await inventory.removeOneItem();
    expect(await inventory.getCartCount()).toBe(3);

    // Cart → Checkout Step One
    await inventory.openCart();
    await cart.isLoaded();
    await cart.goToCheckout();

    await stepOne.isLoaded();
    await stepOne.fillInfo(customer.firstName, customer.lastName, customer.zip);
    await stepOne.continue();

    // Overview → Finish
    await overview.isLoaded();
    await overview.finishBtn.click();

    // Complete page assertions
    await complete.isLoaded();
    await expect(complete.thankYouHeader).toHaveText('Thank you for your order!');

    // Back Home → inventory page visible again
    await complete.backHomeBtn.click();
    await inventory.isLoaded();
    await expect(page).toHaveURL(/\/inventory\.html/);

    // Cart badge should be cleared
    const countAfter = await inventory.getCartCount();
    expect(countAfter).toBe(0);
    await expect(inventory.cartBadge).toHaveCount(0);
  });
});
