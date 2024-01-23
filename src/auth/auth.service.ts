import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { AuthEntity } from './domain/auth.entity';
import { SignInDTO } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDTO): Promise<AuthEntity> {
    const account = await this.accountService.findByEmail(data.email);

    if (!account) throw new BadRequestException('ERR_ACCOUNT_NOT_FOUND');

    const token = this.jwtService.sign({ id: account.id });

    const authEntity = AuthEntity.create(account, token);

    return authEntity;
  }
}
