import { makeSignUpController } from './makeSignUpController';
import { SignUpController } from '../application/controllers/SignUpController';

describe('make sign up controller factory tests', () => {
  test('shoud return a instance of sign up controller', () => {
    const signUpController = makeSignUpController();

    expect(signUpController).toBeInstanceOf(SignUpController);
  });

  test('should return a new instance each time it is called', () => {
    const instance1 = makeSignUpController();
    const instance2 = makeSignUpController();

    expect(instance1).not.toBe(instance2);
  });
});