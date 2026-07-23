import { userWithInvalidPassword } from '../../data/users';
import { test } from '../../fixtures/fixture';

test.describe('Ввод невалидных данных в форме логина', () => {
  test('Логин с некорректным паролем', async ({ loginActions }) => {
    await loginActions.loginWithIncorrectCredentials(userWithInvalidPassword.email, userWithInvalidPassword.password);
    await loginActions.checkErrorMessage();
  });
});
