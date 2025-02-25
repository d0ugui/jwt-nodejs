import { describe, expect, it, vi } from 'vitest';
import { InMemoryUsersRepository } from '../application/repositories/in-memory/in-memory-users-repository';
import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { makeSignUpUseCase } from './makeSignUpUseCase';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

vi.mock('../application/repositories/prisma/prisma-users-repository', () => {
  return {
    PrismaUsersRepository: vi.fn(),
  };
});

describe('make sign up use case factory tests', () => {
  it('should return an instance of sign up use case', () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const signUpUseCase = makeSignUpUseCase(inMemoryRepository);

    expect(signUpUseCase).toBeInstanceOf(SignUpUseCase);
  });

  it('should use the provided InMemoryUsersRepository when passed as a parameter', () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const signUpUseCase = makeSignUpUseCase(inMemoryRepository);

    expect(signUpUseCase).toBeInstanceOf(SignUpUseCase);
    expect((signUpUseCase as any).usersRepository).toBe(inMemoryRepository);
  });

  it('should use PrismaUsersRepository when no parameter is provided', () => {
    const signUpUseCase = makeSignUpUseCase();

    expect(signUpUseCase).toBeInstanceOf(SignUpUseCase);
    expect(PrismaUsersRepository).toHaveBeenCalledTimes(1);
  });

  it('should create a new instance of signUpUseCase each time it is called', () => {
    const useCase1 = makeSignUpUseCase();
    const useCase2 = makeSignUpUseCase();

    expect(useCase1).not.toBe(useCase2);
  });
});
