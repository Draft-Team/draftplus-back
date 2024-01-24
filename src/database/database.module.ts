import { Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { AccountRepository } from './repositories';

@Global()
@Module({
  providers: [DrizzleService, AccountRepository],
  exports: [DrizzleService, AccountRepository],
})
export class DatabaseModule {}
