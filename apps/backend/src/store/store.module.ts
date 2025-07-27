import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { storeProviders } from './store.provider';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [StoreController],
  providers: [...storeProviders, StoreService],
  exports: [StoreService, ...storeProviders],
})
export class StoreModule {}
