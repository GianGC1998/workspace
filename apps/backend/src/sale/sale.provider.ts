import { DataSource } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { DATA_SOURCE_KEY } from '../database/database.constant';

export const SALE_REPOSITORY_KEY = 'SALE_REPOSITORY';

export const saleProviders = [
  {
    provide: SALE_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SaleEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
