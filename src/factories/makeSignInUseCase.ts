import { InMemoryUsersRepository } from '../application/repositories/in-memory/in-memory-users-repository';
import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { SignInUseCase } from '../application/useCases/SignInUseCase';

export function makeSignInUseCase(inMemoryUsersRepository?: InMemoryUsersRepository) {
  if (inMemoryUsersRepository) {
    return new SignInUseCase(inMemoryUsersRepository);
  }

  const usersRepository = new PrismaUsersRepository();

  return new SignInUseCase(usersRepository);
}