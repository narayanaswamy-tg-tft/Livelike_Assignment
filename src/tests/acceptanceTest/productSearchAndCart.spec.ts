import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { ProductPage } from "../../pages/productPage";
import userData from "../../../config/data.json";
import { User } from "../../utils/helper";

test.describe("Search and Cart Functionality", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let user: User;

  test.beforeEach(async ({ page }) => {
    user = userData.user;
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Search for a product", async ({}) => {
    await productPage.navigateToProducts();
    await expect(productPage.allProductsHeadingLocator).toBeVisible();
    await productPage.searchProduct(user.searchProduct);
    await productPage.verifySearchedProductsVisible(user.searchProduct);
  });

  test("Search product and verify cart after login", async ({}) => {
    await productPage.navigateToProducts();
    await expect(productPage.allProductsHeadingLocator).toBeVisible();
    await productPage.searchProduct(user.searchProduct);
    await productPage.verifySearchedProductsVisible(user.searchProduct);
    await productPage.addThirdLastProductToCart(user.productCartValue);
    await productPage.verifyProductInCart(user.searchProduct);
  });
});
