import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [AccountModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
