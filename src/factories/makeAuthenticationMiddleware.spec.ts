import { makeAuthenticationMiddleware } from './makeAuthenticationMiddleware';
import { AuthenticationMiddleware } from '../application/middlewares/AuthenticationMiddleware';

describe('make authentication middleware factory tests', () => {
  test('shoud return a instance of authentication middleware', () => {
    const middleware = makeAuthenticationMiddleware();

    expect(middleware).toBeInstanceOf(AuthenticationMiddleware);
  });

  test('should return a new instance each time it is called', () => {
    const instance1 = makeAuthenticationMiddleware();
    const instance2 = makeAuthenticationMiddleware();

    expect(instance1).not.toBe(instance2);
  });
});