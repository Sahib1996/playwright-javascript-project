// pages/ProductDetailsPage.js
export class ProductDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.name = page.locator('.inventory_details_name');
    this.price = page.locator('.inventory_details_price');
    this.addToCart = page.locator('[data-test^="add-to-cart"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async isLoaded() {
    await this.name.waitFor({ state: 'visible' });
  }

  async getPriceNumber() {
    const text = await this.price.textContent(); // e.g., "$29.99"
    return parseFloat((text ?? '').replace('$', '').trim());
  }
}
