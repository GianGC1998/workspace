import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { COOKIE_KEY, securityConfig } from '../config/security.config';
import { AuthService } from './auth.service';
import { fromCookies } from './jwt.misc';
import { JwtPayload } from './auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    @Inject(securityConfig.KEY)
    _securityConfig: ConfigType<typeof securityConfig>
  ) {
    super({
      jwtFromRequest: fromCookies(COOKIE_KEY),
      secretOrKey: _securityConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return this.authService.validateJwtPayload(payload);
  }
}
