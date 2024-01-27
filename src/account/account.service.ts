import { Injectable } from '@nestjs/common';
import { AccountEntity } from './domain/account.entity';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { EncryptionService } from '../utils/encryption/encryption.service';
import { AccountRepository } from '../database/repositories';

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

  async findByEmail(email: string): Promise<AccountEntity | null> {
    return await this.accountRepository.findByEmail(email);
  }
}
