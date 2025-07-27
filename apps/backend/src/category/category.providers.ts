import { DataSource } from 'typeorm';
import { DATA_SOURCE_KEY } from '../database/database.constant';
import { CategoryEntity } from './category.entity';

export const CATEGORY_REPOSITORY_KEY = 'CATEGORY_REPOSITORY';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
