import { makeGetUserUseCase } from '../factories/makeGetUserUseCase';
import { GetUserUseCase } from '../application/useCases/GetUserUseCase';
import { InMemoryUsersRepository } from '../application/repositories/in-memory/in-memory-users-repository';
import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';

vi.mock('../application/repositories/prisma/prisma-users-repository', () => {
  return {
    PrismaUsersRepository: vi.fn(),
  };
});

describe('make get user use case factory tests', () => {
  it('should return an instance of get user use case', () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const getUserUseCase = makeGetUserUseCase(inMemoryRepository);

    expect(getUserUseCase).toBeInstanceOf(GetUserUseCase);
  });

  it('should use the provided in-memory-users-repository when passed as a parameter', () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const getUserUseCase = makeGetUserUseCase(inMemoryRepository);

    expect(getUserUseCase).toBeInstanceOf(GetUserUseCase);
    expect((getUserUseCase as any).usersRepository).toBe(inMemoryRepository);
  });

  it('should use prisma-users-repository when no parameter is provided', () => {
    const getUserUseCase = makeGetUserUseCase();

    expect(getUserUseCase).toBeInstanceOf(GetUserUseCase);
    expect(PrismaUsersRepository).toHaveBeenCalledTimes(1);
  });

  it('should create a new instance of get user use case each time it is called', () => {
    const useCase1 = makeGetUserUseCase();
    const useCase2 = makeGetUserUseCase();

    expect(useCase1).not.toBe(useCase2);
  });
});
