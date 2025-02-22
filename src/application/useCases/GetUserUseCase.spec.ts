import { describe, expect, test } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { makeGetUserUseCase } from '../../factories/makeGetUserUseCase';
import { AccountNotFound } from '../errors/AccountNotFound';

const usersRepository = new InMemoryUsersRepository;
const getUserUseCase = makeGetUserUseCase(usersRepository);

describe('getUser use case', () => {
  test('should be able to get user', async () => {
    const account = await usersRepository.create({
      name: 'John Doe',
      email: '2wK6H@example.com',
      password: '12345678'
    });

    expect(await getUserUseCase.execute({ accountId: account.id })).toEqual({
      id: account.id,
      name: account.name,
      email: account.email
    });
  });

  test('should throw account-not-found error when pass a invalid account id', async () => {
    await expect(getUserUseCase.execute({ accountId: '1234' })).rejects.toBeInstanceOf(AccountNotFound);
  });
});