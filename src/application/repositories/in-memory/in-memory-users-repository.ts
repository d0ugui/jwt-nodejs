import { Account, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: Account[] = [];

  async create(data: Prisma.AccountCreateInput): Promise<Account> {
    const account = {
      id: randomUUID(),
      ...data
    };

    this.users.push(account);

    return account;
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.users.find(account => account.email === email) ?? null;
  }

  async findById(accountId: string): Promise<Account | null> {
    return this.users.find(account => account.id === accountId) ?? null;
  }
}