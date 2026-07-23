import { test as base } from '@playwright/test';
import { LoginForm } from '../pages/components/login';
import { ApiRequests } from '../api/apiRequests';
import { CatalogPage } from '../pages/catalogPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { BasePage } from '../pages/basePage';
import { LoginActions } from '../actions/login';
import { SetupActions } from '../actions/setup';
import { UserActions } from '../actions/user';
import { Header } from '../pages/components/header';
import { NavigationBar } from '../pages/components/navigationBar';

type Fixtures = {
  openStartPage: void;
  actionOnFailure: void;

  loginActions: LoginActions;
  setupActions: SetupActions;
  userActions: UserActions;

  apiRequests: ApiRequests;

  header: Header;
  loginForm: LoginForm;
  basePage: BasePage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
  navigationBar: NavigationBar;
};

export const test = base.extend<Fixtures>({
  openStartPage: [
    async ({ page }, use) => {
      await page.goto('/');
      await use();
    },
    { auto: true },
  ],
  actionOnFailure: [
    async ({ page }, use, testInfo) => {
      await use();

      if (testInfo.status !== testInfo.expectedStatus) {
        await testInfo.attach('Failure Screenshot', {
          body: await page.screenshot(),
          contentType: 'image/png',
        });
        const video = page.video();

        if (video) {
          await testInfo.attach('Failure Video', {
            path: await video.path(),
            contentType: 'video/webm',
          });
        }
      }
    },
    { auto: true },
  ],

  apiRequests: async ({}, use) => {
    await use(new ApiRequests());
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  loginForm: async ({ page }, use) => {
    await use(new LoginForm(page));
  },
  navigationBar: async ({ page }, use) => {
    await use(new NavigationBar(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loginActions: async ({ page, apiRequests, loginForm }, use) => {
    await use(new LoginActions(page, apiRequests, loginForm));
  },

  setupActions: async ({ cartPage, apiRequests }, use) => {
    await use(new SetupActions(cartPage, apiRequests));
  },

  userActions: async ({ page, catalogPage, productPage, cartPage, header, navigationBar }, use) => {
    await use(new UserActions(page, catalogPage, productPage, cartPage, header, navigationBar));
  },
});
