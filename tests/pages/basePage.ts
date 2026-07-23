import type { Page } from '@playwright/test';
import { getCookie } from '../helper/context-utils';
import { currencyMapper } from '../helper/mapper';

export class BasePage {
  protected path = '/';

  constructor(protected page: Page) {}

  async openPage() {
    await this.page.goto(this.path);
  }

  public async reloadPage() {
    await this.page.reload();
  }

  public async getUserCurrency(): Promise<string> {
    const currency = await getCookie(this.page.context(), 'currency_code');
    return currencyMapper(currency);
  }
}
