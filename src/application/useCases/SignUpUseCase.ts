import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { UsersRepository } from '../repositories/users-repository';
import { Account } from '@prisma/client';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = Omit<Account, 'password'>;

export class SignUpUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await this.usersRepository.findByEmail(email);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 8);

    const account = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: account.id,
      name: account.name,
      email: account.email,
    };
  }
}
