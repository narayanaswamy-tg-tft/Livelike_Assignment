import { Locator, Page, expect } from "@playwright/test";
import config from "../../config/config.json";

export class LoginPage {
  private loginOrSignupButton: Locator;
  private emailPlaceholder: Locator;
  private passwordPlaceholder: Locator;
  private loginButton: Locator;
  private loginToAccount: Locator;
  private logout: Locator;
  private loginErrorMessage: Locator;
  private websiteError: Locator;

  constructor(private page: Page) {
    this.loginOrSignupButton = this.page.locator('//a[contains(text(),"Signup / Login")]');
    this.emailPlaceholder = this.page.locator('input[data-qa="login-email"]');
    this.passwordPlaceholder = this.page.locator('input[data-qa="login-password"]');
    this.loginButton = this.page.locator('button[data-qa="login-button"]');
    this.loginToAccount = this.page.locator('h2:has-text("Login to your account")');
    this.logout = this.page.locator('a[href="/logout"]');
    this.loginErrorMessage = this.page.locator('//*[contains(text(),"Your email or password is incorrect!")]');
    this.websiteError = this.page.locator('h2:has-text("This website is under heavy load")');
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

  async verifyLoginSuccess() {
    await expect(this.logout).toBeVisible();
  }

  async verifyLoginFailure() {
    await expect(this.loginErrorMessage).toBeVisible();
  }
}
