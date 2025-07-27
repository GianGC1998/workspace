import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { providerProviders } from './provider.providers';
import { ProviderController } from './provider.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProviderService, ...providerProviders],
  controllers: [ProviderController],
  exports: [ProviderService, ...providerProviders],
})
export class ProviderModule {}
