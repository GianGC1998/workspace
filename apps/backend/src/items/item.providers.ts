import { DataSource } from 'typeorm';
import { DATA_SOURCE_KEY } from '../database/database.constant';
import { ItemEntity } from './item.entity';

export const ITEM_REPOSITORY_KEY = 'ITEM_REPOSITORY';

export const itemProviders = [
  {
    provide: ITEM_REPOSITORY_KEY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ItemEntity),
    inject: [DATA_SOURCE_KEY],
  },
];
