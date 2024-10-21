import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
  private productLinkLocator: Locator;
  private allProductsHeadingLocator: Locator;
  private searchInputLocator: Locator;
  private searchButtonLocator: Locator;
  private productBoxLocator: Locator;
  private addToCartButtonLocator: Locator;
  private viewCartLinkLocator: Locator;
  private cartInfoLocator: Locator;
  private allProductSearch: Locator;

  constructor(private page: Page) {
    this.productLinkLocator = this.page.locator('a[href="/products"]');
    this.allProductsHeadingLocator = this.page.locator('h2:has-text("All Products")');
    this.searchInputLocator = this.page.locator('input[id="search_product"]');
    this.searchButtonLocator = this.page.locator('button[id="submit_search"]');
    this.productBoxLocator = this.page.locator('//div[@class="single-products"]');
    this.addToCartButtonLocator = this.page.locator(".add-to-cart");
    this.viewCartLinkLocator = this.page.locator('div[class="modal-content"] a[href="/view_cart"]');
    this.cartInfoLocator = this.page.locator(".cart_info");
    this.allProductSearch = this.page.locator(".productinfo.text-center p");
  }

  async navigateToProducts() {
    await this.productLinkLocator.click();
  }

  async verifyAllProductsPageVisible() {
    await expect(this.allProductsHeadingLocator).toBeVisible();
  }

  async searchProduct(productName: string) {
    await this.searchInputLocator.fill(productName);
    await this.searchButtonLocator.click();
  }

  async verifySearchedProductsVisible(productName: string) {
    const products = await this.allProductSearch.allTextContents();
    for (const product of products) {
      expect(product.toLowerCase()).toContain(productName.toLowerCase());
    }
  }

  async addThirdLastProductToCart(productIndexValue: number) {
    try {
      const productCount = await this.productBoxLocator.count();
      const productCountValue = productCount - productIndexValue;
      const productLocator = this.productBoxLocator.nth(productCountValue);
      await productLocator.scrollIntoViewIfNeeded();
      const addToCartButtons = productLocator.locator(this.addToCartButtonLocator);
      await addToCartButtons.nth(0).click();
    } catch (error) {
      console.error(`Error adding the third last product to cart: `, error);
      throw error;
    }
  }

  async verifyProductInCart() {
    await this.viewCartLinkLocator.click();
    await expect(this.cartInfoLocator).toBeVisible();
  }
}
