import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { UtilsModule } from '../utils/utils.module';
import { AccountController } from './account.controller';

@Module({
  imports: [UtilsModule],
  providers: [AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
