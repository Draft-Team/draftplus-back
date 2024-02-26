import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDTO, SignInResponseDTO } from './dtos/sign-in.dto';
import { SignUpRequestDTO, SignUpResponseDTO } from './dtos/sign-up.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiOkResponse({
    isArray: false,
    type: SignInResponseDTO,
  })
  async signIn(@Body() body: SignInRequestDTO) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  @ApiCreatedResponse({
    isArray: false,
    type: SignUpResponseDTO,
  })
  async signUp(@Body() body: SignUpRequestDTO) {
    return this.authService.signUp(body);
  }
}
