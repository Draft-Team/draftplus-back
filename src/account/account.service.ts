import { Injectable } from '@nestjs/common';
import { AccountEntity } from './domain/account.entity';
import { CreateAccountDTO } from './dtos/create-account.dto';

@Injectable()
export class AccountService {
  async create(data: CreateAccountDTO): Promise<AccountEntity> {
    return AccountEntity.create({
      password: data.password,
      username: data.username,
      email: data.email,
    });
  }
}
