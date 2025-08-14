// pages/CheckoutStepOnePage.js
export class CheckoutStepOnePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title'); // "Checkout: Your Information"

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
  }

  async isLoaded() {
    await this.firstName.waitFor({ state: 'visible' });
  }

  async fillInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }
}
