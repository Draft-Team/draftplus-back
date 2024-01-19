import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

@Module({
  providers: [AccountService, EncryptionService],
  controllers: [AccountController],
})
export class AccountModule {}
