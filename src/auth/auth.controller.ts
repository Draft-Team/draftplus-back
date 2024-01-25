import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }
}
