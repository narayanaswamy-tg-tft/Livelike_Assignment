import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import userData from "../../utils/data.json";

const password = process.env.PASSWORD as string;

test.describe("Login Functionality", () => {
  let loginPage: LoginPage;
  let user: {
    invalidEmail: string;
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
    await loginPage.navigateToLoginPage();
  });

  test("Login with correct email and password", async ({}) => {
    await loginPage.login(user.emailExisting, "1");
    await loginPage.verifyLoginSuccess();
  });

  test("Login with incorrect email and password", async ({}) => {
    await loginPage.login(user.invalidEmail, password);
    await loginPage.verifyLoginFailure();
  });
});
