import { IsNumber, IsUUID, Min } from 'class-validator';

export class RateRecipeDTO {
  @IsUUID()
  recipe_id: string;

  @IsNumber()
  @Min(0)
  rate: number;
}
