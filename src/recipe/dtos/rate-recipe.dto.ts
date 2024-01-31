import { IsNumber, Min } from 'class-validator';

export class RateRecipeDTO {
  @IsNumber()
  @Min(0)
  rate: number;
}
