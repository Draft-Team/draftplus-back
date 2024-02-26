import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AccountEntityToObject } from '../../account/domain/account.entity';

export class SignInRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignInResponseDTO {
  @ApiProperty()
  token: string;
  @ApiProperty()
  account: Omit<AccountEntityToObject, 'id'>;
}
