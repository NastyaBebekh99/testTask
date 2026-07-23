import { expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class NavigationBar extends BasePage {
  private recentlyViewImgByName = (name: string) =>
    this.page.locator(`#box-recently-viewed-products a[href*="${name}"] img`);

  public async validateImage(name: string) {
    await expect(this.recentlyViewImgByName(name)).toHaveScreenshot(`${name}.png`);
  }
}
