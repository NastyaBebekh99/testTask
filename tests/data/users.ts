import { faker } from '@faker-js/faker';

type User = {
  email: string;
  password: string;
};

export const testUser: User = {
  email: 'test.account@gmail.com',
  password: '12345678',
};

export const userWithInvalidPassword: User = {
  email: 'test.account@gmail.com',
  password: faker.internet.password(),
};
