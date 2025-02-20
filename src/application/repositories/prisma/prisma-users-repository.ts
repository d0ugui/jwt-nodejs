import { Account } from '@prisma/client';
import { prismaClient } from '../../libs/prismaClient';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async create(name: string, email: string, password: string): Promise<void> {
    await prismaClient.account.create({
      data: {
        name,
        email,
        password
      }
    });
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