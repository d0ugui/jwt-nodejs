import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../libs/prismaClient';
import { UsersRepository } from '../repositories/users-repository';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await this.usersRepository.findByEmail(email);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 8);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  }
}