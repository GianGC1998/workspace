import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoleEntity } from '../roles/role.entity';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthRoleDto extends PickType(RoleEntity, ['name']) {}

export class AuthUserDto extends PickType(UserEntity, ['id', 'email', 'name']) {
  @ApiProperty({ type: AuthRoleDto })
  @ValidateNested()
  @Type(() => AuthRoleDto)
  role: AuthRoleDto;
}

export class LoginResponseDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  expiresIn: number;

  @ApiProperty({ type: AuthUserDto })
  @ValidateNested()
  @Type(() => AuthUserDto)
  user: AuthUserDto;
}

export class JwtPayload extends AuthUserDto {}
