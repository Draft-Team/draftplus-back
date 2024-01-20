import { Injectable } from '@nestjs/common';
import { AccountEntity } from './domain/account.entity';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { EncryptionService } from '../utils/encryption/encryption.service';

@Injectable()
export class AccountService {
  constructor(private readonly encryptionService: EncryptionService) {}
  async create(data: CreateAccountDTO): Promise<AccountEntity> {
    const hashPassword = await this.encryptionService.hash(data.password);
    return AccountEntity.create({
      password: hashPassword,
      username: data.username,
      email: data.email,
    });
  }

  async findByEmail(_email: string): Promise<AccountEntity | null> {
    return {} as any;
  }
}
