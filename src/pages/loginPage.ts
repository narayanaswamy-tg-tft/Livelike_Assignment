import { Page, expect } from "@playwright/test";

export class LoginPage {
  private loginOrSignupButton: string;
  private emailPlaceholder: string;
  private passwordPlaceholder: string;
  private loginButton: string;
  private loginToAccount: string;
  private logout: string;
  private loginErrorMessage: string;

  constructor(private page: Page) {
    (this.loginOrSignupButton = ' //a[contains(text(),"Signup / Login")]'),
      (this.emailPlaceholder = 'input[data-qa="login-email"]');
    this.passwordPlaceholder = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.loginToAccount = 'h2:has-text("Login to your account")';
    this.logout = 'a[href="/logout"]';
    this.loginErrorMessage = '//*[contains(text(),"Your email or password is incorrect!")]';
  }

  async navigateToLoginPage() {
    await this.page.goto("https://automationexercise.com/");
    const errorMessageLocator = this.page.locator('h2:has-text("This website is under heavy load")');
    if (await errorMessageLocator.isVisible()) {
      console.log("Page is under heavy load. Refreshing...");
      await this.page.reload();
    }
    await this.page.waitForSelector(this.loginOrSignupButton);
    await this.page.click(this.loginOrSignupButton);
    await expect(this.page.locator(this.loginToAccount)).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailPlaceholder, email);
    await this.page.fill(this.passwordPlaceholder, password);
    await this.page.click(this.loginButton);
  }

  async verifyLoginSuccess() {
    await expect(this.page.locator(this.logout)).toBeVisible();
  }

  async verifyLoginFailure() {
    await expect(this.page.locator(this.loginErrorMessage)).toBeVisible();
  }
}
