// pages/CheckoutOverviewPage.js
export class CheckoutOverviewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title'); // "Checkout: Overview"
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async isLoaded() {
    await this.finishBtn.waitFor({ state: 'visible' });
  }

  async countItems() {
    return await this.items.count();
  }

  async getItemNames() {
    return await this.itemNames.allTextContents();
  }
}
