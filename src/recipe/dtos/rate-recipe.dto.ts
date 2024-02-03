import { IsNumber, Min } from 'class-validator';

export class RateRecipeRequestDTO {
  @IsNumber()
  @Min(0)
  rate: number;
}
