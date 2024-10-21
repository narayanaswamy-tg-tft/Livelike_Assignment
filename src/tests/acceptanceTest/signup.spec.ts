import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { SignupPage } from "../../pages/signupPage";
import { helper } from "../../utils/helper";
import userData from "../../../config/data.json";
import { User } from "../../utils/helper";

test.describe("Signup Functionality", () => {
  let loginPage: LoginPage;
  let signupPage: SignupPage;
  let timeStamp: string;
  let user: User;

  test.beforeEach(async ({ page }) => {
    user = userData.user;
    timeStamp = await helper.formatCurrentDateTimeCompact();
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    await loginPage.navigateToLoginPage();
    await expect(signupPage.signupHeader).toBeVisible();
  });

  test("Register new user", async ({}) => {
    await signupPage.signup(`NewUser_${timeStamp}`, `newuser_${timeStamp}@example.com`);
    await expect(signupPage.accountInfoHeader).toBeVisible();
    await signupPage.fillAccountDetails(user);
    await signupPage.verifyAccountCreated();
  });

  test("Register with existing email", async ({}) => {
    await signupPage.signup(user.name, user.emailExisting);
    await expect(signupPage.signupErrorAlert).toBeVisible();
  });
});
