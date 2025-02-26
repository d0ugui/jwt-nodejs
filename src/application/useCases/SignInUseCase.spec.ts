import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { makeSignInUseCase } from '../../factories/makeSignInUseCase';
import { SignInUseCase } from './SignInUseCase';
import { InvalidCredentials } from '../errors/InvalidCredentials';

let usersRepository: InMemoryUsersRepository;
let signInUseCase: SignInUseCase;

describe('sign-in use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    signInUseCase = makeSignInUseCase(usersRepository);
  });

  test('shoud be able to sign-in and return access token', async () => {
    const account = {
      name: 'John Doe 1',
      email: 'john.doe1@me.com',
      password: '12345678'
    };

    await usersRepository.create(account);

    const { accessToken } = await signInUseCase.execute({
      email: account.email,
      password: account.password
    });

    expect(accessToken).toBeTruthy();
  });

  test('should not be able to sign-in with invalid email', async () => {
    const account = {
      name: 'John Doe 2',
      email: 'john.doe2@me.com',
      password: '12345678'
    };

    await usersRepository.create(account);

    await expect(signInUseCase.execute({
      email: 'invalid-email',
      password: account.password
    })).rejects.toBeInstanceOf(InvalidCredentials);
  });

  test('should not be able to sign-in with invalid password', async () => {
    const account = {
      name: 'John Doe 3',
      email: 'john.doe3@me.com',
      password: '12345678'
    };

    await usersRepository.create(account);

    await expect(signInUseCase.execute({
      email: account.email,
      password: 'invalid-password'
    })).rejects.toBeInstanceOf(InvalidCredentials);
  });
});