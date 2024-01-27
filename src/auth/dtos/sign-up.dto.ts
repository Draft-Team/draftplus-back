import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AccountEntityToObject } from 'src/account/domain/account.entity';

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
  password: string;
}

export class SignUpResponseDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  account: Omit<AccountEntityToObject, 'id'>;
}
