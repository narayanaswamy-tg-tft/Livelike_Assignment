import { Locator, Page, expect } from "@playwright/test";
import config from "../../config/config.json";

export class LoginPage {
  page: Page;
  loginOrSignupButton: Locator;
  emailPlaceholder: Locator;
  passwordPlaceholder: Locator;
  loginButton: Locator;
  loginToAccount: Locator;
  logout: Locator;
  loginErrorMessage: Locator;
  websiteError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginOrSignupButton = page.locator('//a[contains(text(),"Signup / Login")]');
    this.emailPlaceholder = page.locator('input[data-qa="login-email"]');
    this.passwordPlaceholder = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginToAccount = page.locator('h2:has-text("Login to your account")');
    this.logout = page.locator('a[href="/logout"]');
    this.loginErrorMessage = page.locator('//*[contains(text(),"Your email or password is incorrect!")]');
    this.websiteError = page.locator('h2:has-text("This website is under heavy load")');
  }

  async navigateToLoginPage() {
    const maxRetries = 5;
    let retries = 0;
    // Retry loop due to application stability issues
    while (retries < maxRetries) {
      await this.page.goto(config.baseURL);
      await this.page.waitForLoadState("domcontentloaded");
      if (await this.websiteError.isVisible()) {
        console.log("Page is under heavy load. Refreshing...");
        await this.page.reload();
        retries++;
        await this.page.waitForTimeout(2000);
      } else {
        await this.loginOrSignupButton.click();
        await expect(this.loginToAccount).toBeVisible();
        return;
      }
    }
    throw new Error("Max retries reached. The page could not be loaded.");
  }

  async login(email: string, password: string) {
    await this.emailPlaceholder.fill(email);
    await this.passwordPlaceholder.fill(password);
    await this.loginButton.click();
  }
}
