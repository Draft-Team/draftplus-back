import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { account_schema } from '../schemas';
import { AccountEntity } from '../../account/domain/account.entity';
import { eq } from 'drizzle-orm';
import { IGenericRepository } from '../../abstracts/generic-repository.abstract';
import { Nullable } from '../../types/nullable.type';

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

  async delete(id: string): Promise<void> {
    await this.dbService.db
      .delete(account_schema)
      .where(eq(account_schema.id, id));
  }

  async update(id: string, data: Partial<AccountEntity>): Promise<void> {
    // TODO: implement update
    console.log(id, data);
    return;
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.dbService.db
      .select()
      .from(account_schema)
      .where(eq(account_schema.email, email))
      .get();

    return account ? AccountEntity.build(account) : null;
  }

  async findById(id: string): Promise<Nullable<AccountEntity>> {
    const account = await this.dbService.db
      .select()
      .from(account_schema)
      .where(eq(account_schema.id, id))
      .get();

    return account ? AccountEntity.build(account) : null;
  }
}
