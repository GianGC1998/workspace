import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { databaseConfig } from './database.config';
import { securityConfig } from './security.config';

@Module({
  imports: [
    NestConfig.forRoot({
      load: [databaseConfig, securityConfig],
      isGlobal: true,
    }),
  ],
})
@Global()
export class ConfigModule {}
