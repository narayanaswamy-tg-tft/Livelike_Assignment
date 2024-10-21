import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
  page: Page;
  productLinkLocator: Locator;
  allProductsHeadingLocator: Locator;
  searchInputLocator: Locator;
  searchButtonLocator: Locator;
  productBoxLocator: Locator;
  addToCartButtonLocator: Locator;
  viewCartLinkLocator: Locator;
  cartInfoLocator: Locator;
  allProductSearch: Locator;
  cartItemsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLinkLocator = page.locator('a[href="/products"]');
    this.allProductsHeadingLocator = page.locator('h2:has-text("All Products")');
    this.searchInputLocator = page.locator('input[id="search_product"]');
    this.searchButtonLocator = page.locator('button[id="submit_search"]');
    this.productBoxLocator = page.locator('//div[@class="single-products"]');
    this.addToCartButtonLocator = page.locator(".add-to-cart");
    this.viewCartLinkLocator = page.locator('div[class="modal-content"] a[href="/view_cart"]');
    this.cartInfoLocator = page.locator(".cart_info");
    this.allProductSearch = page.locator(".productinfo.text-center p");
    this.cartItemsLocator = page.locator(".cart_description h4 a");
  }

  async navigateToProducts() {
    await this.productLinkLocator.click();
  }

  async searchProduct(productName: string) {
    await this.searchInputLocator.fill(productName);
    await this.searchButtonLocator.click();
  }

  async verifySearchedProductsVisible(productName: string) {
    const products = await this.allProductSearch.allTextContents();
    const lowerCaseProducts = products.map((product) => product.toLowerCase());
    expect(lowerCaseProducts).toEqual(expect.arrayContaining(lowerCaseProducts.filter((product) => product.includes(productName.toLowerCase()))));
  }

  async addThirdLastProductToCart(productIndexValue: number) {
    const productCount = await this.productBoxLocator.count();
    const productCountValue = productCount - productIndexValue;
    const productLocator = this.productBoxLocator.nth(productCountValue);
    await productLocator.scrollIntoViewIfNeeded();
    const addToCartButtons = productLocator.locator(this.addToCartButtonLocator);
    await addToCartButtons.nth(0).click();
  }

  async verifyProductInCart(productName: string) {
    await this.viewCartLinkLocator.click();
    await expect(this.cartInfoLocator).toBeVisible();
    const cartProducts = await this.cartItemsLocator.allTextContents();
    const lowerCaseCartProducts = cartProducts.map((product) => product.trim().toLowerCase());
    const containsSubstring = lowerCaseCartProducts.some((product) => product.includes(productName.toLowerCase()));
    expect(containsSubstring).toBe(true);
  }
}
