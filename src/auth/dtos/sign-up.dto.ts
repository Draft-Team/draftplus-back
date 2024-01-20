import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;
}
