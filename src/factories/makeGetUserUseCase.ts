import { InMemoryUsersRepository } from '../application/repositories/in-memory/in-memory-users-repository';
import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { GetUserUseCase } from '../application/useCases/GetUserUseCase';

export function makeGetUserUseCase(inMemoryUsersRepository?: InMemoryUsersRepository) {
  if (inMemoryUsersRepository) {
    return new GetUserUseCase(inMemoryUsersRepository);
  }

  const usersRepository = new PrismaUsersRepository();

  return new GetUserUseCase(usersRepository);
}