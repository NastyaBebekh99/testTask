import { CATALOG_PATH } from '../data/urls.js';
import { BasePage } from './basePage.js';

export class CatalogPage extends BasePage {
  protected path = CATALOG_PATH;

  private productNotOnSale = this.page.locator('.link[title*="Duck"]:not(:has(.sale))').first();
  private productNotOnSaleName = this.productNotOnSale.locator('.name');
  private productOnSale = this.page.locator('.link[title*="Duck"]:has(.sale)').first();
  private productOnSaleName = this.productOnSale.locator('.name');
  private productByName = (name: string) => this.page.locator('.link .name', { hasText: name });

  public async selectFirstProductNotOnSale() {
    await this.productNotOnSale.click();
  }

  public async getFirstProductNameNotOnSale(): Promise<string> {
    return this.productNotOnSaleName.innerText();
  }

  public async selectFirstProductOnSale() {
    await this.productOnSale.click();
  }

  public async getFirstProductNameOnSale(): Promise<string> {
    return this.productOnSaleName.innerText();
  }

  public async selectProductByName(productName: string) {
    await this.productByName(productName).click();
  }
}
