import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './tests/data/urls';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  // forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 30_000,
  reporter: [['line'], ['allure-playwright']],
  use: {
    baseURL: BASE_URL,
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ducksProject Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
