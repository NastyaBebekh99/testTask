import { CART_PATH } from '../data/urls.js';
import { BasePage } from './basePage.js';

export class CartPage extends BasePage {
  protected path = CART_PATH;

  private productQuantity = (name: string) =>
    this.page.locator('.item', { hasText: name }).locator('xpath=/preceding-sibling::td');
  private productPriceByName = (name: string) =>
    this.page.locator('.item', { hasText: name }).locator('xpath=following-sibling::*[@class="sum"]');
  private totalPrice = this.page.locator('.footer td:last-child');
  private productKeys = this.page.locator('input[name="key"]');
  private confirmOrderButton = this.page.locator('.confirm [name="confirm_order"]');
  private pageTitle = this.page.locator('.title');
  private productPrice = this.page.locator('td.sum');
  private customerDetailsInputs = this.page.locator('.billing-address input:not([type="hidden"])');

  public async getProductKeys(): Promise<string[]> {
    return this.productKeys.evaluateAll(elements => elements.map(el => (el as HTMLInputElement).value));
  }

  public async getProductQuantity(productName: string): Promise<string> {
    return this.productQuantity(productName).innerText();
  }

  public async getProductPrice(productName: string): Promise<string> {
    return this.productPriceByName(productName).innerText();
  }

  public async getTotalPrice(): Promise<string> {
    return this.totalPrice.innerText();
  }

  public async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  public async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  public async getProductsPrices(): Promise<string[]> {
    return this.productPrice.allInnerTexts();
  }

  public async getUserDetailsValues(): Promise<string[]> {
    return this.customerDetailsInputs.allInnerTexts();
  }
}
