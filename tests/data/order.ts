import { Product } from '../types/product';

export const productsForOrderNames = ['Yellow Duck', 'Blue Duck'];

export const createProduct = (): Product => ({
  name: '',
  quantity: 1,
  price: 0,
  hasSale: false,
});
