import { Account, Prisma } from '@prisma/client';
import { prismaClient } from '../../libs/prismaClient';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.AccountCreateInput): Promise<Account> {
    const account = await prismaClient.account.create({
      data
    });

    return account;
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { email }
    });

    return account;
  }

  async findById(id: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { id }
    });

    return account;
  }
}