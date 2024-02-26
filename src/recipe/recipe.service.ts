import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountRepository, RecipeRepository } from '../database/repositories';
import { CreateRecipeRequestDTO } from './dtos/create-recipe.dto';
import { RecipeEntity, RecipeEntityToObject } from './domain/recipe.entity';
import { DeleteRecipeByIdRequestDTO } from './dtos/delete-recipe-by-id.dto';
import { RateRecipeRequestDTO } from './dtos/rate-recipe.dto';
import { RecipeRatingEntity } from './domain/recipe-rating.entity';
import { UpdateRecipeRequestDTO } from './dtos/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepo: RecipeRepository,
    private readonly accountRepo: AccountRepository,
  ) {}

  async create(
    data: CreateRecipeRequestDTO,
    author_id: string,
  ): Promise<RecipeEntityToObject> {
    const account = await this.accountRepo.findById(author_id);
    if (!account) {
      throw new NotFoundException(`Invalid account id: ${author_id}`);
    }

    const recipe = RecipeEntity.create({ ...data, author_id });

    await this.recipeRepo.create(recipe);

    return recipe.toObject();
  }

  async deleteById(
    data: DeleteRecipeByIdRequestDTO,
  ): Promise<RecipeEntityToObject> {
    const recipe = await this.recipeRepo.findById(data.id);
    if (!recipe) throw new NotFoundException(`Invalid account id: ${data.id}`);

    await this.recipeRepo.delete(data.id);

    return recipe.toObject();
  }

  async update(
    id: string,
    data: UpdateRecipeRequestDTO,
  ): Promise<RecipeEntityToObject> {
    if (!Object.keys(data).length)
      throw new BadRequestException('DTO_IS_EMPTY');
    const recipe = await this.recipeRepo.findById(id);

    if (!recipe) throw new NotFoundException(`Invalid recipe id: ${id}`);

    const update = await this.recipeRepo.update(id, data);

    return update.toObject();
  }

  async rate(
    data: RateRecipeRequestDTO,
    recipe_id: string,
    account_id: string,
  ) {
    const recipeRating = RecipeRatingEntity.create({
      rate: data.rate,
      account_id,
      recipe_id,
    });
    await this.recipeRepo.rateRecipe(recipeRating);
  }
}
