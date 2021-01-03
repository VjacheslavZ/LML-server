import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) /*: Promise<void>*/ {
    console.log('authCredentialsDto', authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) /*: Promise<{ accessToken: string }>*/ {
    console.log('authCredentialsDto', authCredentialsDto);
  }
}
