import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
