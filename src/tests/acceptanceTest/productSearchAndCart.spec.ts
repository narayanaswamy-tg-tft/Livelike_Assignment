import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { ProductPage } from "../../pages/productPage";
import userData from "../../utils/data.json";

test.describe("Search and Cart Functionality", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let user: {
    searchProduct: string;
    title?: string;
    name?: string;
    emailExisting?: string;
    invalidEmail?: string;
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
    productPage = new ProductPage(page);
    await loginPage.navigateToLoginPage();
  });

  test("Search for a product", async ({}) => {
    await productPage.navigateToProducts();
    await productPage.verifyAllProductsPageVisible();
    await productPage.searchProduct(user.searchProduct);
    await productPage.verifySearchedProductsVisible(user.searchProduct);
  });

  test.only("Search product and verify cart after login", async ({}) => {
    await productPage.navigateToProducts();
    await productPage.verifyAllProductsPageVisible();
    await productPage.searchProduct(user.searchProduct);
    await productPage.verifySearchedProductsVisible(user.searchProduct);
    await productPage.addThirdLastProductToCart();
    await productPage.verifyProductInCart();
  });
});
