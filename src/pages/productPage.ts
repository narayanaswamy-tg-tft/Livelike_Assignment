import { Page, expect } from "@playwright/test";

export class ProductPage {
  private productLinkLocator: string;
  private allProductsHeadingLocator: string;
  private searchInputLocator: string;
  private searchButtonLocator: string;
  private productBoxLocator: string;
  private addToCartButtonLocator: string;
  private viewCartLinkLocator: string;
  private cartInfoLocator: string;

  constructor(private page: Page) {
    this.productLinkLocator = 'a[href="/products"]';
    this.allProductsHeadingLocator = 'h2:has-text("All Products")';
    this.searchInputLocator = 'input[id="search_product"]';
    this.searchButtonLocator = 'button[id="submit_search"]';
    this.productBoxLocator = '//div[@class="single-products"]';
    this.addToCartButtonLocator = ".add-to-cart";
    this.viewCartLinkLocator = 'div[class="modal-content"] a[href="/view_cart"]';
    this.cartInfoLocator = ".cart_info";
  }

  async navigateToProducts() {
    await this.page.click(this.productLinkLocator);
  }

  async verifyAllProductsPageVisible() {
    await expect(this.page.locator(this.allProductsHeadingLocator)).toBeVisible();
  }

  async searchProduct(productName: string) {
    await this.page.fill(this.searchInputLocator, productName);
    await this.page.click(this.searchButtonLocator);
  }

  async verifySearchedProductsVisible(productName: string) {
    const products = await this.page
      .locator(`//div[@class="productinfo text-center"]//p[contains(text(),"${productName}")]`)
      .allTextContents();
    for (const product of products) {
      expect(product.toLowerCase()).toContain(productName.toLowerCase());
    }
  }

  async addThirdLastProductToCart() {
    const productCount = await this.page.locator(this.productBoxLocator).count();
    const thirdLastProductIndex = productCount - 3;
    const firstProductLocator = this.page.locator(`(${this.productBoxLocator})[${thirdLastProductIndex + 1}]`);
    await firstProductLocator.scrollIntoViewIfNeeded();
    const addToCartButtons = firstProductLocator.locator(this.addToCartButtonLocator);
    await addToCartButtons.nth(0).click();
  }

  async verifyProductInCart() {
    await this.page.click(this.viewCartLinkLocator);
    await expect(this.page.locator(this.cartInfoLocator)).toBeVisible();
  }
}
