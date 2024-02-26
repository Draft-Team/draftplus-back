import { Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { RecipeRepository, AccountRepository } from './repositories';

@Global()
@Module({
  providers: [DrizzleService, RecipeRepository, AccountRepository],
  exports: [DrizzleService, RecipeRepository, AccountRepository],
})
export class DatabaseModule {}
