import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import userData from "../../../config/data.json";
import { User } from "../../utils/helper";

const password = process.env.PASSWORD as string;

test.describe("Login Functionality", () => {
  let loginPage: LoginPage;
  let user: User;

  test.beforeEach(async ({ page }) => {
    user = userData.user;
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Login with correct email and password", async ({}) => {
    await loginPage.login(user.emailExisting, password);
    await loginPage.verifyLoginSuccess();
  });

  test("Login with incorrect email and password", async ({}) => {
    await loginPage.login(user.invalidEmail, password);
    await loginPage.verifyLoginFailure();
  });
});
