import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { LoggedUser } from '../common/decorators/loggedUser.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { COOKIE_KEY } from '../config/security.config';
import { AuthUserDto, LoginDto, LoginResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponseDto,
    headers: {
      'Set-Cookie': {
        description: `Cookie ${COOKIE_KEY} que contiene el token de autenticación`,
        schema: {
          type: 'string',
          example: `${COOKIE_KEY}=token`,
        },
      },
    },
  })
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        'Set-Cookie': {
          type: 'string',
          example: `${COOKIE_KEY}=token; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      },
    },
  })
  @ApiOperation({ summary: 'Login' })
  async login(
    @Body() login: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, ...rest } = await this.authService.login(login);
    res.cookie(COOKIE_KEY, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
    return rest;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'Logout successful clearing the cookie' })
  logout(@Res() res: Response) {
    res.clearCookie(COOKIE_KEY);
    res.send();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({ type: AuthUserDto })
  me(@LoggedUser() user: AuthUserDto) {
    return user;
  }
}
