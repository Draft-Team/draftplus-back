import * as crypto from 'node:crypto';
import { OmitType } from '../../types/omit.type';

type RecipeEntityProps = {
  id: string;
  title: string;
  image: string;
  ingredients: string;
  steps: string;
  description: string;
  author_id: string;
};

export type RecipeEntityToObject = RecipeEntityProps;

export class RecipeEntity {
  readonly id: string;
  public title: string;
  public image: string;
  public ingredients: string;
  public steps: string;
  public description: string;
  public author_id: string;

  private constructor(props: RecipeEntityProps) {
    this.id = props.id;
    this.title = props.title;
    this.image = props.image;
    this.ingredients = props.ingredients;
    this.steps = props.steps;
    this.description = props.description;
    this.author_id = props.author_id;
  }

  static create(data: OmitType<RecipeEntityProps, 'id'>): RecipeEntity {
    const { image, steps, title, description, ingredients, author_id } = data;
    return new RecipeEntity({
      id: crypto.randomUUID(),
      image,
      author_id,
      ingredients,
      description,
      title,
      steps,
    });
  }

  static build(data: RecipeEntityProps) {
    return new RecipeEntity(data);
  }

  changeTitle(title?: string) {
    if (!title) return this;

    this.title = title;
    return this;
  }

  changeImage(image?: string) {
    if (!image) return this;

    this.image = image;
    return this;
  }

  changeDescription(description?: string) {
    if (!description) return this;
    this.description = description;
    return this;
  }

  changeSteps(steps?: string) {
    if (!steps) return this;

    this.steps = steps;

    return this;
  }

  changeIngredients(ingredients?: string | string[]) {
    if (!ingredients) return this;

    return this;
  }

  toObject(): RecipeEntityToObject {
    return {
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
