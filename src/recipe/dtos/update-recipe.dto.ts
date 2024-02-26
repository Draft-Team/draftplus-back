import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRecipeRequestParamDTO {
  @IsString()
  @IsUUID()
  recipe_id: string;
}

export class UpdateRecipeRequestDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  steps?: string;

  @IsString()
  @IsOptional()
  ingredients?: string;
}
