import { BasePage } from './basePage.js';

export class ProductPage extends BasePage {
  private productTitle = this.page.locator('#box-product .title');
  private quantityField = this.page.locator('.quantity input[name="quantity"]');
  private addToCartButton = this.page.locator('.quantity button[name="add_cart_product"]');
  private cartLink = this.page.locator('#cart .link');
  private productPrice = this.page.locator('#box-product .price');
  private productSalePrice = this.page.locator('#box-product .campaign-price');
  private sizeSelect = this.page.locator('[name="options[Size]"]');
  private stickerSale = this.page.locator('#box-product .sticker.sale');

  public async getProductTitle(): Promise<string> {
    return this.productTitle.innerText();
  }
  public async increaseProductQuantity(quantity: string) {
    await this.quantityField.fill(quantity);
  }

  async getProductQuantity(): Promise<string> {
    return this.quantityField.inputValue();
  }

  public async addToCart() {
    await this.addToCartButton.click();
  }

  public async getProductPrice(sale: boolean): Promise<string> {
    return sale ? await this.productSalePrice.innerText() : await this.productPrice.innerText();
  }

  public async openCartPage() {
    await this.cartLink.click();
  }

  public async selectProductSizeIfNeeded(option: string) {
    if (await this.onSale()) await this.sizeSelect.selectOption(option);
  }

  public async selectedSizeText(): Promise<string> {
    return this.sizeSelect.locator('option:checked').innerText();
  }

  public async onSale(): Promise<boolean> {
    return this.stickerSale.isVisible();
  }
}
