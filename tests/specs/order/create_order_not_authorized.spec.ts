import { createProduct, productsForOrderNames } from '../../data/order';
import { test } from '../../fixtures/fixture';
import { Product } from '../../types/product';

test.describe('Создание заказа не авторизованным пользователем', () => {
  //   test.beforeEach(async ({ setupActions, basePage, loginPage, context }) => {
  //     const pageToken = await loginPage.getTokenValue();

  //     await setupActions.clearCart(context, pageToken);
  //     await basePage.openPage();
  //   });

  test('Заказ товаров', async ({ userActions, catalogPage, basePage }) => {
    for (let product of productsForOrderNames) {
      await catalogPage.openPage();

      let productToOrder = createProduct();
      await userActions.chooseProductByName(product);
      await userActions.addProductToCart(productToOrder);
      await userActions.checkOrder(productToOrder);
    }

    await userActions.checkFinalPrice();
    await userActions.checkEmptyUserData();
    await basePage.openPage();
    await userActions.checkRecenlyViewBlock(productsForOrderNames);
  });
});
