import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryProviders } from './category.providers';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService, ...categoryProviders],
  controllers: [CategoryController],
  exports: [CategoryService, ...categoryProviders],
})
export class CategoryModule {}
