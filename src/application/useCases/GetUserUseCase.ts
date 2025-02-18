import { Account } from '@prisma/client';
import { prismaClient } from '../libs/prismaClient';
import { AccountNotFound } from '../errors/AccountNotFound';

interface IInput {
  accountId: string;
}

type IAccount = Omit<Account, 'password'>


export class GetUserUseCase {
  async execute({ accountId }: IInput): Promise<IAccount> {
    const account = await prismaClient.account.findUnique({
      where: {
        id: accountId,
      }
    });

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