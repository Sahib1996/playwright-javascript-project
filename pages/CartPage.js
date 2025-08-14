// pages/CartPage.js
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');

    this.title = page.locator('.title');                 // "Your Cart"
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async isLoaded() {
    await this.cartList.waitFor({ state: 'visible' });
  }

  async countItems() {
    return await this.cartItems.count();
  }

  async getItemNames() {
    return await this.itemNames.allTextContents();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
