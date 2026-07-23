import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { ApiRequests } from '../api/apiRequests.js';
import { LoginForm } from '../pages/components/login.js';
import { errorLoginText } from '../data/messages.js';
import { errorColor } from '../data/colours.js';
import { LOGIN_PATH } from '../data/urls.js';
import { getCookie } from '../helper/context-utils.js';

export class LoginActions {
  constructor(
    protected page: Page,
    private apiRequests: ApiRequests,
    private loginForm: LoginForm,
  ) {}

  async login(context: BrowserContext, pageToken: string, user: Record<string, string>) {
    await test.step('Авторизация пользователя', async () => {
      const notAuthSession = await getCookie(context, 'LCSESSID');
      const response = await this.apiRequests.login(context, pageToken, user);
      expect(response.ok()).toBeTruthy();
      expect(await getCookie(context, 'LCSESSID')).not.toBe(notAuthSession);
    });
  }

  async loginWithIncorrectCredentials(login: string, pass: string) {
    await test.step('Авторизация с невалидными данными', async () => {
      await this.loginForm.login(login, pass);
      expect(this.page).toHaveURL(LOGIN_PATH);
    });
  }

  async checkErrorMessage() {
    await test.step('Проверка сообщения о невалидных данных', async () => {
      expect(await this.loginForm.getErrorMessage()).toBe(errorLoginText);
      await this.loginForm.checkMessageColor(errorColor);
    });
  }
}
