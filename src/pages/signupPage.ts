import { Locator, Page, expect } from "@playwright/test";
import { User } from "../utils/helper";

const password = process.env.PASSWORD as string;

export class SignupPage {
  private signupHeader: Locator;
  private signupNameInput: Locator;
  private signupEmailInput: Locator;
  private signupButton: Locator;
  private accountInfoHeader: Locator;
  private passwordInput: Locator;
  private daysSelect: Locator;
  private monthSelect: Locator;
  private yearSelect: Locator;
  private accountCreatedHeader: Locator;
  private continueButton: Locator;
  private mrTitle: Locator;
  private mrsTitle: Locator;
  private nameInputLocator: Locator;
  private emailInputLocator: Locator;
  private firstNameInputLocator: Locator;
  private lastNameInputLocator: Locator;
  private companyInputLocator: Locator;
  private addressInputLocator: Locator;
  private countrySelectLocator: Locator;
  private stateInputLocator: Locator;
  private cityInputLocator: Locator;
  private zipcodeInputLocator: Locator;
  private mobileInputLocator: Locator;
  private newsLetterLocator: Locator;
  private specialOfferLocator: Locator;
  private createAccount: Locator;
  private signupErrorAlert: Locator;

  constructor(private page: Page) {
    this.signupHeader = this.page.locator('h2:has-text("New User Signup!")');
    this.signupNameInput = this.page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = this.page.locator('input[data-qa="signup-email"]');
    this.signupButton = this.page.locator('button[data-qa="signup-button"]');
    this.accountInfoHeader = this.page.locator('h2:has-text("Enter Account Information")');
    this.passwordInput = this.page.locator('input[data-qa="password"]');
    this.daysSelect = this.page.locator('select[data-qa="days"]');
    this.monthSelect = this.page.locator('select[data-qa="months"]');
    this.yearSelect = this.page.locator('select[data-qa="years"]');
    this.accountCreatedHeader = this.page.locator('h2:has-text("Account Created!")');
    this.continueButton = this.page.locator('a[data-qa="continue-button"]');
    this.signupErrorAlert = this.page.locator('//*[contains(text(),"Email Address already exist!")]');
    this.mrTitle = this.page.locator('div[id="uniform-id_gender1"]');
    this.mrsTitle = this.page.locator('div[id="uniform-id_gender2"]');
    this.nameInputLocator = this.page.locator('input[data-qa="name"]');
    this.emailInputLocator = this.page.locator('input[id="email"]');
    this.firstNameInputLocator = this.page.locator('input[data-qa="first_name"]');
    this.lastNameInputLocator = this.page.locator('input[data-qa="last_name"]');
    this.companyInputLocator = this.page.locator('input[data-qa="company"]');
    this.addressInputLocator = this.page.locator('input[data-qa="address"]');
    this.countrySelectLocator = this.page.locator('select[data-qa="country"]');
    this.stateInputLocator = this.page.locator('input[data-qa="state"]');
    this.cityInputLocator = this.page.locator('input[data-qa="city"]');
    this.zipcodeInputLocator = this.page.locator('input[data-qa="zipcode"]');
    this.mobileInputLocator = this.page.locator('input[data-qa="mobile_number"]');
    this.newsLetterLocator = this.page.locator("input#newsletter");
    this.specialOfferLocator = this.page.locator("input#optin");
    this.createAccount = this.page.locator('button[data-qa="create-account"]');
  }

  async verifySignupPageVisible() {
    await expect(this.signupHeader).toBeVisible();
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyAccountCreationPageVisible() {
    await expect(this.accountInfoHeader).toBeVisible();
  }

  async fillAccountDetails(user: User) {
    try {
      if (user.title === "Mr") {
        await this.mrTitle.check();
      } else {
        await this.mrsTitle.check();
      }
      await this.nameInputLocator.fill(user.name);
      await expect(this.emailInputLocator).toBeDisabled();
      await this.passwordInput.fill(password);
      await this.daysSelect.selectOption(user.date);
      await this.monthSelect.selectOption(user.month);
      await this.yearSelect.selectOption(user.year);
      await this.newsLetterLocator.check();
      await this.specialOfferLocator.check();
      await this.firstNameInputLocator.fill(user.firstName);
      await this.lastNameInputLocator.fill(user.lastName);
      await this.companyInputLocator.fill(user.company);
      await this.addressInputLocator.fill(user.address);
      await this.countrySelectLocator.selectOption(user.country);
      await this.stateInputLocator.fill(user.state);
      await this.cityInputLocator.fill(user.city);
      await this.zipcodeInputLocator.fill(user.zipcode);
      await this.mobileInputLocator.fill(user.mobileNumber);
      await this.createAccount.click();
    } catch (error) {
      console.error("Error while filling account details: ", error);
      throw error;
    }
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
    await this.continueButton.click();
  }

  async verifyAccountExistsError() {
    await expect(this.signupErrorAlert).toBeVisible();
  }
}
