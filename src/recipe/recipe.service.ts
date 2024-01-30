import { Injectable } from '@nestjs/common';
import { AccountRepository, RecipeRepository } from '../database/repositories';
import { CreateRecipeDTO } from './dtos/create-recipe.dto';
import { RecipeEntity } from './domain/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepo: RecipeRepository,
    private readonly accountRepo: AccountRepository,
  ) {}

  async create(data: CreateRecipeDTO) {
    const account = await this.accountRepo.findById(data.author_id);
    if (!account) {
      throw new Error(`Invalid account id: ${data.author_id}`);
    }

    const recipe = RecipeEntity.create(data);

    await this.recipeRepo.create(recipe);
  }
}
