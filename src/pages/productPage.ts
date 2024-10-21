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
    try {
      await this.page.fill(this.searchInputLocator, productName);
      await this.page.click(this.searchButtonLocator);
    } catch (error) {
      console.error(`Error searching for product "${productName}": `, error);
      throw error;
    }
  }

  async verifySearchedProductsVisible(productName: string) {
    try {
      const products = await this.page.locator(`//div[@class="productinfo text-center"]//p[contains(text(),"${productName}")]`).allTextContents();
      for (const product of products) {
        expect(product.toLowerCase()).toContain(productName.toLowerCase());
      }
    } catch (error) {
      console.error(`Error verifying searched products for "${productName}": `, error);
      throw error;
    }
  }

  async addThirdLastProductToCart() {
    try {
      const productCount = await this.page.locator(this.productBoxLocator).count();
      const thirdLastProductIndex = productCount - 3;
      const firstProductLocator = this.page.locator(`(${this.productBoxLocator})[${thirdLastProductIndex + 1}]`);
      await firstProductLocator.scrollIntoViewIfNeeded();
      const addToCartButtons = firstProductLocator.locator(this.addToCartButtonLocator);
      await addToCartButtons.nth(0).click();
    } catch (error) {
      console.error("Error adding the third last product to cart: ", error);
      throw error;
    }
  }

  async verifyProductInCart() {
    try {
      await this.page.click(this.viewCartLinkLocator);
      await expect(this.page.locator(this.cartInfoLocator)).toBeVisible();
    } catch (error) {
      console.error("Error verifying product in cart: ", error);
      throw error;
    }
  }
}
