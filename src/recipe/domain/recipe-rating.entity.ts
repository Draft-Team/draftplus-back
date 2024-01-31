import * as crypto from 'node:crypto';
import { OmitType } from '../../types/omit.type';

type RecipeRatingEntityProps = {
  id: string;
  account_id: string;
  recipe_id: string;
  rate: number;
};

export type RecipeEntityToObject = RecipeRatingEntityProps;

export class RecipeRatingEntity {
  readonly id: string;
  account_id: string;
  recipe_id: string;
  rate: number;

  private constructor(props: RecipeRatingEntityProps) {
    this.id = props.id;
    this.rate = props.rate;
    this.account_id = props.account_id;
    this.recipe_id = props.recipe_id;
  }

  static create(
    data: OmitType<RecipeRatingEntityProps, 'id'>,
  ): RecipeRatingEntity {
    const { account_id, recipe_id, rate } = data;
    return new RecipeRatingEntity({
      id: crypto.randomUUID(),
      rate,
      recipe_id,
      account_id,
    });
  }

  static build(data: RecipeRatingEntityProps) {
    return new RecipeRatingEntity(data);
  }

  toObject(): RecipeEntityToObject {
    return {
      id: this.id,
      recipe_id: this.recipe_id,
      account_id: this.account_id,
      rate: this.rate,
    };
  }
}
