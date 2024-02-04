import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  roleId?: string;
}
