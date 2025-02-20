import { Account } from '@prisma/client';

export interface UsersRepository {
  create(name: string, email: string, password: string): Promise<void>;
  findByEmail(email: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
}
