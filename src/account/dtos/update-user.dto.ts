import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  roleId?: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  bio?: string;
  @IsOptional()
  @IsString()
  avatar_url?: string;
  @IsOptional()
  @IsString()
  role_id?: string;
}
