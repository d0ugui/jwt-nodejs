import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { SignInUseCase } from '../application/useCases/SignInUseCase';

export function makeSignInUseCase() {
  const usersRepository = new PrismaUsersRepository();

  return new SignInUseCase(usersRepository);
}