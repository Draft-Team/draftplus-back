import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { recipe_schema } from '../schemas';
import { RecipeEntity } from '../../recipe/domain/recipe.entity';
import { IGenericRepository } from '../../abstracts/generic-repository.abstract';
import { Nullable } from '../../types/nullable.type';
import { eq } from 'drizzle-orm';

@Injectable()
export class RecipeRepository implements IGenericRepository<RecipeEntity> {
  constructor(private readonly dbService: DrizzleService) {}

  async create(data: RecipeEntity): Promise<void> {
    const {
      id,
      image,
      steps,
      title,
      rating,
      author_id,
      description,
      ingredients,
    } = data;
    await this.dbService.db.insert(recipe_schema).values({
      id,
      ingredients: ingredients.join(','),
      description,
      title,
      steps,
      image,
      rating,
      author_id,
    });
  }

  async delete(id: string): Promise<void> {
    await this.dbService.db
      .delete(recipe_schema)
      .where(eq(recipe_schema.id, id));
  }

  async findById(id: string): Promise<Nullable<RecipeEntity>> {
    const recipe = await this.dbService.db
      .select()
      .from(recipe_schema)
      .where(eq(recipe_schema.id, id))
      .get();

    return recipe ? RecipeEntity.build(recipe) : null;
  }
}
