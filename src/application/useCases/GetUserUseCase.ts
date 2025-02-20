import { Account } from '@prisma/client';
import { AccountNotFound } from '../errors/AccountNotFound';
import { UsersRepository } from '../repositories/users-repository';

interface IInput {
  accountId: string;
}

type IAccount = Omit<Account, 'password'>


export class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }
  async execute({ accountId }: IInput): Promise<IAccount> {
    const account = await this.usersRepository.findById(accountId);

    if (!account) {
      throw new AccountNotFound();
    }

    return {
      id: account.id,
      name: account.name,
      email: account.email
    };
  }
}