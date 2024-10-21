import { Page, expect } from "@playwright/test";
import config from "../../config/config.json";

export class LoginPage {
  private loginOrSignupButton: string;
  private emailPlaceholder: string;
  private passwordPlaceholder: string;
  private loginButton: string;
  private loginToAccount: string;
  private logout: string;
  private loginErrorMessage: string;
  private websiteError: string;

  constructor(private page: Page) {
    (this.loginOrSignupButton = '//a[contains(text(),"Signup / Login")]'), (this.emailPlaceholder = 'input[data-qa="login-email"]');
    this.passwordPlaceholder = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.loginToAccount = 'h2:has-text("Login to your account")';
    this.logout = 'a[href="/logout"]';
    this.loginErrorMessage = '//*[contains(text(),"Your email or password is incorrect!")]';
    this.websiteError = 'h2:has-text("This website is under heavy load")';
  }

  async navigateToLoginPage() {
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
      await this.page.goto(config.baseURL);
      const errorMessageLocator = this.page.locator(this.websiteError);
      await this.page.waitForLoadState("domcontentloaded");
      if (await errorMessageLocator.isVisible()) {
        console.log("Page is under heavy load. Refreshing...");
        await this.page.reload();
        retries++;
        await this.page.waitForTimeout(2000);
      } else {
        await this.page.waitForSelector(this.loginOrSignupButton);
        await this.page.click(this.loginOrSignupButton);
        await expect(this.page.locator(this.loginToAccount)).toBeVisible();
        return;
      }
    }
    throw new Error("Max retries reached. The page could not be loaded.");
  }

  async login(email: string, password: string) {
    try {
      await this.page.fill(this.emailPlaceholder, email);
      await this.page.fill(this.passwordPlaceholder, password);
      await this.page.click(this.loginButton);
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  }

  async verifyLoginSuccess() {
    await expect(this.page.locator(this.logout)).toBeVisible();
  }

  async verifyLoginFailure() {
    await expect(this.page.locator(this.loginErrorMessage)).toBeVisible();
  }
}
