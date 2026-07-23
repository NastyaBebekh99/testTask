import type { BrowserContext } from '@playwright/test';

export const getCookie = async (context: BrowserContext, cookieName: string): Promise<string> => {
  const cookies = await context.cookies();
  const cookie = cookies.find(cookie => cookie.name === cookieName);
  return cookie?.value ?? '';
};
