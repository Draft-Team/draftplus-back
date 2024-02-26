import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RecipeService, JwtService],
  controllers: [RecipeController],
})
export class RecipeModule {}
