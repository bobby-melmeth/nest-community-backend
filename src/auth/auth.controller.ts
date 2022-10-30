import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './authDto/signIn.dto';
import { SignUpDto } from './authDto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signIn')
  signIn(@Body() signInDto: SignInDto, @Res() res) {
    return this.authService.signIn(signInDto, res);
  }
  @Get('signOut')
  signOut(@Req() req, @Res() res) {
    return this.authService.signOut(req, res);
  }
}
