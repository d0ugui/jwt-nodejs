import { Account, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';
import { hash } from 'bcryptjs';

export class InMemoryUsersRepository implements UsersRepository {
  public users: Account[] = [];

  async create(data: Prisma.AccountCreateInput): Promise<Account> {
    const hashPassword = await hash(data.password, 8);

    const account = {
      id: randomUUID(),
      ...data,
      password: hashPassword
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