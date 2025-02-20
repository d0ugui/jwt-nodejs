import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { GetUserUseCase } from '../application/useCases/GetUserUseCase';

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository();

  return new GetUserUseCase(usersRepository);
}