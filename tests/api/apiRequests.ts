import { type BrowserContext } from '@playwright/test';
import { CART_CLEAR_ENDPOINT, LOGIN_ENDPOINT } from '../data/endpoints';
export class ApiRequests {
  async login(context: BrowserContext, token: string, user: Record<string, string>, login: string = 'Login') {
    const response = await context.request.post(LOGIN_ENDPOINT, {
      form: {
        token,
        ...user,
        login,
      },
    });

    return response;
  }

  async clearCart(context: BrowserContext, token: string, key: string, action: string = 'Remove') {
    await context.request.post(CART_CLEAR_ENDPOINT, {
      form: {
        token,
        key,
        remove_cart_item: action,
      },
    });
  }
}
