// pages/InventoryPage.js
export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');

    // Menu & logout
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');

    // Products
    this.products = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');

    // Cart-related
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.removeButtons   = page.locator('[data-test^="remove"]');
    this.cartBadge       = page.locator('.shopping_cart_badge');
    this.cartLink        = page.locator('.shopping_cart_link'); // click to open cart
  }

  async isLoaded() { await this.inventoryContainer.waitFor({ state: 'visible' }); }
  async logout() { await this.menuButton.click(); await this.logoutLink.click(); }

  async countProducts() { return await this.products.count(); }
  async getProductNames() { return await this.productNames.allTextContents(); }
  async getProductPrices() {
    const texts = await this.productPrices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '').trim()));
  }

  async addFirstNItems(n) {
    const total = await this.addToCartButtons.count();
    const toAdd = Math.min(n, total);
    for (let i = 0; i < toAdd; i++) {
      await this.addToCartButtons.first().click();
    }
  }

  async removeOneItem() {
    await this.removeButtons.first().click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
