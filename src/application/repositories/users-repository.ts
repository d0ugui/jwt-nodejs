import { Account, Prisma } from '@prisma/client';

export interface UsersRepository {
  create(data: Prisma.AccountCreateInput): Promise<Account>;
  findByEmail(email: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
}
