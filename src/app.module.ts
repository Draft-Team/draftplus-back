import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { UtilsModule } from './utils/utils.module';
import { EncryptionModule } from './utils/encryption/encryption.module';

@Module({
  imports: [AccountModule, UtilsModule, EncryptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
