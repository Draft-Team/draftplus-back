import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { UserService } from './tables/user.service';

@Module({
  providers: [DrizzleService, UserService],
})
export class DatabaseModule {}
