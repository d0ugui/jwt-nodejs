import { InMemoryUsersRepository } from '../application/repositories/in-memory/in-memory-users-repository';
import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

export function makeSignUpUseCase(inMemoryUserRepository?: InMemoryUsersRepository) {
  if (inMemoryUserRepository) {
    return new SignUpUseCase(inMemoryUserRepository);
  }

  const usersRepository = new PrismaUsersRepository();

  return new SignUpUseCase(usersRepository);
}