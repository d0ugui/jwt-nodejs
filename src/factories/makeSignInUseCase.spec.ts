import { describe, expect, it, vi } from 'vitest';
import { InMemoryUsersRepository } from '../application/repositories/in-memory/in-memory-users-repository';
import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { makeSignInUseCase } from './makeSignInUseCase';
import { SignInUseCase } from '../application/useCases/SignInUseCase';

vi.mock('../application/repositories/prisma/prisma-users-repository', () => {
  return {
    PrismaUsersRepository: vi.fn(),
  };
});

describe('make sign in use case factory tests', () => {
  it('should return an instance of sign in use case', () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const signInUseCase = makeSignInUseCase(inMemoryRepository);

    expect(signInUseCase).toBeInstanceOf(SignInUseCase);
  });

  it('should use the provided in-memory-users-repository when passed as a parameter', () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const signInUseCase = makeSignInUseCase(inMemoryRepository);

    expect(signInUseCase).toBeInstanceOf(SignInUseCase);
    expect((signInUseCase as any).usersRepository).toBe(inMemoryRepository);
  });

  it('should use prisma-users-repository when no parameter is provided', () => {
    const signInUseCase = makeSignInUseCase();

    expect(signInUseCase).toBeInstanceOf(SignInUseCase);
    expect(PrismaUsersRepository).toHaveBeenCalledTimes(1);
  });

  it('should create a new instance of sign in use case each time it is called', () => {
    const useCase1 = makeSignInUseCase();
    const useCase2 = makeSignInUseCase();

    expect(useCase1).not.toBe(useCase2);
  });
});
