import { Module } from '@nestjs/common';
import { saleProviders } from './sale.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...saleProviders],
  exports: [...saleProviders],
})
export class SaleModule {}
