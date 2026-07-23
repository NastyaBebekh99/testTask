import { expect, test, type Page } from '@playwright/test';
import { CatalogPage } from '../pages/catalogPage';
import { ProductPage } from '../pages/productPage';
import { waitForResponse } from '../helper/network';
import { CART_ENDPOINT, ORDER_ENDPOINT } from '../data/endpoints';
import { extractNumber } from '../helper/methods';
import { CartPage } from '../pages/cartPage';
import { successOrderText } from '../data/messages';
import { Product, Size } from '../types/product';
import { Header } from '../pages/components/header';
import { NavigationBar } from '../pages/components/navigationBar';

export class UserActions {
  constructor(
    protected page: Page,
    private catalogPage: CatalogPage,
    private productPage: ProductPage,
    private cartPage: CartPage,
    private header: Header,
    private navigatonBar: NavigationBar,
  ) {}

  async chooseProductNotOnSale() {
    await test.step('Выбрать один товар без скидки', async () => {
      const productName = await this.catalogPage.getFirstProductNameNotOnSale();
      await this.catalogPage.selectFirstProductNotOnSale();

      expect(await this.productPage.getProductTitle()).toBe(productName);
    });
  }

  async chooseProductOnSale() {
    await test.step('Выбрать один товар со скидкой', async () => {
      const productName = await this.catalogPage.getFirstProductNameOnSale();
      await this.catalogPage.selectFirstProductOnSale();

      expect(await this.productPage.getProductTitle()).toBe(productName);
    });
  }

  async chooseProductByName(productName: string) {
    await test.step(`Выбрать товар ${productName} в каталоге`, async () => {
      await this.catalogPage.selectProductByName(productName);

      expect(await this.productPage.getProductTitle()).toBe(productName);
    });
  }

  async increaseProductQuantity(quantity: number) {
    await test.step(`Увеличить количество товара на ${quantity} единицы`, async () => {
      await this.productPage.increaseProductQuantity(quantity.toString());
    });
  }

  async setProductProperties(product: Product) {
    product.name = await this.productPage.getProductTitle();
    product.quantity = Number(await this.productPage.getProductQuantity());
    product.hasSale = await this.productPage.onSale();
    const price = extractNumber(await this.productPage.getProductPrice(product.hasSale));
    product.price = product.hasSale ? price + extractNumber(await this.productPage.selectedSizeText()) : price;
  }

  async addProductToCart(product: Product, size: Size = 'Small') {
    await test.step(`Добавить товар в корзину`, async () => {
      await this.productPage.selectProductSizeIfNeeded(size);

      await this.setProductProperties(product);
      const cartItemsQuantity = extractNumber(await this.header.getCartItemsQuantity());
      const cartItemsPrice = extractNumber(await this.header.getCartItemsPrice());
      const responsePromise = waitForResponse(this.page, CART_ENDPOINT);

      await this.productPage.addToCart();

      const response = await responsePromise;
      expect(response.ok()).toBeTruthy();

      expect(Number(await this.header.getCartItemsQuantity())).toBe(cartItemsQuantity + product.quantity);
      const expectedPrice =
        (await this.productPage.getUserCurrency()) + (cartItemsPrice + product.price * product.quantity);
      expect(await this.header.getCartItemsPrice()).toBe(expectedPrice);
    });
  }

  async checkOrder(product: Product) {
    await test.step('Переход в корзину и проверка заказа', async () => {
      await this.cartPage.openPage();

      const productQuantity = Number(await this.cartPage.getProductQuantity(product.name));

      expect(productQuantity).toEqual(product.quantity);
      const expectedPrice = (await this.productPage.getUserCurrency()) + (product.price * product.quantity).toFixed(2);
      expect(await this.cartPage.getProductPrice(product.name)).toEqual(expectedPrice);
    });
  }

  async checkFinalPrice() {
    await test.step('Проверка итоговой стоимости', async () => {
      const productsPrices = await this.cartPage.getProductsPrices();
      const sum: number = productsPrices.reduce((accumulator: number, currentPrice: string) => {
        return accumulator + extractNumber(currentPrice);
      }, 0);

      const totalPrice = await this.cartPage.getTotalPrice();
      expect((await this.productPage.getUserCurrency()) + sum.toFixed(2)).toBe(totalPrice);
    });
  }

  async confirmOrder() {
    await test.step('Подтверждение заказа', async () => {
      const responsePromise = waitForResponse(this.page, ORDER_ENDPOINT);
      await this.cartPage.confirmOrder();
      const response = await responsePromise;

      expect(response.ok()).toBeTruthy();

      expect(await this.cartPage.getPageTitle()).toBe(successOrderText);
      expect(Number(await this.header.getCartItemsQuantity())).toBe(0);
      expect(await this.header.getCartItemsPrice()).toBe((await this.productPage.getUserCurrency()) + 0);
    });
  }

  async checkEmptyUserData() {
    await test.step('Проверка незаполненных данных неавторизованного пользователя', async () => {
      const values = await this.cartPage.getUserDetailsValues();
      values.forEach(value => expect(value).toBe(''));
    });
  }

  async checkRecenlyViewBlock(productNames: string[]) {
    await test.step('Проверка отображения товаров в блоке Recently View', async () => {
      for (let product of productNames) {
        product = product.toLowerCase().replace(' ', '-');
        await this.navigatonBar.validateImage(product);
      }
    });
  }
}
