import { Injectable } from '@nestjs/common';
import { AccountEntity } from './domain/account.entity';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { EncryptionService } from '../utils/encryption/encryption.service';
import { AccountRepository } from '../database/repositories';
import { Nullable } from '../types/nullable.type';
import { UpdateAccountDTO } from './dtos/update-user.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly accountRepository: AccountRepository,
  ) {}

  async create(data: CreateAccountDTO): Promise<AccountEntity> {
    const hashPassword = await this.encryptionService.hash(data.password);
    const account = AccountEntity.create({
      password: hashPassword,
      username: data.username,
      email: data.email,
      role_id: data.roleId,
    });

    await this.accountRepository.create(account);

    return account;
  }

  async findByEmail(email: string): Promise<Nullable<AccountEntity>> {
    return await this.accountRepository.findByEmail(email);
  }

  async findById(id: string): Promise<Nullable<AccountEntity>> {
    return await this.accountRepository.findById(id);
  }

  async update(id: string, data: UpdateAccountDTO): Promise<void> {
    this.accountRepository.update(id, data);
  }
}
