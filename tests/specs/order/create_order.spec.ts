import { test } from '../../fixtures/fixture';
import { testUser } from '../../data/users';
import { createProduct } from '../../data/order';

test.describe('Создание заказа авторизованным пользователем', () => {
  test.beforeEach(async ({ loginActions, loginForm, setupActions, basePage, context }) => {
    const pageToken = await loginForm.getTokenValue();

    await loginActions.login(context, pageToken, testUser);
    await setupActions.clearCart(context, pageToken);
    await basePage.openPage();
  });

  test('Заказ товара без скидки', async ({ userActions }) => {
    const productQuantity = 3;
    let productToOrder = createProduct();

    await userActions.chooseProductNotOnSale();
    await userActions.increaseProductQuantity(productQuantity);
    await userActions.addProductToCart(productToOrder);
    await userActions.checkOrder(productToOrder);
    await userActions.checkFinalPrice();

    await userActions.confirmOrder();
  });

  test('Заказ товара со скидкой', async ({ userActions }) => {
    const productQuantity = 2;
    let productToOrder = createProduct();

    await userActions.chooseProductOnSale();
    await userActions.increaseProductQuantity(productQuantity);
    await userActions.addProductToCart(productToOrder, 'Large');
    await userActions.checkOrder(productToOrder);
    await userActions.confirmOrder();
  });
});
