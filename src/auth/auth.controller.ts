import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { Session } from './session.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import * as interfaces from './auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() data: interfaces.SignupDto) {
    return this.authService.signup(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Session() session: interfaces.Session) {
    return this.authService.getMe(session.userId);
  }
}
