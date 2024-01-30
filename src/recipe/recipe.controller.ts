import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRecipeDTO } from './dtos/create-recipe.dto';
import { RecipeService } from './recipe.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(data: CreateRecipeDTO) {
    return this.recipeService.create(data);
  }
}
