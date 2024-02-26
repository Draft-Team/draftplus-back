import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { AccountEntityToObject } from '../../account/domain/account.entity';

export class SignUpRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleId: string;
}

export class SignUpResponseDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  account: Omit<AccountEntityToObject, 'id'>;
}
