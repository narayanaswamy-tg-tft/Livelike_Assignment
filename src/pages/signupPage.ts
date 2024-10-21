import { Page, expect } from "@playwright/test";
import userData from "../utils/data.json";

const password = process.env.PASSWORD as string;

export class SignupPage {
  private signupHeader: string;
  private signupNameInput: string;
  private signupEmailInput: string;
  private signupButton: string;
  private accountInfoHeader: string;
  private passwordInput: string;
  private daysSelect: string;
  private monthSelect: string;
  private yearSelect: string;
  private accountCreatedHeader: string;
  private continueButton: string;
  private mrTitle: string;
  private mrsTitle: string;
  private nameInputLocator: string;
  private emailInputLocator: string;
  private firstNameInputLocator: string;
  private lastNameInputLocator: string;
  private companyInputLocator: string;
  private addressInputLocator: string;
  private countrySelectLocator: string;
  private stateInputLocator: string;
  private cityInputLocator: string;
  private zipcodeInputLocator: string;
  private mobileInputLocator: string;
  private newsLetterLocator: string;
  private specialOfferLocator: string;
  private createAccount: string;
  private signupErrorAlert: string;

  constructor(private page: Page) {
    this.signupHeader = 'h2:has-text("New User Signup!")';
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.accountInfoHeader = 'h2:has-text("Enter Account Information")';
    this.passwordInput = 'input[data-qa="password"]';
    this.daysSelect = 'select[data-qa="days"]';
    this.monthSelect = 'select[data-qa="months"]';
    this.yearSelect = 'select[data-qa="years"]';
    this.accountCreatedHeader = 'h2:has-text("Account Created!")';
    this.continueButton = 'a[data-qa="continue-button"]';
    this.signupErrorAlert = '//*[contains(text(),"Email Address already exist!")]';
    this.mrTitle = 'div[id="uniform-id_gender1"]';
    this.mrsTitle = 'div[id="uniform-id_gender2"]';
    this.nameInputLocator = 'input[data-qa="name"]';
    this.emailInputLocator = 'input[id="email"]';
    this.firstNameInputLocator = 'input[data-qa="first_name"]';
    this.lastNameInputLocator = 'input[data-qa="last_name"]';
    this.companyInputLocator = 'input[data-qa="company"]';
    this.addressInputLocator = 'input[data-qa="address"]';
    this.countrySelectLocator = 'select[data-qa="country"]';
    this.stateInputLocator = 'input[data-qa="state"]';
    this.cityInputLocator = 'input[data-qa="city"]';
    this.zipcodeInputLocator = 'input[data-qa="zipcode"]';
    this.mobileInputLocator = 'input[data-qa="mobile_number"]';
    this.newsLetterLocator = "input#newsletter";
    this.specialOfferLocator = "input#optin";
    this.createAccount = 'button[data-qa="create-account"]';
  }

  async verifySignupPageVisible() {
    await expect(this.page.locator(this.signupHeader)).toBeVisible();
  }

  async signup(name: string, email: string) {
    try {
      await this.page.fill(this.signupNameInput, name);
      await this.page.fill(this.signupEmailInput, email);
      await this.page.click(this.signupButton);
    } catch (error) {
      console.error(`Error during signup with name: ${name}, email: ${email}`, error);
      throw error;
    }
  }

  async verifyAccountCreationPageVisible() {
    try {
      await expect(this.page.locator(this.accountInfoHeader)).toBeVisible();
    } catch (error) {
      console.error("Error verifying account creation page visibility: ", error);
      throw error;
    }
  }

  async fillAccountDetails() {
    try {
      const user = userData.user;
      if (user.title === "Mr") {
        await this.page.check(this.mrTitle);
      } else {
        await this.page.check(this.mrsTitle);
      }
      await this.page.fill(this.nameInputLocator, user.name);
      await expect(this.page.locator(this.emailInputLocator)).toBeDisabled();
      await this.page.fill(this.passwordInput, password);
      await this.page.selectOption(this.daysSelect, user.date);
      await this.page.selectOption(this.monthSelect, user.month);
      await this.page.selectOption(this.yearSelect, user.year);
      await this.page.check(this.newsLetterLocator);
      await this.page.check(this.specialOfferLocator);
      await this.page.fill(this.firstNameInputLocator, user.firstName);
      await this.page.fill(this.lastNameInputLocator, user.lastName);
      await this.page.fill(this.companyInputLocator, user.company);
      await this.page.fill(this.addressInputLocator, user.address);
      await this.page.selectOption(this.countrySelectLocator, user.country);
      await this.page.fill(this.stateInputLocator, user.state);
      await this.page.fill(this.cityInputLocator, user.city);
      await this.page.fill(this.zipcodeInputLocator, user.zipcode);
      await this.page.fill(this.mobileInputLocator, user.mobileNumber);
      await this.page.click(this.createAccount);
    } catch (error) {
      console.error("Error while filling account details: ", error);
      throw error;
    }
  }

  async verifyAccountCreated() {
    try {
      await expect(this.page.locator(this.accountCreatedHeader)).toBeVisible();
      await this.page.click(this.continueButton);
    } catch (error) {
      console.error("Error verifying account creation: ", error);
      throw error;
    }
  }

  async verifyAccountExistsError() {
    try {
      await expect(this.page.locator(this.signupErrorAlert)).toBeVisible();
    } catch (error) {
      console.error("Error verifying account exists error message: ", error);
      throw error;
    }
  }
}
