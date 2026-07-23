import { test, type BrowserContext, type Page } from '@playwright/test';
import { CartPage } from '../pages/cartPage.js';
import { ApiRequests } from '../api/apiRequests.js';

export class SetupActions {
  constructor(
    private cartPage: CartPage,
    private apiRequests: ApiRequests,
  ) {}

  async clearCart(context: BrowserContext, pageToken: string) {
    await test.step('Удаление товаров из корзины', async () => {
      await this.cartPage.openPage();
      const productKeys = await this.cartPage.getProductKeys();
      if (productKeys.length) {
        productKeys.forEach(async key => {
          await this.apiRequests.clearCart(context, pageToken, key);
        });
      }
    });
  }
}
