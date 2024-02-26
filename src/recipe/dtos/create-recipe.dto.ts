import { IsString } from 'class-validator';

export class CreateRecipeRequestDTO {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  ingredients: string;

  @IsString()
  steps: string;

  @IsString()
  description: string;
}
