import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashHelper } from '../common/helpers/hash.helper';
import { securityConfig } from '../config/security.config';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload, LoginDto, LoginResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(securityConfig.KEY)
    private readonly _securityConfig: ConfigType<typeof securityConfig>
  ) {}

  async login(
    login: LoginDto
  ): Promise<LoginResponseDto & { accessToken: string }> {
    const user = await this.userService.findOneByEmail(login.email);

    if (!user) {
      throw new UnauthorizedException('El usuario no existe.');
    } else if (user.deletedAt) {
      throw new UnauthorizedException('Su cuenta ha sido deshabilitada');
    } else {
      const { password } = await this.userService.getHiddenColumns(user.id);
      const passwordOk = await HashHelper.compare(login.password, password);
      if (passwordOk) {
        return this.createToken(user);
      } else {
        throw new UnauthorizedException('Credenciales Incorrectas');
      }
    }
  }

  async validateJwtPayload(payload: JwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user || user.deletedAt || user.role.name !== payload.role.name) {
      throw new UnauthorizedException('Malformed token');
    }

    return user;
  }

  private createToken(user: UserEntity) {
    const expiresIn = this._securityConfig.expirationTime;

    const accessToken = this.jwtService.sign(Object.assign({}, user), {
      expiresIn,
    });

    return {
      expiresIn,
      accessToken,
      user,
    };
  }
}
