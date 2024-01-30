import * as crypto from 'node:crypto';
import { OmitType } from '../../types/omit.type';

type RecipeEntityProps = {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  steps: string;
  description: string;
  rating: number;
  author_id: string;
};

type RecipeEntityBuildProps = {
  id: string;
  title: string;
  image: string;
  ingredients: string;
  steps: string;
  description: string;
  rating: number;
  author_id: string;
};

export type RecipeEntityToObject = RecipeEntityProps;

export class RecipeEntity {
  readonly id: string;
  public title: string;
  public image: string;
  public ingredients: string[];
  public steps: string;
  public description: string;
  public rating: number;
  public author_id: string;

  private constructor(props: RecipeEntityProps) {
    this.id = props.id;
    this.title = props.title;
    this.image = props.image;
    this.ingredients = props.ingredients;
    this.steps = props.steps;
    this.description = props.description;
    this.rating = props.rating;
    this.author_id = props.author_id;
  }

  static create(
    data: OmitType<RecipeEntityProps, 'rating' | 'id'>,
  ): RecipeEntity {
    const { image, steps, title, description, ingredients, author_id } = data;
    return new RecipeEntity({
      id: crypto.randomUUID(),
      image,
      author_id,
      ingredients,
      description,
      title,
      steps,
      rating: 0,
    });
  }

  static build(data: RecipeEntityBuildProps) {
    return new RecipeEntity({
      ...data,
      ingredients: data.ingredients.split(','),
    });
  }

  toObject(): RecipeEntityToObject {
    return {
      rating: this.rating,
      author_id: this.author_id,
      steps: this.steps,
      title: this.title,
      description: this.description,
      ingredients: this.ingredients,
      image: this.image,
      id: this.id,
    };
  }
}
