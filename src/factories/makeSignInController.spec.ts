import { describe, expect, test } from 'vitest';
import { makeSignInController } from './makeSignInController';
import { SignInController } from '../application/controllers/SignInController';

describe('make sign in controller factory tests', () => {
  test('shoud return a instance of sign in controller', () => {
    const signInController = makeSignInController();

    expect(signInController).toBeInstanceOf(SignInController);
  });

  test('should return a new instance each time it is called', () => {
    const instance1 = makeSignInController();
    const instance2 = makeSignInController();

    expect(instance1).not.toBe(instance2);
  });
});