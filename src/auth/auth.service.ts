import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AuthEntity } from './domain/auth.entity';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService) { }

  async signIn(): Promise<AuthEntity> {
    return {} as any;
  }
}
