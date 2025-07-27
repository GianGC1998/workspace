import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { itemProviders } from './item.providers';
import { ItemController } from './item.controller';
import { DatabaseModule } from '../database/database.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
  providers: [ItemService, ...itemProviders],
  controllers: [ItemController],
  exports: [ItemService, ...itemProviders],
})
export class ItemModule {}
