import { Locator, Page, expect } from "@playwright/test";
import { User } from "../utils/helper";

const password = process.env.PASSWORD as string;

export class SignupPage {
  page: Page;
  signupHeader: Locator;
  signupNameInput: Locator;
  signupEmailInput: Locator;
  signupButton: Locator;
  accountInfoHeader: Locator;
  passwordInput: Locator;
  daysSelect: Locator;
  monthSelect: Locator;
  yearSelect: Locator;
  accountCreatedHeader: Locator;
  continueButton: Locator;
  mrTitle: Locator;
  mrsTitle: Locator;
  nameInputLocator: Locator;
  emailInputLocator: Locator;
  firstNameInputLocator: Locator;
  lastNameInputLocator: Locator;
  companyInputLocator: Locator;
  addressInputLocator: Locator;
  countrySelectLocator: Locator;
  stateInputLocator: Locator;
  cityInputLocator: Locator;
  zipcodeInputLocator: Locator;
  mobileInputLocator: Locator;
  newsLetterLocator: Locator;
  specialOfferLocator: Locator;
  createAccount: Locator;
  signupErrorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupHeader = page.locator('h2:has-text("New User Signup!")');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.accountInfoHeader = page.locator('h2:has-text("Enter Account Information")');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daysSelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    this.accountCreatedHeader = page.locator('h2:has-text("Account Created!")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.signupErrorAlert = page.locator('//*[contains(text(),"Email Address already exist!")]');
    this.mrTitle = page.locator('div[id="uniform-id_gender1"]');
    this.mrsTitle = page.locator('div[id="uniform-id_gender2"]');
    this.nameInputLocator = page.locator('input[data-qa="name"]');
    this.emailInputLocator = page.locator('input[id="email"]');
    this.firstNameInputLocator = page.locator('input[data-qa="first_name"]');
    this.lastNameInputLocator = page.locator('input[data-qa="last_name"]');
    this.companyInputLocator = page.locator('input[data-qa="company"]');
    this.addressInputLocator = page.locator('input[data-qa="address"]');
    this.countrySelectLocator = page.locator('select[data-qa="country"]');
    this.stateInputLocator = page.locator('input[data-qa="state"]');
    this.cityInputLocator = page.locator('input[data-qa="city"]');
    this.zipcodeInputLocator = page.locator('input[data-qa="zipcode"]');
    this.mobileInputLocator = page.locator('input[data-qa="mobile_number"]');
    this.newsLetterLocator = page.locator("input#newsletter");
    this.specialOfferLocator = page.locator("input#optin");
    this.createAccount = page.locator('button[data-qa="create-account"]');
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountDetails(user: User) {
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
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
    await this.continueButton.click();
  }
}
