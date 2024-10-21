import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { SignupPage } from "../../pages/signupPage";
import { helper } from "../../utils/helper";
import userData from "../../utils/data.json";

test.describe("Signup Functionality", () => {
  let loginPage: LoginPage;
  let signupPage: SignupPage;
  let timeStamp: string;
  let user: {
    name: string;
    emailExisting: string;
    title?: string;
    password?: string;
    date?: string;
    month?: string;
    year?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    mobileNumber?: string;
  };

  test.beforeEach(async ({ page }) => {
    user = userData.user;
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Register new user", async ({}) => {
    timeStamp = await helper.formatCurrentDateTimeCompact();
    await signupPage.verifySignupPageVisible();
    await signupPage.signup(`NewUser_${timeStamp}`, `newuser_${timeStamp}@example.com`);
    await signupPage.verifyAccountCreationPageVisible();
    await signupPage.fillAccountDetails();
    await signupPage.verifyAccountCreated();
  });

  test("Register with existing email", async ({}) => {
    await signupPage.verifySignupPageVisible();
    await signupPage.signup(user.name, user.emailExisting);
    await signupPage.verifyAccountExistsError();
  });
});
