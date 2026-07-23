import { expect } from '@playwright/test';
import { BasePage } from '../basePage.js';

export class LoginForm extends BasePage {
  private emailInput = this.page.locator('[name="email"]');
  private passwordInput = this.page.locator('[name="password"]');
  private loginButton = this.page.locator('[name="login"]');
  private tokenValue = this.page.locator('input[name="token"]');
  private errorMessage = this.page.locator('.notice.errors');

  public async getTokenValue(): Promise<string> {
    return this.tokenValue.inputValue();
  }

  public async login(login: string, pass: string) {
    await this.emailInput.fill(login);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  public async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  public async checkMessageColor(color: string) {
    await expect(this.errorMessage).toHaveCSS('background-color', color);
  }
}
