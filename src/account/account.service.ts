import { Injectable, NotFoundException } from '@nestjs/common';
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
    const account = await this.accountRepository.findById(id);

    if (!account) throw new NotFoundException(`Invalid recipe id: ${id}`);
    this.accountRepository.update(id, data);
  }

  async updateEmail(id: string, data: any): Promise<void> {
    // TODO: implement update email
    console.log({ id, data });
    return;
  }

  async updatePassword(id: string, data: any): Promise<void> {
    // TODO: implement update password
    console.log({ id, data });
    return;
  }
}
