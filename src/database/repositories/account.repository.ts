import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { account_schema } from '../schemas';
import { IGenericRepository } from 'src/abstracts/generic-repository.abstract';
import { AccountEntity } from '../../account/domain/account.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class AccountRepository implements IGenericRepository<AccountEntity> {
  constructor(private readonly dbService: DrizzleService) {}

  async create(data: AccountEntity): Promise<void> {
    const { username, email, password, bio, avatar_url } = data;
    await this.dbService.db
      .insert(account_schema)
      .values({ username, email, password, bio, avatar_url })
      .returning();
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.dbService.db
      .select()
      .from(account_schema)
      .where(eq(account_schema.email, email))
      .get();

    return account ? AccountEntity.build(account) : null;
  }
}
