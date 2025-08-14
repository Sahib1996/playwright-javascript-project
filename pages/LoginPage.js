// pages/LoginPage.js
const BASE_URL = 'https://www.saucedemo.com/';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login-button');
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  }

  async login(username, password) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
