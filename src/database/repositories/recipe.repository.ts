import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { recipe_rating_schema, recipe_schema } from '../schemas';
import { RecipeEntity } from '../../recipe/domain/recipe.entity';
import { IGenericRepository } from '../../abstracts/generic-repository.abstract';
import { Nullable } from '../../types/nullable.type';
import { and, eq } from 'drizzle-orm';
import { RecipeRatingEntity } from '../../recipe/domain/recipe-rating.entity';

@Injectable()
export class RecipeRepository implements IGenericRepository<RecipeEntity> {
  constructor(private readonly dbService: DrizzleService) {}

  async create(data: RecipeEntity): Promise<void> {
    const { id, image, steps, title, author_id, description, ingredients } =
      data;
    await this.dbService.db.insert(recipe_schema).values({
      id,
      ingredients,
      description,
      title,
      steps,
      image,
      author_id,
    });
  }

  async delete(id: string): Promise<void> {
    await this.dbService.db
      .delete(recipe_schema)
      .where(eq(recipe_schema.id, id));
  }

  async update(id: string, data: Partial<RecipeEntity>): Promise<RecipeEntity> {
    const [recipe] = await this.dbService.db
      .update(recipe_schema)
      .set({ ...data })
      .where(eq(recipe_schema.id, id))
      .returning();

    return RecipeEntity.build(recipe);
  }

  async findById(id: string): Promise<Nullable<RecipeEntity>> {
    const recipe = await this.dbService.db
      .select()
      .from(recipe_schema)
      .where(eq(recipe_schema.id, id))
      .get();

    return recipe ? RecipeEntity.build(recipe) : null;
  }

  async rateRecipe(data: RecipeRatingEntity): Promise<void> {
    const { recipe_id, account_id, rate } = data;
    const where = and(
      eq(recipe_rating_schema.recipe_id, recipe_id),
      eq(recipe_rating_schema.account_id, account_id),
    );

    if (
      await this.dbService.db
        .select()
        .from(recipe_rating_schema)
        .where(where)
        .get()
    ) {
      await this.dbService.db
        .update(recipe_rating_schema)
        .set({ rate })
        .where(where);
      return;
    }

    await this.dbService.db
      .insert(recipe_rating_schema)
      .values({ account_id, recipe_id, rate });
  }
}
