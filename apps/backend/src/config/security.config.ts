import { getConfigToken, registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { ValidatableConfig } from './validatable.config';

export class SecurityConfig extends ValidatableConfig {
  @IsString()
  secret: string;

  @IsNumber()
  expirationTime: number;

  static fromPlain(plain: Partial<SecurityConfig>) {
    return plainToInstance(SecurityConfig, plain);
  }
}

const securityConfigKey = 'security';

export const COOKIE_KEY = 'hairhands_session';

export const securityConfigToken = getConfigToken(securityConfigKey);

export const securityConfig = registerAs(securityConfigKey, async () => {
  const value = SecurityConfig.fromPlain({
    secret: process.env.SECURITY_SECRET,
    expirationTime: parseInt(process.env.SECURITY_EXPIRATION_TIME || '604800'),
  });

  await value.validate();

  return value;
});
