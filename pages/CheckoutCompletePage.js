// pages/CheckoutCompletePage.js
export class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title'); // "Checkout: Complete!"
    this.thankYouHeader = page.locator('.complete-header'); // "Thank you for your order!"
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');
  }

  async isLoaded() {
    await this.thankYouHeader.waitFor({ state: 'visible' });
  }
}
