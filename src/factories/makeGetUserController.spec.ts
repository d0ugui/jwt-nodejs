import { describe, expect, test } from 'vitest';
import { makeGetUserController } from './makeGetUserController';
import { GetUserController } from '../application/controllers/GetUserController';

describe('make get user controller factory tests', () => {
  test('shoud return a instance of get user controller', () => {
    const getUserController = makeGetUserController();

    expect(getUserController).toBeInstanceOf(GetUserController);
  });

  test('should return a new instance each time it is called', () => {
    const instance1 = makeGetUserController();
    const instance2 = makeGetUserController();

    expect(instance1).not.toBe(instance2);
  });
});