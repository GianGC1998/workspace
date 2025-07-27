import { getConfigToken, registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { ValidatableConfig } from './validatable.config';

export class DatabaseConfig extends ValidatableConfig {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  static fromPlain(plain: Partial<DatabaseConfig>) {
    return plainToInstance(DatabaseConfig, plain);
  }
}

const databaseConfigKey = 'database';

export const databaseConfigToken = getConfigToken(databaseConfigKey);

export const databaseConfig = registerAs(databaseConfigKey, async () => {
  const value = DatabaseConfig.fromPlain({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  await value.validate();

  return value;
});
