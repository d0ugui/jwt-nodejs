import { PrismaUsersRepository } from '../application/repositories/prisma/prisma-users-repository';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

export function makeSignUpUseCase() {
  const usersRepository = new PrismaUsersRepository();

  return new SignUpUseCase(usersRepository);
}