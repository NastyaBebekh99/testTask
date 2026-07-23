import { BasePage } from '../basePage';

export class Header extends BasePage {
  private cartItemsQuantity = this.page.locator('#cart span.quantity');
  private cartItemsPrice = this.page.locator('#cart span.formatted_value');

  public async getCartItemsQuantity(): Promise<string> {
    return this.cartItemsQuantity.innerText();
  }

  public async getCartItemsPrice(): Promise<string> {
    return this.cartItemsPrice.innerText();
  }
}
