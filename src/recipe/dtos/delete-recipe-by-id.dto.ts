import { IsString, IsUUID } from 'class-validator';

export class DeleteRecipeByIdRequestDTO {
  @IsString()
  @IsUUID()
  id: string;
}
