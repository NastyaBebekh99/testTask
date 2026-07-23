import type { Page, Response } from '@playwright/test';

export const waitForResponse = (page: Page, path: string): Promise<Response> =>
  page.waitForResponse(response => response.url().endsWith(path));
