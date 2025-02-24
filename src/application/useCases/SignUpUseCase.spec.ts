import { beforeEach, describe, test, expect } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { SignUpUseCase } from './SignUpUseCase';
import { makeSignUpUseCase } from '../../factories/makeSignUpUseCase';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

let usersRepository: InMemoryUsersRepository;
let signUpUseCase: SignUpUseCase;

describe('sign-up use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    signUpUseCase = makeSignUpUseCase(usersRepository);
  });

  test('should be able to sign-up', async () => {
    const account = await signUpUseCase.execute({
      name: 'John Doe',
      email: '2wK6H@example.com',
      password: '12345678'
    });

    expect(account).toHaveProperty('id');
  });

  test('should throw account-already-exists error when pass a existing email', async () => {
    await signUpUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '12345678'
    });

    await expect(signUpUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '12345678'
    })).rejects.toBeInstanceOf(AccountAlreadyExists);
  });
});